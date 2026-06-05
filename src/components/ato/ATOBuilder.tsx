import { useState } from 'react';
import type { AircraftType } from '../../types/units';
import type { MunitionType } from '../../types/supplies';

interface ATOBuilderProps {
  selectedTargetId: string | null;
  onAddMission: (pkg: any) => void;
  onCancel: () => void;
}

export function ATOBuilder({ selectedTargetId, onAddMission, onCancel }: ATOBuilderProps) {
  const [aircraftType, setAircraftType] = useState<AircraftType>('F-35A');
  const [qty, setQty] = useState(4);
  const [munition, setMunition] = useState<MunitionType>('JASSM-ER');
  const [baseId, setBaseId] = useState('Kadena AB');
  const [tot, setTot] = useState('14:30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTargetId) return;

    onAddMission({
      targetId: selectedTargetId,
      aircraftType,
      aircraftQty: qty,
      munitionType: munition,
      assignedBaseId: baseId,
      timeOnTarget: tot,
      status: 'PLANNED'
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0a1628]/95 backdrop-blur-md border border-[#2a3f5a] rounded-lg overflow-hidden relative">
      <div className="px-4 py-3 bg-[#121f33] border-b border-[#2a3f5a] flex justify-between items-center">
        <h2 className="text-sm font-bold text-[#e0e6ed] uppercase tracking-widest">ATO Builder</h2>
        <button onClick={onCancel} className="text-[#90a4be] hover:text-white transition-colors text-xs">✕ CLOSE</button>
      </div>

      {!selectedTargetId ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#2a3f5a] flex items-center justify-center mb-4">
            <span className="text-[#4a90d9] text-xl">🎯</span>
          </div>
          <p className="text-[#90a4be] text-sm">Select a target from the JIPTL or Map to begin building a mission package.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <div className="bg-[#1a2a40] p-3 rounded border border-[#2a3f5a]">
            <span className="text-[10px] uppercase text-[#90a4be] block mb-1">Selected Target</span>
            <span className="text-sm font-bold text-[#e74c3c] font-mono block">{selectedTargetId}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase text-[#90a4be]">Aircraft Type</label>
              <select 
                value={aircraftType} 
                onChange={e => setAircraftType(e.target.value as AircraftType)}
                className="bg-[#0a1628] border border-[#2a3f5a] rounded p-2 text-sm text-white focus:outline-none focus:border-[#4a90d9]"
              >
                <option value="F-35A">F-35A Lightning II</option>
                <option value="F-22A">F-22A Raptor</option>
                <option value="B-21">B-21 Raider</option>
                <option value="F-15EX">F-15EX Eagle II</option>
                <option value="EA-18G">EA-18G Growler</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase text-[#90a4be]">Quantity</label>
              <input 
                type="number" min="1" max="24"
                value={qty} 
                onChange={e => setQty(parseInt(e.target.value))}
                className="bg-[#0a1628] border border-[#2a3f5a] rounded p-2 text-sm text-white focus:outline-none focus:border-[#4a90d9]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase text-[#90a4be]">Munition</label>
            <select 
              value={munition} 
              onChange={e => setMunition(e.target.value as MunitionType)}
              className="bg-[#0a1628] border border-[#2a3f5a] rounded p-2 text-sm text-white focus:outline-none focus:border-[#4a90d9]"
            >
              <option value="JASSM-ER">AGM-158B JASSM-ER</option>
              <option value="LRASM">AGM-158C LRASM</option>
              <option value="SDB-II">GBU-53/B SDB II</option>
              <option value="AARGM-ER">AGM-88G AARGM-ER</option>
              <option value="AIM-260">AIM-260 JATM</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase text-[#90a4be]">Originating Base (MOB/FOS)</label>
            <select 
              value={baseId} 
              onChange={e => setBaseId(e.target.value)}
              className="bg-[#0a1628] border border-[#2a3f5a] rounded p-2 text-sm text-white focus:outline-none focus:border-[#4a90d9]"
            >
              <option value="Kadena AB">Kadena AB (MOB)</option>
              <option value="Andersen AFB">Andersen AFB (MOB)</option>
              <option value="Iwo To">Iwo To (FOS)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase text-[#90a4be]">Time On Target (ZULU)</label>
            <input 
              type="time" 
              value={tot} 
              onChange={e => setTot(e.target.value)}
              className="bg-[#0a1628] border border-[#2a3f5a] rounded p-2 text-sm text-white focus:outline-none focus:border-[#4a90d9]"
            />
          </div>

          <div className="mt-auto pt-4 border-t border-[#2a3f5a]">
            <button 
              type="submit"
              className="w-full bg-[#4a90d9] hover:bg-[#5aa0e9] text-white font-bold py-2 px-4 rounded transition-colors uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(74,144,217,0.3)]"
            >
              Add to Draft ATO
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
