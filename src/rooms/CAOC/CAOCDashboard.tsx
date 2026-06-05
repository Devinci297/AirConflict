import { useState } from 'react';
import { TheaterMap } from '../../components/map/TheaterMap';
import { TopBar } from '../../components/hud/TopBar';
import { Scorecard } from '../../components/ato/Scorecard';
import { TargetList } from '../../components/ato/TargetList';
import { ATOBuilder } from '../../components/ato/ATOBuilder';
import { MissionPackageCard } from '../../components/ato/MissionPackageCard';
import { useATO } from '../../hooks/useATO';

export function CAOCDashboard() {
  const { draftAto, addMissionPackage, removeMissionPackage, publishATO } = useATO();
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [isBuildingAto, setIsBuildingAto] = useState(false);

  const handleSelectTarget = (targetId: string) => {
    setSelectedTargetId(targetId);
    setIsBuildingAto(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050a14] overflow-hidden">
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Side: Map (60%) */}
        <div className="w-[60%] h-full relative z-0">
          <TheaterMap />
        </div>

        {/* Right Side: Dashboard Panel (40%) */}
        <div className="w-[40%] h-full bg-[#050a14]/90 border-l border-[#2a3f5a] flex flex-col p-4 gap-4 z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <Scorecard />
          
          <div className="flex-1 flex gap-4 min-h-0">
            {/* JIPTL Target List */}
            <div className={`transition-all duration-300 ${isBuildingAto ? 'w-1/3' : 'w-1/2'}`}>
              <TargetList onSelectTarget={handleSelectTarget} />
            </div>

            {/* Dynamic Right Panel: Either ATO Draft List or ATO Builder */}
            <div className={`transition-all duration-300 flex flex-col ${isBuildingAto ? 'w-2/3' : 'w-1/2'}`}>
              {isBuildingAto ? (
                <ATOBuilder 
                  selectedTargetId={selectedTargetId} 
                  onAddMission={(pkg) => {
                    addMissionPackage(pkg);
                    setIsBuildingAto(false);
                    setSelectedTargetId(null);
                  }}
                  onCancel={() => {
                    setIsBuildingAto(false);
                    setSelectedTargetId(null);
                  }}
                />
              ) : (
                <div className="flex flex-col h-full bg-[#0a1628]/80 backdrop-blur-md border border-[#2a3f5a] rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-[#121f33] border-b border-[#2a3f5a] flex justify-between items-center">
                    <h2 className="text-sm font-bold text-[#e0e6ed] uppercase tracking-widest">Draft ATO</h2>
                    <span className="text-xs bg-[#2a3f5a] px-2 py-0.5 rounded text-[#90a4be]">{draftAto.missionPackages.length} Missions</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                    {draftAto.missionPackages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[#90a4be] text-sm text-center p-4">
                        No missions drafted.<br/>Select a target from the JIPTL to begin.
                      </div>
                    ) : (
                      draftAto.missionPackages.map(pkg => (
                        <MissionPackageCard 
                          key={pkg.id} 
                          pkg={pkg} 
                          onDelete={removeMissionPackage} 
                        />
                      ))
                    )}
                  </div>

                  <div className="p-3 border-t border-[#2a3f5a] bg-[#121f33]">
                    <button 
                      onClick={publishATO}
                      disabled={draftAto.missionPackages.length === 0}
                      className="w-full bg-[#f39c12] hover:bg-[#f1c40f] disabled:bg-[#f39c12]/30 disabled:text-gray-400 disabled:cursor-not-allowed text-black font-bold py-2 px-4 rounded transition-colors uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(243,156,18,0.3)]"
                    >
                      Publish ATO
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
