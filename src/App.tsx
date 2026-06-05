import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { TheaterMap } from './components/map/TheaterMap';
import { useGameStore } from './stores/gameStore';
import { createGameState } from './lib/gameStateFactory';
import { PACIFIC_STORM } from './config/scenarios/pacific-storm';

// Placeholders for routes
const Landing = () => <TheaterMap />;
const Lobby = () => <div className="p-4">Lobby (Placeholder)</div>;
const Game = () => <div className="p-4">Game Session (Placeholder)</div>;

function App() {
  useEffect(() => {
    // Initialize the Zustand store with the Pacific Storm scenario for testing the map
    const initialState = createGameState(PACIFIC_STORM);
    useGameStore.setState(initialState);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:sessionId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
