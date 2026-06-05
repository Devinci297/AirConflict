// Dummy data until full integration
const MOCK_TARGETS = [
  { id: 'TGT-001', name: 'Shanghai IADS Command Node', type: 'C2', location: 'Shanghai, CHN', status: 'UNTOUCHED', priority: 'CRITICAL' },
  { id: 'TGT-002', name: 'Zhejiang S-400 Battery', type: 'SAM', location: 'Zhejiang, CHN', status: 'DAMAGED', priority: 'HIGH' },
  { id: 'TGT-003', name: 'Fuzhou Air Base', type: 'AIRFIELD', location: 'Fujian, CHN', status: 'UNTOUCHED', priority: 'HIGH' },
  { id: 'TGT-004', name: 'Type 055 Destroyer Group', type: 'NAVAL', location: 'East China Sea', status: 'UNTOUCHED', priority: 'MEDIUM' },
  { id: 'TGT-005', name: 'Nanjing Ammunition Depot', type: 'SUPPLY', location: 'Jiangsu, CHN', status: 'DESTROYED', priority: 'LOW' },
];

interface TargetListProps {
  onSelectTarget: (targetId: string) => void;
}

export function TargetList({ onSelectTarget }: TargetListProps) {
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'bg-[#e74c3c]/20 text-[#e74c3c] border-[#e74c3c]/50';
      case 'HIGH': return 'bg-[#f39c12]/20 text-[#f39c12] border-[#f39c12]/50';
      case 'MEDIUM': return 'bg-[#f1c40f]/20 text-[#f1c40f] border-[#f1c40f]/50';
      default: return 'bg-[#95a5a6]/20 text-[#95a5a6] border-[#95a5a6]/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DESTROYED': return 'text-[#95a5a6] line-through';
      case 'DAMAGED': return 'text-[#f39c12]';
      default: return 'text-[#e0e6ed]';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a1628]/80 backdrop-blur-md border border-[#2a3f5a] rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-[#121f33] border-b border-[#2a3f5a] flex justify-between items-center">
        <h2 className="text-sm font-bold text-[#e0e6ed] uppercase tracking-widest">JIPTL (Target List)</h2>
        <span className="text-xs bg-[#2a3f5a] px-2 py-0.5 rounded text-[#90a4be]">{MOCK_TARGETS.length} Targets</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {MOCK_TARGETS.map(target => (
          <div 
            key={target.id}
            onClick={() => onSelectTarget(target.id)}
            className={`p-3 rounded border border-[#2a3f5a] bg-[#121f33]/50 hover:bg-[#1a2a40] cursor-pointer transition-colors group ${target.status === 'DESTROYED' ? 'opacity-50' : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${getStatusColor(target.status)} group-hover:text-white transition-colors`}>
                  {target.name}
                </span>
                <span className="text-[10px] text-[#90a4be] font-mono mt-0.5">{target.id} • {target.location}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${getPriorityColor(target.priority)}`}>
                {target.priority}
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-[10px] uppercase tracking-wider text-[#90a4be] bg-[#0a1628] px-2 py-1 rounded">
                TYPE: {target.type}
              </span>
              <span className={`text-[10px] font-mono ${target.status === 'UNTOUCHED' ? 'text-[#4caf50]' : target.status === 'DAMAGED' ? 'text-[#f39c12]' : 'text-[#e74c3c]'}`}>
                {target.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
