import { Menu } from "lucide-react"
import EngineSelector from "./EngineSelector/EngineSelector"

interface HeaderProps {
    onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className="h-[67px] shrink-0 w-full border-b border-(--border) flex items-center px-4 bg-(--secondary-bg) gap-4">
            <button onClick={onMenuClick} className="hover:bg-gray-200 p-1 rounded-md transition-colors">
                <Menu size={20} className="text-(--secondary-text)" />
            </button>
            <EngineSelector />
        </header>
    )
}
export default Header;