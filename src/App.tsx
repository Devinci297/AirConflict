import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { CAOCDashboard } from './rooms/CAOC/CAOCDashboard';
import { useGameStore } from './stores/gameStore';
import { createGameState } from './lib/gameStateFactory';

function App() {
  // Initialize the scenario exactly once on boot
  useEffect(() => {
    console.log("Initializing Pacific Storm Scenario...");
    const initialState = createGameState('PACIFIC_STORM');
    useGameStore.setState(initialState);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Temporarily routing root directly to the CAOC Dashboard for Sprint 4 testing */}
        <Route path="/" element={<CAOCDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
