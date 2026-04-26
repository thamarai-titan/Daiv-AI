import { ChatInput } from "./ChatInput"
import { Zap } from "lucide-react"

export const ChatPage = () => {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 overflow-y-auto flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 p-6 max-w-md w-full">
                    {/* Logo */}
                    <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <Zap size={32} className="text-white" />
                    </div>

                    {/* Title */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">
                            <span className="text-green-500">Daiv</span>
                            <span className="text-(--primary-text)">AI</span>
                        </h1>
                        <p className="text-sm text-(--secondary-text) mt-1">
                            Ask me anything. I'm here to help.
                        </p>
                    </div>

                    {/* Suggestion Cards */}
                    <div className="grid grid-cols-2 gap-3 w-full mt-2">
                        {[
                            { title: "Code Help", sub: "Debug and write better code" },
                            { title: "Explanations", sub: "Understand complex topics" },
                            { title: "Creative Writing", sub: "Generate content and ideas" },
                            { title: "Problem Solving", sub: "Find solutions to challenges" },
                        ].map((card) => (
                            <button
                                key={card.title}
                                className="flex flex-col items-start p-3 rounded-xl border border-(--border) bg-(--secondary-bg) hover:border-green-500/50 transition-all text-left"
                            >
                                <span className="text-sm font-medium text-(--primary-text)">{card.title}</span>
                                <span className="text-xs text-(--secondary-text) mt-0.5">{card.sub}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="shrink-0 p-4 md:p-6">
                <ChatInput onSendMessage={() => { }} />
            </div>
        </div>
    )
}