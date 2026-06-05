import type { MissionPackage } from '../../types/game';

interface MissionPackageCardProps {
  pkg: MissionPackage;
  onDelete: (id: string) => void;
}

export function MissionPackageCard({ pkg, onDelete }: MissionPackageCardProps) {
  return (
    <div className="bg-[#121f33]/80 border border-[#2a3f5a] rounded p-3 mb-2 flex flex-col group relative">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#4a90d9]">{pkg.id}</span>
          <span className="text-[10px] text-[#e0e6ed] mt-0.5 max-w-[180px] truncate">TGT: {pkg.targetId}</span>
        </div>
        <button 
          onClick={() => onDelete(pkg.id)}
          className="text-[#e74c3c] opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-[#e74c3c]/10 hover:bg-[#e74c3c]/30 px-1.5 py-0.5 rounded"
        >
          DEL
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="flex flex-col bg-[#0a1628] p-1.5 rounded border border-[#1a2a40]">
          <span className="text-[8px] text-[#90a4be] uppercase tracking-wider mb-0.5">Asset</span>
          <span className="text-xs font-mono text-white">{pkg.aircraftQty}x {pkg.aircraftType}</span>
        </div>
        <div className="flex flex-col bg-[#0a1628] p-1.5 rounded border border-[#1a2a40]">
          <span className="text-[8px] text-[#90a4be] uppercase tracking-wider mb-0.5">Weapon</span>
          <span className="text-xs font-mono text-[#f39c12]">{pkg.munitionType}</span>
        </div>
        <div className="flex flex-col bg-[#0a1628] p-1.5 rounded border border-[#1a2a40]">
          <span className="text-[8px] text-[#90a4be] uppercase tracking-wider mb-0.5">Origin</span>
          <span className="text-xs font-mono text-[#e0e6ed] truncate">{pkg.assignedBaseId}</span>
        </div>
        <div className="flex flex-col bg-[#0a1628] p-1.5 rounded border border-[#1a2a40]">
          <span className="text-[8px] text-[#90a4be] uppercase tracking-wider mb-0.5">TOT</span>
          <span className="text-xs font-mono text-[#4caf50]">{pkg.timeOnTarget}Z</span>
        </div>
      </div>
    </div>
  );
}
