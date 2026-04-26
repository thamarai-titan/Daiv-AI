import { useEffect, useRef, useState } from "react";
import { Zap, User, Trash2, Pencil } from "lucide-react";
import { Typewriter } from "../ui/Typewriter";
import ConfirmModal from "../Modals/ConfirmModal";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    time: string;
}

interface ChatMessagesProps {
    messages: Message[];
    onDeleteMessage: (id: string) => void;
}

const ChatMessages = ({ messages, onDeleteMessage }: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <div className="flex flex-col w-full pb-10">
                {messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;

                    return (
                        <div
                            key={msg.id}
                            className={`w-full border-b border-(--border) px-6 py-8 relative transition-colors ${msg.role === "assistant"
                                ? "bg-(--secondary-bg)/30"
                                : "bg-transparent"
                                } ${hoveredId === msg.id ? "bg-gray-50" : ""}`}
                            onMouseEnter={() => setHoveredId(msg.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="max-w-3xl mx-auto flex items-start gap-4">

                                {msg.role === "assistant" ? (
                                    <div className="w-9 h-9 rounded-xl bg-(--accent) flex items-center justify-center shrink-0 shadow-sm">
                                        <Zap size={18} className="text-white" />
                                    </div>
                                ) : (
                                    <div className="w-9 h-9 rounded-xl bg-white border border-(--border) flex items-center justify-center shrink-0 shadow-sm">
                                        <User size={18} className="text-(--secondary-text)" />
                                    </div>
                                )}

                                {/* content */}
                                <div className="flex flex-col gap-1 flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-(--primary-text) uppercase tracking-wider">
                                            {msg.role === "assistant" ? "Neural Nexus" : "You"}
                                        </span>
                                        <span className="text-[10px] text-(--secondary-text) font-medium opacity-60">
                                            {msg.time}
                                        </span>
                                    </div>

                                    {msg.role === "assistant" && isLast ? (
                                        <Typewriter text={msg.content} />
                                    ) : (
                                        <p className="text-sm text-(--primary-text) leading-relaxed whitespace-pre-wrap">
                                            {msg.content}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* hover buttons */}
                            {hoveredId === msg.id && (
                                <div className="absolute top-4 right-6 flex items-center gap-1">
                                    <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                                        <Pencil size={13} className="text-(--secondary-text)" />
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(msg.id)}
                                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={13} className="text-red-400" />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <ConfirmModal
                isOpen={!!deleteTarget}
                title="Delete Message?"
                description="Are you sure you want to delete this message? This action cannot be undone."
                onConfirm={() => {
                    if (deleteTarget) onDeleteMessage(deleteTarget);
                    setDeleteTarget(null);
                }}
                onCancel={() => setDeleteTarget(null)}
            />
        </>
    );
};

export default ChatMessages;