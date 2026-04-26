import { useState, useEffect } from "react";
import type { Chat, Message } from "../App";

const STORAGE_KEY = "daivai_chats";

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const createChat = (): string => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      date: new Date().toLocaleDateString(),
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat.id;
  };

  const selectChat = (id: string) => setActiveChatId(id);

  const addMessage = (chatId: string, message: Message) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, messages: [...c.messages, message] } : c,
      ),
    );
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, title } : c)),
    );
  };

  const deleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((c) => c.id !== chatId));
    if (activeChatId === chatId) setActiveChatId(null);
  };

  const deleteMessage = (chatId: string, messageId: string) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? { ...c, messages: c.messages.filter((m) => m.id !== messageId) }
          : c,
      ),
    );
  };

  return {
    chats,
    activeChat,
    activeChatId,
    createChat,
    selectChat,
    addMessage,
    updateChatTitle,
    deleteChat,
    deleteMessage,
  };
};
