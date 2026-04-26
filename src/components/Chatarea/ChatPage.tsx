import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessage";
import { Zap } from "lucide-react";
import Groq from "groq-sdk";
import type { Chat, Message } from "../../App";
import { IconWrapper } from "../ui/IconWrapper";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

interface ChatPageProps {
    activeChat: Chat | null;
    activeChatId: string | null;
    onFirstMessage: (text: string) => string;
    onAddMessage: (chatId: string, message: Message) => void;
    onDeleteMessage: (chatId: string, messageId: string) => void;
}

const ChatPage = ({
    activeChat,
    activeChatId,
    onFirstMessage,
    onAddMessage,
    onDeleteMessage,
}: ChatPageProps) => {
    const messages = activeChat?.messages ?? [];

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        let chatId = activeChatId;

        if (!chatId) {
            chatId = onFirstMessage(text);
        }

        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            time,
        };
        onAddMessage(chatId, userMsg);

        try {
            const res = await groq.chat.completions.create({
                messages: [{ role: "user", content: text }],
                model: "llama-3.3-70b-versatile",
            });

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: res.choices[0]?.message?.content || "",
                time,
            };
            onAddMessage(chatId, aiMsg);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center p-6">
                        <div className="flex flex-col items-center gap-4 max-w-md w-full animate-in fade-in zoom-in duration-300">
                            <IconWrapper icon={Zap} size="lg" />

                            <div className="text-center">
                                <h1 className="text-2xl font-bold">
                                    <span className="text-(--accent)">Daiv</span>
                                    <span className="text-(--primary-text)">AI</span>
                                </h1>
                                <p className="text-sm text-(--secondary-text) mt-1">Ask me anything. I'm here to help.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                {[
                                    { title: "Code Help", sub: "Debug and write better code" },
                                    { title: "Explanations", sub: "Understand complex topics" },
                                    { title: "Creative Writing", sub: "Generate content and ideas" },
                                    { title: "Problem Solving", sub: "Find solutions to challenges" },
                                ].map((card) => (
                                    <div
                                        key={card.title}
                                        className="flex flex-col items-center p-3 rounded-xl border border-(--border) bg-(--secondary-bg) hover:border-(--accent)/50 transition-all cursor-pointer group"
                                    >
                                        <span className="text-sm font-medium text-(--primary-text) group-hover:text-(--accent) transition-colors text-center">{card.title}</span>
                                        <span className="text-[10px] text-(--secondary-text) mt-0.5 text-center">{card.sub}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <ChatMessages
                        messages={messages}
                        onDeleteMessage={(msgId) => {
                            if (activeChatId) onDeleteMessage(activeChatId, msgId);
                        }}
                    />
                )}
            </div>
            <div className="shrink-0">
                <ChatInput onSendMessage={handleSend} />
            </div>
        </div>
    );
};

export default ChatPage;