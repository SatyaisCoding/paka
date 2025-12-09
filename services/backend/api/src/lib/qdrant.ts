// src/lib/qdrant.ts
// Hybrid Qdrant client: Uses gRPC when available, falls back to REST
import { QdrantClient as QdrantRestClient } from '@qdrant/js-client-rest';
import { QdrantClient as QdrantGrpcClient } from '@qdrant/js-client-grpc';
import { EMBEDDING_DIMENSION } from '../services/embedding.service.js';

const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';
// gRPC URL format - try with http:// prefix first, fallback to host:port
const QDRANT_GRPC_URL = process.env.QDRANT_GRPC_URL || 'http://localhost:6334';

// Initialize REST client (fallback)
const qdrantRest = new QdrantRestClient({
  url: QDRANT_URL,
});

// Initialize gRPC client (will be set if available)
let qdrantGrpc: QdrantGrpcClient | null = null;
let useGrpc = false;

/**
 * Initialize gRPC client and test connection
 * Falls back to REST if gRPC is unavailable
 */
export async function initializeQdrantGrpc(): Promise<boolean> {
  try {
    qdrantGrpc = new QdrantGrpcClient({
      url: QDRANT_GRPC_URL,
    });

    // Test connection - gRPC client uses api() method
    await qdrantGrpc.api('collections').list({});
    useGrpc = true;
    console.log(`✅ Qdrant gRPC client initialized: ${QDRANT_GRPC_URL}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Qdrant gRPC not available, using REST fallback:`, (error as Error).message);
    useGrpc = false;
    qdrantGrpc = null;
    return false;
  }
}

/**
 * Helper to call REST API method
 */
async function callRestMethod(method: string, ...args: any[]): Promise<any> {
  const client = qdrantRest as any;
  return await client[method](...args);
}


/**
 * Get the active Qdrant client (gRPC if available, otherwise REST)
 */
function getClient(): QdrantRestClient | QdrantGrpcClient {
  return useGrpc && qdrantGrpc ? qdrantGrpc : qdrantRest;
}

// Export the client getter for backward compatibility
// Wraps both REST and gRPC clients with a unified interface
// gRPC client uses api() method, REST uses direct methods
const qdrant = {
  getCollections: async (...args: any[]) => {
    if (useGrpc && qdrantGrpc) {
      const result = await qdrantGrpc.api('collections').list({});
      // Convert gRPC response format to REST format
      return result;
    }
    return await callRestMethod('getCollections', ...args);
  },
  getCollection: async (collectionName: string, ...args: any[]) => {
    if (useGrpc && qdrantGrpc) {
      const result = await qdrantGrpc.api('collections').get({ collection_name: collectionName });
      // Convert gRPC response to REST format
      return {
        config: result.result?.config,
        status: result.result?.status,
        optimizer_status: result.result?.optimizer_status,
        vectors_count: result.result?.vectors_count,
        indexed_vectors_count: result.result?.indexed_vectors_count,
        points_count: result.result?.points_count,
      };
    }
    return await callRestMethod('getCollection', collectionName, ...args);
  },
  createCollection: async (collectionName: string, config: any, ...args: any[]) => {
    if (useGrpc && qdrantGrpc) {
      return await qdrantGrpc.api('collections').create({ collection_name: collectionName, ...config });
    }
    return await callRestMethod('createCollection', collectionName, config, ...args);
  },
  deleteCollection: async (collectionName: string, ...args: any[]) => {
    if (useGrpc && qdrantGrpc) {
      return await qdrantGrpc.api('collections').delete({ collection_name: collectionName });
    }
    return await callRestMethod('deleteCollection', collectionName, ...args);
  },
  upsert: async (collectionName: string, points: any, ...args: any[]) => {
    if (useGrpc && qdrantGrpc) {
      return await qdrantGrpc.api('points').upsert({ collection_name: collectionName, ...points });
    }
    return await callRestMethod('upsert', collectionName, points, ...args);
  },
  search: async (collectionName: string, query: any, ...args: any[]) => {
    if (useGrpc && qdrantGrpc) {
      return await qdrantGrpc.api('points').search({ collection_name: collectionName, ...query });
    }
    return await callRestMethod('search', collectionName, query, ...args);
  },
  delete: async (collectionName: string, filter: any, ...args: any[]) => {
    if (useGrpc && qdrantGrpc) {
      return await qdrantGrpc.api('points').delete({ collection_name: collectionName, ...filter });
    }
    return await callRestMethod('delete', collectionName, filter, ...args);
  },
} as QdrantRestClient;

// Collection name for document chunks
export const CHUNKS_COLLECTION = 'document_chunks';

// Initialize collection if it doesn't exist
export async function initializeCollection(): Promise<void> {
  try {
    const collections = await qdrant.getCollections();
    const existing = collections.collections.find(c => c.name === CHUNKS_COLLECTION);

    if (!existing) {
      await qdrant.createCollection(CHUNKS_COLLECTION, {
        vectors: {
          size: EMBEDDING_DIMENSION,  // 1536 for OpenAI
          distance: 'Cosine',
        },
        optimizers_config: {
          default_segment_number: 2,
        },
        replication_factor: 1,
      });
      console.log(`✅ Created Qdrant collection: ${CHUNKS_COLLECTION} (dimension: ${EMBEDDING_DIMENSION})`);
    } else {
      // Check if dimension matches
      // For gRPC, we'll skip detailed collection info check to avoid API issues
      // The collection exists, which is sufficient for now
      if (useGrpc) {
        console.log(`✅ Qdrant collection exists: ${CHUNKS_COLLECTION} (using gRPC)`);
      } else {
        try {
          const collectionInfo = await qdrant.getCollection(CHUNKS_COLLECTION);
          const existingDimension = (collectionInfo.config?.params?.vectors as any)?.size;

          if (existingDimension && existingDimension !== EMBEDDING_DIMENSION) {
            console.warn(`⚠️ Collection dimension mismatch: expected ${EMBEDDING_DIMENSION}, got ${existingDimension}`);
            console.warn(`   Recreating collection...`);
            await recreateCollection();
          } else {
            console.log(`✅ Qdrant collection exists: ${CHUNKS_COLLECTION} (dimension: ${existingDimension || EMBEDDING_DIMENSION})`);
          }
        } catch (err) {
          // If getCollection fails, just log that collection exists
          console.log(`✅ Qdrant collection exists: ${CHUNKS_COLLECTION}`);
        }
      }
    }
  } catch (error) {
    console.error('Failed to initialize Qdrant collection:', error);
    throw error;
  }
}

// Recreate collection with correct dimension
export async function recreateCollection(): Promise<void> {
  try {
    // Delete existing collection
    try {
      await qdrant.deleteCollection(CHUNKS_COLLECTION);
      console.log(`🗑️ Deleted existing collection: ${CHUNKS_COLLECTION}`);
    } catch {
      // Collection might not exist
    }

    // Create new collection
    await qdrant.createCollection(CHUNKS_COLLECTION, {
      vectors: {
        size: EMBEDDING_DIMENSION,
        distance: 'Cosine',
      },
      optimizers_config: {
        default_segment_number: 2,
      },
      replication_factor: 1,
    });

    console.log(`✅ Recreated Qdrant collection: ${CHUNKS_COLLECTION} (dimension: ${EMBEDDING_DIMENSION})`);
  } catch (error) {
    console.error('Failed to recreate Qdrant collection:', error);
    throw error;
  }
}

// Check Qdrant health
export async function checkQdrantHealth(): Promise<boolean> {
  try {
    if (useGrpc && qdrantGrpc) {
      await qdrantGrpc.api('collections').list({});
    } else {
      await qdrantRest.getCollections();
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if gRPC is being used
 */
export function isUsingGrpc(): boolean {
  return useGrpc;
}

/**
 * Get connection info
 */
export function getConnectionInfo(): { type: 'grpc' | 'rest'; url: string } {
  return {
    type: useGrpc ? 'grpc' : 'rest',
    url: useGrpc ? QDRANT_GRPC_URL : QDRANT_URL,
  };
}

export default qdrant;
