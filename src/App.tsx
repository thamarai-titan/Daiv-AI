import Header from "./components/Header/Header";
import ChatPage from "./components/Chatarea/ChatPage";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import { useChats } from "./hooks/useChats";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

export interface Chat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    chats,
    activeChat,
    activeChatId,
    createChat,
    selectChat,
    addMessage,
    updateChatTitle,
    deleteChat,
    deleteMessage,
  } = useChats();

  const handleFirstMessage = (text: string): string => {
    const id = createChat();
    // Set first message as title (trimmed to 30 chars)
    updateChatTitle(id, text.slice(0, 30));
    return id;
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-(--bg)">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={createChat}
        onSelectChat={selectChat}
        onRenameChat={updateChatTitle}
        onDeleteChat={deleteChat}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex-1 overflow-hidden">
          <ChatPage
            activeChat={activeChat}
            activeChatId={activeChatId}
            onFirstMessage={handleFirstMessage}
            onAddMessage={addMessage}
            onDeleteMessage={deleteMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;