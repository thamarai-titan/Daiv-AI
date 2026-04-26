import { useState } from "react";
import { Zap, Brain, Sparkles, Cpu } from "lucide-react";
import { IconWrapper } from "../../ui/IconWrapper";

const initialEngines = [
    { id: 'nexus', name: 'Neural Nexus', version: 'Quantum Core v3.8', icon: Zap },
    { id: 'cerebral', name: 'Cerebral Prime', version: 'Advanced Reasoning v2.1', icon: Brain },
    { id: 'synapse', name: 'Synapse Ultra', version: 'Creative Engine v4.0', icon: Sparkles },
    { id: 'logic', name: 'Logic Core', version: 'Fast Response v1.5', icon: Cpu },
];

const EngineSelectorComp = () => {

    const [activeId, setActiveId] = useState('nexus');

    return (
        <div className="w-[288px] bg-(--bg) rounded-md border border-(--border) p-4 flex flex-col gap-2 text-sm">
            <p className="text-(--secondary-text) text-sm font-light">Select AI Engine</p>
            <div className="flex flex-col gap-1">
                {initialEngines.map((engine) => {

                    const isActive = engine.id === activeId;

                    return (
                        <button
                            key={engine.id}

                            onClick={() => setActiveId(engine.id)}
                            className={`flex items-center gap-4 p-3 rounded-md transition-all text-left w-full group ${isActive
                                ? "bg-(--accent)/10 border border-(--accent)/20"
                                : "hover:bg-(--secondary-bg) border border-transparent"
                                }`}
                        >
                            <IconWrapper icon={engine.icon} size="sm" />
                            <div className="flex-1">
                                <h4 className="text-(--primary-text) font-medium">{engine.name}</h4>
                                <p className="text-[11px] text-(--secondary-text)">
                                    {engine.version}
                                </p>
                            </div>


                            {isActive && (
                                <div className="w-2 h-2 bg-(--accent) rounded-full shadow-[0_0_8px_rgba(0,168,50,0.5)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default EngineSelectorComp;