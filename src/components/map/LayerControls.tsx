import { useState } from 'react';

export interface LayerVisibility {
  terrain: boolean;
  bases: boolean;
  opfor: boolean;
  samRings: boolean;
  routes: boolean;
}

interface LayerControlsProps {
  visibility: LayerVisibility;
  onChange: (visibility: LayerVisibility) => void;
}

export function LayerControls({ visibility, onChange }: LayerControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLayer = (layer: keyof LayerVisibility) => {
    onChange({ ...visibility, [layer]: !visibility[layer] });
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#121f33] border border-[#2a3f5a] text-[#e0e6ed] px-3 py-2 rounded-md shadow-lg text-sm font-medium hover:bg-[#1a2a40] transition-colors"
      >
        Layers
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-[#0a1628]/90 border border-[#2a3f5a] rounded-md p-3 shadow-xl backdrop-blur-md min-w-48">
          <h3 className="text-[#90a4be] text-xs uppercase tracking-wider mb-3 pb-1 border-b border-[#2a3f5a]">Map Layers</h3>
          
          <div className="flex flex-col gap-2">
            {Object.entries(visibility).map(([key, isVisible]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isVisible}
                  onChange={() => toggleLayer(key as keyof LayerVisibility)}
                  className="w-4 h-4 bg-[#1a2a40] border-[#3a5a7a] rounded text-[#4caf50] focus:ring-[#4caf50] focus:ring-offset-[#0a1628]"
                />
                <span className="text-sm text-[#e0e6ed] group-hover:text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
