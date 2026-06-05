import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

// Placeholders for routes
const Landing = () => <div className="p-4">Landing Page (Placeholder) - Welcome to Air Conflicts</div>;
const Lobby = () => <div className="p-4">Lobby (Placeholder)</div>;
const Game = () => <div className="p-4">Game Session (Placeholder)</div>;

function App() {
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
