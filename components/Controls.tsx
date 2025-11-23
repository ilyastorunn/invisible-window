import React, { useState } from "react";
import { VideoFilter } from "../types";
import { Settings, ChevronDown, ChevronUp, Info } from "lucide-react";

interface ControlsProps {
  currentFilter: VideoFilter;
  onFilterChange: (filter: VideoFilter) => void;
}

const Controls: React.FC<ControlsProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out">
        {/* Header - Always visible, toggles expansion */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg transition-colors ${
                isExpanded
                  ? "bg-white text-black"
                  : "bg-white/10 text-white group-hover:bg-white/20"
              }`}
            >
              <Settings size={18} />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide">
                Invisible Window
              </h1>
              <p className="text-[10px] text-neutral-400 transition-colors group-hover:text-neutral-300">
                {isExpanded
                  ? "Select a filter below"
                  : "Click to expand controls"}
              </p>
            </div>
          </div>
          <button className="text-neutral-400 p-1 rounded-full group-hover:bg-white/10 transition-colors">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>

        {/* Collapsible Content */}
        <div
          className={`
                transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden
                ${
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }
            `}
        >
          <div className="p-4 pt-0 space-y-4">
            {/* Divider */}
            <div className="h-px bg-white/10 mb-4" />

            {/* Filter Grid */}
            <div>
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 block pl-1">
                Sync Filter
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(VideoFilter).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilterChange(value);
                    }}
                    className={`
                        text-xs py-2.5 px-2 rounded-xl border transition-all duration-200 font-medium
                        ${
                          currentFilter === value
                            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transform scale-105"
                            : "bg-white/5 text-neutral-400 border-transparent hover:bg-white/10 hover:text-white"
                        }
                      `}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-white/5 rounded-xl p-3 flex gap-3 items-start border border-white/5">
              <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                The video stays fixed relative to your screen coordinates
                (`screenX`, `screenY`). Filter changes sync across windows via{" "}
                <code className="text-blue-300 font-mono">
                  BroadcastChannel
                </code>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
