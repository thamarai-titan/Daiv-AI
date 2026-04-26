import { Button } from "../../ui/Button"
import { Zap, ChevronDown } from "lucide-react"
import { IconWrapper } from "../../ui/IconWrapper"
import { useState } from "react"
import EngineSelectorComp from "./EngineSelectorComp"

const EngineSelector = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="relative inline-block">
            <Button leftIcon={<IconWrapper icon={Zap} />} rightIcon={<ChevronDown />} variants="secondary" className="border border-(--border)" size="sm" onClick={() => { setOpen(!open) }}>
                Neural Nexus
            </Button>
            {open && (
                <div className="absolute top-full left-0 z-50 animate-in fade-in duration-200">
                    <EngineSelectorComp />
                </div>
            )}
        </div>

    )
}

export default EngineSelector
