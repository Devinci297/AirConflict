import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import type { ATO, MissionPackage } from '../types/game';
import type { AircraftType } from '../types/units';
import type { MunitionType } from '../types/supplies';

export function useATO() {
  const gameState = useGameStore();
  
  // Local state for the draft ATO to avoid thrashing the global store on every keystroke
  const [draftAto, setDraftAto] = useState<ATO>(
    gameState.currentAto || { cycleNumber: 1, status: 'DRAFT', missionPackages: [] }
  );

  const addMissionPackage = (pkg: Omit<MissionPackage, 'id'>) => {
    const newPackage: MissionPackage = {
      ...pkg,
      id: `MSN-${draftAto.cycleNumber}-${Math.floor(Math.random() * 10000)}`
    };
    
    setDraftAto(prev => ({
      ...prev,
      missionPackages: [...prev.missionPackages, newPackage]
    }));
  };

  const removeMissionPackage = (id: string) => {
    setDraftAto(prev => ({
      ...prev,
      missionPackages: prev.missionPackages.filter(pkg => pkg.id !== id)
    }));
  };

  const publishATO = () => {
    // In a full implementation, this would trigger an update to the gameStore
    useGameStore.setState({ currentAto: { ...draftAto, status: 'PUBLISHED' } });
    console.log("ATO Published to Game Store:", draftAto);
  };

  // Basic validation
  const validateDraft = (): string[] => {
    const errors: string[] = [];
    if (draftAto.missionPackages.length === 0) {
      errors.push("ATO has no mission packages.");
    }
    // More complex validation (e.g. checking if MOB has enough aircraft) would go here
    return errors;
  };

  return {
    draftAto,
    addMissionPackage,
    removeMissionPackage,
    publishATO,
    validateDraft
  };
}
