import { useState } from "react";
import { X, Plus, MessageSquare, Pencil, Trash2, Check } from "lucide-react";
import type { Chat } from "../../App";
import ConfirmModal from "../Modals/ConfirmModal";

interface SidebarProps {
    chats: Chat[];
    activeChatId: string | null;
    onNewChat: () => void;
    onClose: () => void;
    isOpen: boolean;
    onSelectChat: (id: string) => void;
    onRenameChat: (id: string, title: string) => void;
    onDeleteChat: (id: string) => void;
}

const Sidebar = ({
    chats,
    activeChatId,
    onNewChat,
    onClose,
    isOpen,
    onSelectChat,
    onRenameChat,
    onDeleteChat,
}: SidebarProps) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    if (!isOpen) return null;

    const startEdit = (chat: Chat) => {
        setEditingId(chat.id);
        setEditValue(chat.title);
    };

    const commitEdit = (id: string) => {
        if (editValue.trim()) onRenameChat(id, editValue.trim());
        setEditingId(null);
    };

    return (
        <>
            {/* backdrop blur for mobile view */}
            <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={onClose}
            />

            <aside className="fixed top-0 left-0 h-full z-50 md:relative md:z-auto md:h-full w-64 bg-(--secondary-bg) border-r border-(--border) flex flex-col">

                <div className="flex items-center justify-between p-4 border-b border-(--border)">
                    <h1 className="text-xl font-bold">
                        <span className="text-green-500">Daiv</span>
                        <span className="text-(--primary-text)">AI</span>
                    </h1>
                    <button onClick={onClose} className="md:hidden p-1 hover:bg-gray-200 rounded-md transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-3">
                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center justify-center gap-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus size={18} /> New Chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3">
                    <p className="text-[10px] text-(--secondary-text) px-2 py-2 font-bold uppercase tracking-widest">
                        History
                    </p>

                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer mb-1 transition-colors group ${activeChatId === chat.id
                                ? "bg-green-500/10 text-green-600"
                                : "hover:bg-gray-200"
                                }`}
                            onMouseEnter={() => setHoveredId(chat.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => !editingId && onSelectChat(chat.id)}
                        >
                            <MessageSquare size={14} className="text-(--secondary-text) shrink-0" />


                            {editingId === chat.id ? (
                                <input
                                    autoFocus
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") commitEdit(chat.id);
                                        if (e.key === "Escape") setEditingId(null);
                                    }}
                                    onBlur={() => commitEdit(chat.id)}
                                    className="flex-1 text-sm bg-transparent border-b border-green-500 outline-none text-(--primary-text)"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <span className="text-sm truncate font-medium flex-1">
                                    {chat.title}
                                </span>
                            )}


                            {hoveredId === chat.id && editingId !== chat.id && (
                                <div
                                    className="flex items-center gap-1 shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {editingId === chat.id ? (
                                        <button
                                            onClick={() => commitEdit(chat.id)}
                                            className="p-1 hover:bg-green-100 rounded-md transition-colors"
                                        >
                                            <Check size={13} className="text-green-600" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => startEdit(chat)}
                                            className="p-1 hover:bg-gray-300 rounded-md transition-colors"
                                        >
                                            <Pencil size={13} className="text-(--secondary-text)" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setDeleteTarget(chat.id)}
                                        className="p-1 hover:bg-red-100 rounded-md transition-colors"
                                    >
                                        <Trash2 size={13} className="text-red-400" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                <div className="p-3 border-t border-(--border) flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        U
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-(--primary-text) truncate">User</span>
                        <span className="text-xs text-(--secondary-text) truncate">user@email.com</span>
                    </div>
                </div>
            </aside>

            {/* deletemodal */}
            <ConfirmModal
                isOpen={!!deleteTarget}
                title="Delete Chat?"
                description="Are you sure you want to delete this chat? This action cannot be undone."
                onConfirm={() => {
                    if (deleteTarget) onDeleteChat(deleteTarget);
                    setDeleteTarget(null);
                }}
                onCancel={() => setDeleteTarget(null)}
            />
        </>
    );
};

export default Sidebar;