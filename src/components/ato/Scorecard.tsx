import { useGameStore } from '../../stores/gameStore';

export function Scorecard() {
  const { metrics } = useGameStore();

  return (
    <div className="bg-[#0a1628]/80 backdrop-blur-md border border-[#2a3f5a] rounded-lg p-3 grid grid-cols-4 gap-4">
      <div className="flex flex-col">
        <span className="text-[#90a4be] text-[10px] uppercase tracking-wider mb-1">Air Superiority</span>
        <div className="flex items-end gap-1">
          <span className={`text-2xl font-bold font-mono ${metrics.airSuperiorityIndex > 60 ? 'text-[#4caf50]' : metrics.airSuperiorityIndex > 40 ? 'text-[#f1c40f]' : 'text-[#e74c3c]'}`}>
            {metrics.airSuperiorityIndex}
          </span>
          <span className="text-[#90a4be] text-xs mb-1">/100</span>
        </div>
      </div>
      
      <div className="flex flex-col border-l border-[#2a3f5a] pl-4">
        <span className="text-[#90a4be] text-[10px] uppercase tracking-wider mb-1">Targets Destroyed</span>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold font-mono text-white">{metrics.targetsDestroyedPercent}%</span>
        </div>
      </div>
      
      <div className="flex flex-col border-l border-[#2a3f5a] pl-4">
        <span className="text-[#90a4be] text-[10px] uppercase tracking-wider mb-1">Force Strength</span>
        <div className="flex items-end gap-1">
          <span className={`text-2xl font-bold font-mono ${metrics.forceStrengthPercent > 75 ? 'text-[#4caf50]' : 'text-[#e74c3c]'}`}>
            {metrics.forceStrengthPercent}%
          </span>
        </div>
      </div>

      <div className="flex flex-col border-l border-[#2a3f5a] pl-4">
        <span className="text-[#90a4be] text-[10px] uppercase tracking-wider mb-1">Active Sorties</span>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold font-mono text-[#4a90d9]">0</span>
        </div>
      </div>
    </div>
  );
}
