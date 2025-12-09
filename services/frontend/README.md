# Paka Frontend

A modern, terminal + ChatGPT-style interface for the Paka AI Assistant.

## 🎨 Features

- **Terminal Interface**: Command-line style interface for direct interactions
- **ChatGPT-style Chat**: Conversational AI interface with message history
- **Dark Theme**: Beautiful dark theme optimized for extended use
- **Real-time Updates**: Socket.IO integration for live notifications
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── terminal.tsx     # Terminal component
│   ├── chat.tsx         # Chat component
│   └── auth-dialog.tsx  # Authentication dialog
├── lib/
│   ├── api.ts           # API client
│   ├── store.ts         # Zustand store
│   └── socket.ts        # Socket.IO client
└── components/ui/       # shadcn/ui components
```

## 🎯 Usage

### Terminal Commands

- `help` - Show available commands
- `query <text>` - Ask a question
- `docs` - List documents
- `tasks` - Show tasks
- `briefing` - Get daily briefing
- `clear` - Clear terminal

Or just type your question directly!

### Chat Interface

Simply type your message and press Enter to send. The AI will respond in real-time.

## 🎨 Customization

### Theme

The app uses a dark theme by default. You can customize colors in `app/globals.css`.

### Components

All UI components are from shadcn/ui and can be customized:

```bash
npx shadcn@latest add [component-name]
```

## 📦 Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT
