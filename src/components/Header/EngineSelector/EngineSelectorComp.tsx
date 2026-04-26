import { IconWrapper } from "../../ui/IconWrapper";
import { Zap, Brain, Sparkles, Cpu } from "lucide-react"

const initialEngines = [
    { id: 'nexus', name: 'Neural Nexus', version: 'Quantum Core v3.8', icon: Zap },
    { id: 'cerebral', name: 'Cerebral Prime', version: 'Advanced Reasoning v2.1', icon: Brain },
    { id: 'synapse', name: 'Synapse Ultra', version: 'Creative Engine v4.0', icon: Sparkles },
    { id: 'logic', name: 'Logic Core', version: 'Fast Response v1.5', icon: Cpu },
];

interface EngineSelectorCompProps {
    activeId: string;
    onSelect: (id: string) => void;
}

const EngineSelectorComp = ({ activeId, onSelect }: EngineSelectorCompProps) => {
    return (
        <div className="w-[288px] bg-(--secondary-bg) rounded-xl shadow-xl border border-(--border) p-2 flex flex-col gap-1 text-sm">
            <p className="text-(--secondary-text) text-[11px] px-3 py-2 font-bold uppercase tracking-wider">Select AI Engine</p>

            <div className="flex flex-col">
                {initialEngines.map((engine) => {
                    const isActive = engine.id === activeId;
                    return (
                        <button
                            key={engine.id}
                            onClick={() => onSelect(engine.id)}
                            className={`flex items-center gap-4 p-3 rounded-lg transition-all text-left w-full group ${isActive
                                ? "bg-(--accent)/10 border border-(--accent)/20"
                                : "hover:bg-gray-100 border border-transparent"
                                }`}
                        >
                            <IconWrapper icon={engine.icon} size="sm" className={isActive ? "text-(--accent)" : ""} />

                            <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-medium truncate ${isActive ? "text-(--accent)" : "text-(--primary-text)"}`}>
                                    {engine.name}
                                </h4>
                                <p className="text-[10px] text-(--secondary-text) truncate">
                                    {engine.version}
                                </p>
                            </div>

                            {isActive && (
                                <div className="w-1.5 h-1.5 bg-(--accent) rounded-full shadow-[0_0_8px_rgba(0,168,50,0.5)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default EngineSelectorComp;