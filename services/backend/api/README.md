# Paka API

A RESTful API built with **Hono**, **Prisma**, and **PostgreSQL** for document management, task tracking, and more.

## 🚀 Features

- **Authentication** - JWT-based signup, login, profile management
- **User Management** - CRUD operations for users (admin)
- **Documents** - Upload, manage, and organize documents
- **Sources** - Connect data sources (Gmail, Drive, Notion, etc.)
- **Tasks** - Create and manage tasks with due dates
- **Reminders** - Set and manage reminders
- **File Upload** - Upload any file type with local storage
- **Vector Search** - Semantic search using Qdrant + OpenAI embeddings
- **RAG Query** - Question answering with retrieval-augmented generation
- **Input Validation** - Zod schemas for all endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js 22+
- **Framework**: [Hono](https://hono.dev/)
- **Database**: PostgreSQL
- **Vector DB**: Qdrant
- **ORM**: Prisma
- **Embeddings**: OpenAI text-embedding-3-small
- **LLM**: OpenAI GPT-4o-mini
- **Validation**: Zod
- **Auth**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs

## 📦 Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/paka_db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000
QDRANT_URL="http://localhost:6333"
OPENAI_API_KEY="sk-your-openai-api-key"
```

## 🔑 OpenAI Setup

1. Go to **[platform.openai.com/api-keys](https://platform.openai.com/api-keys)**
2. Click **"Create new secret key"**
3. Copy the key and add it to your `.env` file

**Models used:**
- `text-embedding-3-small` - For semantic search embeddings
- `gpt-4o-mini` - For RAG question answering

## 🐳 Docker

```bash
# Start database
docker-compose up -d db

# Or start everything
docker-compose up -d
```

## 📚 API Endpoints

### Authentication (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/auth/me` | Get current user |
| PATCH | `/auth/me` | Update profile |
| POST | `/auth/change-password` | Change password |
| DELETE | `/auth/me` | Delete account |

### Users (`/users`) - Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create user |
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user by ID |
| PATCH | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/users/:id/stats` | Get user stats |

### Documents (`/documents`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/documents` | Create document |
| GET | `/documents` | List documents |
| GET | `/documents/:id` | Get document |
| PATCH | `/documents/:id` | Update document |
| DELETE | `/documents/:id` | Delete document |
| POST | `/documents/bulk-delete` | Bulk delete |
| GET | `/documents/stats/summary` | Get stats |

### Sources (`/sources`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/sources` | Create source |
| GET | `/sources` | List sources |
| GET | `/sources/providers` | Get providers |
| GET | `/sources/:id` | Get source |
| PATCH | `/sources/:id` | Update source |
| DELETE | `/sources/:id` | Delete source |
| POST | `/sources/:id/reconnect` | Reconnect |
| GET | `/sources/:id/stats` | Get stats |

### Tasks (`/tasks`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create task |
| GET | `/tasks` | List tasks |
| GET | `/tasks/upcoming` | Upcoming tasks |
| GET | `/tasks/overdue` | Overdue tasks |
| GET | `/tasks/stats` | Get stats |
| GET | `/tasks/:id` | Get task |
| PATCH | `/tasks/:id` | Update task |
| POST | `/tasks/:id/toggle` | Toggle complete |
| DELETE | `/tasks/:id` | Delete task |
| POST | `/tasks/bulk/complete` | Bulk complete |
| DELETE | `/tasks/bulk` | Bulk delete |

### Reminders (`/reminders`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reminders` | Create reminder |
| GET | `/reminders` | List reminders |
| GET | `/reminders/due-soon` | Due soon |
| GET | `/reminders/stats` | Get stats |
| GET | `/reminders/:id` | Get reminder |
| PATCH | `/reminders/:id` | Update reminder |
| POST | `/reminders/:id/mark-sent` | Mark as sent |
| POST | `/reminders/:id/snooze` | Snooze |
| DELETE | `/reminders/:id` | Delete reminder |
| DELETE | `/reminders/bulk/sent` | Delete sent |

### File Upload (`/upload`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload file |
| GET | `/upload` | List files |
| GET | `/upload/stats` | Get stats |
| GET | `/upload/:id` | Get file info |
| DELETE | `/upload/:id` | Delete file |

### Vectors (`/vectors`) - Semantic Search & RAG
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/vectors/health` | Check vector services health |
| POST | `/vectors/process-text` | Process text and generate embeddings |
| POST | `/vectors/search` | Semantic search across documents |
| POST | `/vectors/preview-chunks` | Preview text chunking |
| GET | `/vectors/stats` | Get vector statistics |
| GET | `/vectors/document/:id` | Get chunks for a document |
| DELETE | `/vectors/document/:id` | Delete document vectors |
| GET | `/vectors/chunk/:id` | Get specific chunk |

### Query (`/query`) - RAG Question Answering
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/query` | Get query history |
| POST | `/query` | Ask question with RAG |
| DELETE | `/query/:id` | Delete query from history |
| DELETE | `/query/history` | Clear query history |

### Health (`/health`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/health/detailed` | Detailed health with all services |
| GET | `/health/ready` | Readiness probe (k8s) |
| GET | `/health/live` | Liveness probe (k8s) |

## 🔒 Authentication

All endpoints (except `/auth/signup`, `/auth/login`, `/health`) require authentication.

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Validation

All endpoints use Zod validation. Invalid requests return:

```json
{
  "ok": false,
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

## 📁 Project Structure

```
src/
├── server.ts           # Entry point
├── routes/
│   ├── auth.ts         # Authentication
│   ├── users.ts        # User management
│   ├── documents.ts    # Documents
│   ├── sources.ts      # Data sources
│   ├── tasks.ts        # Tasks
│   ├── reminders.ts    # Reminders
│   ├── upload.ts       # File uploads
│   └── health.ts       # Health check
├── middleware/
│   ├── auth.ts         # JWT middleware
│   └── validate.ts     # Zod validation
├── schemas/            # Zod schemas
├── lib/
│   └── prisma.ts       # Database client
└── utils/
    └── auth.ts         # JWT helpers
```

## 📄 License

MIT

