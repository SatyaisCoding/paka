// src/lib/qdrant.ts
import { QdrantClient } from '@qdrant/js-client-rest';
import { EMBEDDING_DIMENSION } from '../services/embedding.service.js';

const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';

// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: QDRANT_URL,
});

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
      const collectionInfo = await qdrant.getCollection(CHUNKS_COLLECTION);
      const existingDimension = (collectionInfo.config?.params?.vectors as any)?.size;

      if (existingDimension && existingDimension !== EMBEDDING_DIMENSION) {
        console.warn(`⚠️ Collection dimension mismatch: expected ${EMBEDDING_DIMENSION}, got ${existingDimension}`);
        console.warn(`   Recreating collection...`);
        await recreateCollection();
      } else {
        console.log(`✅ Qdrant collection exists: ${CHUNKS_COLLECTION} (dimension: ${existingDimension || EMBEDDING_DIMENSION})`);
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
    await qdrant.getCollections();
    return true;
  } catch {
    return false;
  }
}

export default qdrant;
