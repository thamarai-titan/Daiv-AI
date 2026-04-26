# DaivAI — Frontend Developer Intern Task Submission

**Submitted by:** Thamarai Manalan  
**Role:** Frontend Developer Intern  
**Deadline:** Sunday, EOD

---

## Overview

DaivAI is a fully functional AI chat interface built as part of the Round 1 Technical Task Assessment. The application replicates a modern AI assistant experience — similar to ChatGPT — with a clean UI, persistent chat history, and real AI responses powered by the Groq API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS v4 |
| AI API | Groq SDK (LLaMA 3.3 70B) |
| State & Storage | React Hooks + localStorage |
| Icons | Lucide React |
| Build Tool | Vite |

---

## Features Implemented

### Core Chat Experience
- Real AI responses via **Groq API** (LLaMA 3.3 70B model)
- **Typewriter animation** on AI responses for a natural feel
- Auto-scroll to the latest message
- Character counter
- Loading/thinking state indicator while awaiting AI response

### Chat Management
- **Create** new chats — each conversation is stored independently
- **Switch** between past conversations from the sidebar
- **Rename** chats inline by clicking the edit icon on hover
- **Delete** chats with a confirmation modal (cannot be undone)
- **Persistent storage** — all chats and messages are saved to `localStorage` and restored on page reload

### Message Actions
- **Delete individual messages** with a confirmation popup
- Hover-reveal action buttons (edit icon + delete icon) per message row
- Delete confirmation modal matches the provided design reference exactly

### UI & Layout
- **Responsive sidebar** — inline on desktop, full-screen overlay drawer on mobile with backdrop dismiss
- Sidebar shows chat history grouped under "History" with active chat highlight
- Landing screen with suggestion cards (Code Help, Explanations, Creative Writing, Problem Solving) — disappears automatically once a conversation starts
- Clean full-width message rows with avatar, sender name, and timestamp
- Header with hamburger menu toggle for sidebar open/close

### Architecture
- `useChats` custom hook centralises all chat logic and localStorage sync
- Shared `ConfirmModal` component reused across sidebar and message deletion
- Clean separation of concerns — hooks, components, and types are decoupled
- All types (`Message`, `Chat`) defined and exported from a single source (`App.tsx`)

---

## Project Structure

```
src/
├── App.tsx                        # Root layout, state wiring
├── hooks/
│   └── useChats.ts                # Chat CRUD + localStorage persistence
├── components/
│   ├── Header/
│   │   └── Header.tsx             # Top bar with menu toggle + engine selector
│   ├── Sidebar/
│   │   └── Sidebar.tsx            # Chat history, rename, delete, mobile drawer
│   ├── Chatarea/
│   │   ├── ChatPage.tsx           # Main chat view, Groq API calls
│   │   ├── ChatMessage.tsx        # Message rows with hover actions
│   │   └── ChatInput.tsx          # Textarea input with send controls
│   └── ui/
│       ├── ConfirmModal.tsx       # Reusable delete confirmation modal
│       └── Typewriter.tsx         # Animated typewriter for AI responses
```

---

## Setup & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/daivai.git
cd daivai

# 2. Install dependencies
npm install

# 3. Add your Groq API key
echo "VITE_GROQ_API_KEY=your_key_here" > .env

# 4. Start the dev server
npm run dev
```


---

## Screenshots
<img width="1882" height="921" alt="Screenshot 2026-04-26 at 6 45 01 PM" src="https://github.com/user-attachments/assets/5c3dba59-9b0b-451d-8e6b-e816e5aec311" />
<img width="1656" height="947" alt="Screenshot 2026-04-26 at 6 44 36 PM" src="https://github.com/user-attachments/assets/adef088c-b72c-4b5b-8674-f28245c08538" />
<img width="1280" height="666" alt="Screenshot 2026-04-26 at 6 43 55 PM" src="https://github.com/user-attachments/assets/0b15726c-0045-42e1-8016-7a641b04033c" />




---

## Notes

- The application is entirely client-side with no backend required beyond the Groq API
- localStorage is used for persistence; no database or server needed
- The sidebar drawer on mobile uses a `fixed` overlay with a backdrop so the main layout never breaks
- All destructive actions (delete chat, delete message) require confirmation before executing

---

*Submitted in response to the Round 1 Technical Task — Frontend Developer Intern*  
