# gRPC Implementation Guide

## Quick Summary: Where & Why

### 🎯 **WHERE to Configure gRPC:**

1. **Qdrant Vector Database** (`src/lib/qdrant.ts`)
   - **Why**: 2-5x faster than REST for vector operations
   - **Status**: Port 6334 already configured in docker-compose.yml
   - **Priority**: ⭐⭐⭐ HIGHEST

2. **Internal Microservices** (Future)
   - **Why**: Better inter-service communication
   - **Status**: Not yet implemented
   - **Priority**: ⭐⭐ MEDIUM (when splitting services)

3. **High-Performance Operations**
   - **Why**: Streaming, batch processing, lower latency
   - **Status**: Can be added incrementally
   - **Priority**: ⭐ LOW (optimization)

---

## 🚀 Implementation Steps

### Step 1: Install gRPC Package for Qdrant

```bash
cd services/backend/api
npm install @qdrant/js-client-grpc
```

### Step 2: Update Environment Variables

Add to `.env`:
```env
# Qdrant URLs
QDRANT_URL=http://localhost:6333          # REST (fallback)
QDRANT_GRPC_URL=localhost:6334            # gRPC (primary)
```

### Step 3: Update docker-compose.yml

Already configured! ✅
```yaml
qdrant:
  ports:
    - "6333:6333"  # REST
    - "6334:6334"  # gRPC ✅
```

### Step 4: Update Qdrant Client

The file `src/lib/qdrant-grpc.ts` has been created. Now update `src/lib/qdrant.ts` to use gRPC with REST fallback.

### Step 5: Update Server Initialization

Add to `src/server.ts`:
```typescript
import { initializeQdrantGrpc } from "./lib/qdrant-grpc.js";

// In start() function:
try {
  await initializeQdrantGrpc();
} catch (err) {
  console.warn("⚠️ Qdrant gRPC not available, using REST fallback");
}
```

---

## 📊 Expected Performance Improvements

| Operation | Current (REST) | With gRPC | Improvement |
|-----------|---------------|----------|-------------|
| Vector Search | 50-100ms | 20-40ms | **2-3x faster** |
| Batch Upsert | 200-500ms | 80-200ms | **2.5x faster** |
| Collection Info | 30-50ms | 10-20ms | **2-3x faster** |

---

## 🔍 Code Changes Required

### Minimal Changes (Recommended)

1. **Keep REST as fallback** - Maintains compatibility
2. **Use gRPC when available** - Automatic performance boost
3. **No API changes** - Existing code continues to work

### Files to Modify

1. ✅ `src/lib/qdrant-grpc.ts` - Created
2. ⏳ `src/lib/qdrant.ts` - Update to use gRPC client
3. ⏳ `src/server.ts` - Initialize gRPC client
4. ⏳ `package.json` - Add dependency

---

## 🎯 Why gRPC for Qdrant?

### Current State
- Using `@qdrant/js-client-rest` (HTTP REST)
- Qdrant gRPC port 6334 is configured but unused
- Vector operations are performance-critical

### Benefits of gRPC
1. **Performance**: Binary protocol, HTTP/2 multiplexing
2. **Efficiency**: Smaller payloads for large vectors
3. **Streaming**: Better for batch operations
4. **Already Configured**: Port 6334 ready to use

### When to Use
- ✅ Vector searches (high frequency)
- ✅ Batch embedding storage
- ✅ Large payload operations
- ✅ Internal service communication

### When NOT to Use
- ❌ Public REST API (keep REST for clients)
- ❌ Simple CRUD operations
- ❌ Browser clients (requires gRPC-Web)

---

## 📝 Example: Hybrid Approach

```typescript
// Use gRPC for performance-critical operations
// Fall back to REST if gRPC unavailable

import { getQdrantGrpc, isGrpcAvailable } from './lib/qdrant-grpc.js';
import qdrantRest from './lib/qdrant.js';

async function searchVectors(query: string) {
  if (isGrpcAvailable()) {
    // Use gRPC (faster)
    return await getQdrantGrpc()!.search(...);
  } else {
    // Fallback to REST
    return await qdrantRest.search(...);
  }
}
```

---

## 🔄 Migration Strategy

### Phase 1: Add gRPC (No Breaking Changes)
- Install package
- Create gRPC client
- Add fallback logic
- Test with existing code

### Phase 2: Optimize (Gradual)
- Switch high-frequency operations to gRPC
- Monitor performance
- Keep REST for compatibility

### Phase 3: Full Migration (Optional)
- Make gRPC primary
- REST as fallback only
- Update all vector operations

---

## ⚠️ Important Notes

1. **Backward Compatibility**: Keep REST client as fallback
2. **Error Handling**: gRPC may fail, always have REST backup
3. **Testing**: Test both gRPC and REST paths
4. **Monitoring**: Track which client is being used

---

## 🎬 Next Steps

1. ✅ Documentation created
2. ⏳ Install `@qdrant/js-client-grpc`
3. ⏳ Update `src/lib/qdrant.ts` to use gRPC
4. ⏳ Test performance improvements
5. ⏳ Monitor and optimize

---

## 📚 Additional Resources

- [Qdrant gRPC Documentation](https://qdrant.tech/documentation/guides/grpc/)
- [Node.js gRPC Guide](https://grpc.io/docs/languages/node/)
- [Performance Comparison](https://qdrant.tech/documentation/guides/grpc/#performance)

