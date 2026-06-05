import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGameStore } from '../../stores/gameStore';
import { LayerControls } from './LayerControls';
import type { LayerVisibility } from './LayerControls';

// Custom icons for bases
const createBaseIcon = (type: 'MOB' | 'FOS', name: string) => {
  const isMob = type === 'MOB';
  const size = isMob ? 16 : 12;
  const shapeClass = isMob ? 'rounded-sm' : 'rotate-45';
  
  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `
      <div class="relative flex items-center justify-center pointer-events-none">
        <div class="bg-[#4a90d9] border border-white shadow-[0_0_8px_rgba(74,144,217,0.8)] ${shapeClass}" style="width: ${size}px; height: ${size}px;"></div>
        ${isMob ? `<div class="absolute left-6 text-[#e0e6ed] font-mono text-[10px] whitespace-nowrap bg-[#0a1628]/80 px-1 py-0.5 rounded pointer-events-auto">${name}</div>` : ''}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export function TheaterMap() {
  const gameState = useGameStore();
  
  const [layers, setLayers] = useState<LayerVisibility>({
    terrain: true,
    bases: true,
    opfor: true,
    samRings: true,
    routes: true,
  });

  // CartoDB Dark Matter (No labels, we'll let our UI handle labels if needed, or use the labeled variant)
  const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <div className="relative w-full h-full bg-[#0a1628]">
      <LayerControls visibility={layers} onChange={setLayers} />
      
      <MapContainer 
        center={[27.5, 132.5]} 
        zoom={5} 
        zoomControl={false}
        className="w-full h-full z-0 cursor-crosshair bg-[#0a1628]"
        style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        {layers.terrain && (
          <TileLayer
            url={TILE_URL}
            attribution={TILE_ATTRIBUTION}
          />
        )}
        
        {/* Render Bases */}
        {layers.bases && Object.values(gameState.bases || {}).map((base) => (
          <Marker 
            key={base.id} 
            position={[base.location.lat, base.location.lon]}
            icon={createBaseIcon(base.type, base.name)}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} className="bg-[#0a1628] text-[#e0e6ed] border-[#2a3f5a] font-mono rounded">
              <div className="font-bold text-[#4a90d9]">{base.name}</div>
              <div className="text-xs">{base.type} • {base.status}</div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Target Crosshair in Center for aesthetics (optional) */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 pointer-events-none z-10 opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white"></div>
      </div>
    </div>
  );
}
