# LogicWise: Coding Assistant — Frontend

This is the **frontend** of LogicWise, a web-based intelligent coding assistant designed to help programmers develop logical thinking and improve problem-solving skills while coding. It provides real-time, context-aware hints, logic explanations, and debugging support using an LLM backend (LLaMA 3.3 via Groq).

## 🚀 Live Features

- ✨ Monaco Editor for real-time code writing
- 💡 AI-powered assistant panel (logic-focused)
- 🔄 Real-time feedback via WebSocket (Socket.IO)
- 🌓 Dark/Light mode toggle (Tailwind CSS)
- 🔐 Firebase Authentication (email/password)
- 💾 Save & retrieve code with Firestore
- 🌐 Language selector dropdown

## 🛠 Tech Stack

- **React.js** (SPA)
- **Tailwind CSS**
- **Firebase Auth** & **Firestore**
- **Socket.IO** for real-time communication
- **Piston API** (for optional code execution)

## 📦 Folder Structure (Main Components)

- `EditorPanel/` — Monaco-based code editor
- `AssistantPanel/` — Shows AI-generated hints
- `Navbar/` — Navigation + Auth status
- `Auth/` — Login & Signup pages
- `utils/` — WebSocket handlers & debounce logic



## 📌 Prerequisites

- Node.js
- Firebase project setup (for Auth & Firestore)


