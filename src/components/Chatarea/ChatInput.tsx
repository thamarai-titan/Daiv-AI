import { useState } from "react";
import { Paperclip, Mic, Send } from "lucide-react";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
    const [text, setText] = useState<string>("")

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text)
            setText("")
        }
    }

    return (
        <footer className="w-full p-4 md:p-6 bg-(--bg)/80 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex flex-col gap-2">
                {/* input box */}
                <div className="relative border border-(--border) rounded-2xl bg-(--secondary-bg) p-3 transition-all">
                    <div className="flex items-center-safe gap-3">
                        <button className="text-(--secondary-text) hover:text-(--accent) transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <textarea name="" id="" rows={1} value={text} onChange={(e) => setText(e.target.value)} placeholder="Message Neural Nexus..." className="flex-1 bg-transparent border-none outline-none text-sm resize-none py-1 max-h-32 overflow-y-auto text-(--primary-text)"></textarea>
                        <div className="flex items-center gap-1 mg:gap-2">
                            <button className="p-2 text-(--secondary-text) hover:text-(--accent)hidden sm:block">
                                <Mic />
                            </button>

                            <button
                                onClick={handleSend}
                                disabled={!text.trim()}
                                className={`p-2 rounded-xl transition-all ${text.trim()
                                    ? "bg-(--accent) text-white shadow-md active:scale-95"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="hidden sm:flex justify-between items-center mt-2 px-1 text-[10px] text-(--secondary-text)">
                        <span>Press <b>Enter</b> to send, <b>Shift+Enter</b> for new line</span>
                        <span>{text.length} / 4000</span>
                    </div>
                </div>
                <p className="text-center text-[10px] text-(--secondary-text) opacity-80">
                    AI can make mistakes. Consider checking important information.
                </p>
            </div>
        </footer>
    )
}

export default ChatInput;