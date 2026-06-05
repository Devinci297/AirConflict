import { useGameStore } from '../../stores/gameStore';

export function TopBar() {
  const { phase, time } = useGameStore();

  return (
    <div className="h-12 bg-[#050a14] border-b border-[#2a3f5a] flex items-center justify-between px-4 text-[#e0e6ed] select-none">
      <div className="flex items-center gap-6">
        <div className="font-bold tracking-wider text-[#4a90d9]">AIR CONFLICTS</div>
        <div className="flex items-center gap-2">
          <span className="text-[#90a4be] text-xs font-mono">ZULU TIME:</span>
          <span className="font-mono bg-[#0a1628] px-2 py-1 rounded border border-[#1a2a40]">{time.zuluTime || '06:00:00Z'}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-[#0a1628] px-4 py-1 rounded-full border border-[#1a2a40]">
        <div className={`text-xs font-bold px-2 py-0.5 rounded ${phase === 'PLANNING' ? 'bg-[#4a90d9] text-white' : 'text-[#90a4be]'}`}>PLANNING</div>
        <div className={`text-xs font-bold px-2 py-0.5 rounded ${phase === 'EXECUTION' ? 'bg-[#e74c3c] text-white' : 'text-[#90a4be]'}`}>EXECUTION</div>
        <div className={`text-xs font-bold px-2 py-0.5 rounded ${phase === 'ASSESSMENT' ? 'bg-[#f1c40f] text-black' : 'text-[#90a4be]'}`}>ASSESSMENT</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#90a4be]">CYCLE:</span>
          <span className="font-bold text-white bg-[#e74c3c]/20 px-2 py-0.5 rounded text-[#e74c3c]">ATO {time.cycleNumber}</span>
        </div>
        <div className="flex gap-1">
          <button className="px-2 py-1 bg-[#1a2a40] hover:bg-[#2a3f5a] rounded text-xs transition-colors">⏸</button>
          <button className="px-2 py-1 bg-[#4a90d9] hover:bg-[#5aa0e9] rounded text-xs transition-colors text-white">1x</button>
          <button className="px-2 py-1 bg-[#1a2a40] hover:bg-[#2a3f5a] rounded text-xs transition-colors">2x</button>
        </div>
      </div>
    </div>
  );
}
