import { Button } from "../../ui/Button"
import { Zap, ChevronDown, Brain, Sparkles, Cpu } from "lucide-react"
import { IconWrapper } from "../../ui/IconWrapper"
import { useState } from "react"
import EngineSelectorComp from "./EngineSelectorComp"


const initialEngines = [
    { id: 'nexus', name: 'Neural Nexus', version: 'Quantum Core v3.8', icon: Zap },
    { id: 'cerebral', name: 'Cerebral Prime', version: 'Advanced Reasoning v2.1', icon: Brain },
    { id: 'synapse', name: 'Synapse Ultra', version: 'Creative Engine v4.0', icon: Sparkles },
    { id: 'logic', name: 'Logic Core', version: 'Fast Response v1.5', icon: Cpu },
];

const EngineSelector = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [activeId, setActiveId] = useState('nexus');

    const selectedEngine = initialEngines.find(e => e.id === activeId) || initialEngines[0];

    return (
        <div className="relative inline-block">
            <Button
                leftIcon={<IconWrapper icon={selectedEngine.icon} />}
                rightIcon={<ChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />}
                variants="secondary"
                className="border border-(--border) min-w-[160px] justify-between"
                size="sm"
                onClick={() => setOpen(!open)}
            >
                {selectedEngine.name}
            </Button>

            {open && (
                <>

                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

                    <div className="absolute top-[calc(100%+8px)] left-0 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <EngineSelectorComp
                            activeId={activeId}
                            onSelect={(id) => {
                                setActiveId(id);
                                setOpen(false);
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default EngineSelector;