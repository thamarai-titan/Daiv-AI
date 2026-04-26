import { Menu } from "lucide-react"
import EngineSelector from "./EngineSelector/EngineSelector"

export const Header = () => {
    return (
        <header className="h-[67px] shrink-0 w-full border-b border-(--border) flex items-center px-4 bg-(--secondary-bg) gap-4">
            <button className="hover:bg-gray-200 p-1 rounded-md transition-colors">
                <Menu size={20} className="text-(--secondary-text)" />
            </button>
            <EngineSelector />
        </header>
    )
}