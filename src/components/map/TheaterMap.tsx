import { useEffect, useRef, useState } from 'react';
import type { FeatureCollection } from 'geojson';
import { Camera, Viewport } from '../../lib/mapUtils';
import { MapRenderer } from './MapRenderer';
import { LayerControls, LayerVisibility } from './LayerControls';
import { useGameStore } from '../../stores/gameStore';

// Initial Pacific Theater camera
const INITIAL_CAMERA: Camera = {
  centerLat: 27.5,
  centerLon: 132.5,
  scale: 40, // pixels per degree
  zoomLevel: 0,
};

export function TheaterMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const geoCanvasRef = useRef<HTMLCanvasElement>(null);
  const featuresCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const rendererRef = useRef<MapRenderer | null>(null);
  
  const [camera, setCamera] = useState<Camera>(INITIAL_CAMERA);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  
  const [layers, setLayers] = useState<LayerVisibility>({
    terrain: true,
    bases: true,
    opfor: true,
    samRings: true,
    routes: true,
  });

  // Load Game State
  const gameState = useGameStore((state) => state);

  useEffect(() => {
    if (!containerRef.current || !geoCanvasRef.current || !featuresCanvasRef.current || 
        !overlayCanvasRef.current || !entitiesCanvasRef.current || !cursorCanvasRef.current) {
      return;
    }

    const { clientWidth: width, clientHeight: height } = containerRef.current;
    const viewport: Viewport = { width, height };

    const renderer = new MapRenderer(
      geoCanvasRef.current,
      featuresCanvasRef.current,
      overlayCanvasRef.current,
      entitiesCanvasRef.current,
      cursorCanvasRef.current,
      viewport,
      camera
    );
    
    rendererRef.current = renderer;

    // Fetch basic world GeoJSON for the prototype
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
      .then(res => res.json())
      .then(topoData => {
        // We'll use topojson-client to convert it, but let's fetch a direct GeoJSON instead for simplicity 
        // to avoid adding topojson-client right now unless necessary.
        // Actually, fetching from a reliable geojson source:
        return fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
      })
      .then(res => res.json())
      .then(geoData => {
        renderer.setGeoData(geoData as FeatureCollection);
      })
      .catch(err => console.error("Failed to load map data:", err));

    renderer.start();

    const handleResize = () => {
      if (containerRef.current && rendererRef.current) {
        rendererRef.current.setViewport({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      renderer.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update renderer when camera changes
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setCamera(camera);
    }
  }, [camera]);

  // Update renderer when game state changes
  useEffect(() => {
    if (rendererRef.current) {
      // Create a full GameState object since our store currently only has phase and tickRate
      // For now, we'll cast it to any to bypass strict type checking until store is fully implemented
      rendererRef.current.setGameState(gameState as any);
    }
  }, [gameState]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    
    // Convert screen pixel delta to lat/lon delta
    const latCorrection = Math.cos((camera.centerLat * Math.PI) / 180);
    const dLon = -dx / (camera.scale * latCorrection);
    const dLat = dy / camera.scale;
    
    setCamera(prev => ({
      ...prev,
      centerLon: prev.centerLon + dLon,
      centerLat: Math.max(-89, Math.min(89, prev.centerLat + dLat)),
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Zoom factor
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(10, Math.min(5000, camera.scale * zoomFactor));
    
    setCamera(prev => ({
      ...prev,
      scale: newScale,
      // Logic for changing zoomLevel based on scale thresholds could go here
    }));
  };

  // Canvas styling for stacking
  const canvasClass = "absolute top-0 left-0 w-full h-full cursor-crosshair";

  return (
    <div 
      className="relative w-full h-full bg-[#0a1628] overflow-hidden" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <LayerControls visibility={layers} onChange={setLayers} />
      
      <canvas ref={geoCanvasRef} className={canvasClass} style={{ zIndex: 1, opacity: layers.terrain ? 1 : 0 }} />
      <canvas ref={featuresCanvasRef} className={canvasClass} style={{ zIndex: 10, opacity: layers.bases ? 1 : 0 }} />
      <canvas ref={overlayCanvasRef} className={canvasClass} style={{ zIndex: 20 }} />
      <canvas ref={entitiesCanvasRef} className={canvasClass} style={{ zIndex: 30 }} />
      <canvas ref={cursorCanvasRef} className={canvasClass} style={{ zIndex: 40 }} />
      
      {/* HUD Info */}
      <div className="absolute bottom-4 left-4 z-50 text-[#90a4be] text-xs font-mono bg-[#0a1628]/80 px-2 py-1 rounded">
        LAT: {camera.centerLat.toFixed(4)}° / LON: {camera.centerLon.toFixed(4)}° | SCALE: {camera.scale.toFixed(1)}
      </div>
    </div>
  );
}
