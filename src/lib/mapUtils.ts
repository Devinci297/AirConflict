import { geoEquirectangular, geoPath } from 'd3-geo';

export interface Viewport {
  width: number;
  height: number;
}

export interface Camera {
  centerLat: number;
  centerLon: number;
  scale: number; // Pixels per degree
  zoomLevel: number;
}

export const DEG_TO_NM = 60; // 1 degree latitude ≈ 60 nautical miles

/** Convert lat/lon to screen pixel coordinates using basic equirectangular projection */
export function geoToScreen(
  lat: number,
  lon: number,
  viewport: Viewport,
  camera: Camera
): { x: number; y: number } {
  // Correction factor for longitude distortion at high latitudes
  const latCorrection = Math.cos((camera.centerLat * Math.PI) / 180);
  
  const x = (lon - camera.centerLon) * camera.scale * latCorrection + viewport.width / 2;
  const y = (camera.centerLat - lat) * camera.scale + viewport.height / 2;
  
  return { x, y };
}

/** Convert screen pixel to lat/lon */
export function screenToGeo(
  screenX: number,
  screenY: number,
  viewport: Viewport,
  camera: Camera
): { lat: number; lon: number } {
  const latCorrection = Math.cos((camera.centerLat * Math.PI) / 180);
  
  const lon = (screenX - viewport.width / 2) / (camera.scale * latCorrection) + camera.centerLon;
  const lat = camera.centerLat - (screenY - viewport.height / 2) / camera.scale;
  
  return { lat, lon };
}

/** Great-circle distance between two points in nautical miles */
export function distanceNM(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3440.065; // Earth radius in nm
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
      
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Bearing from point A to point B in degrees */
export function bearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  
  const y = Math.sin(dLon) * Math.cos(radLat2);
  const x =
    Math.cos(radLat1) * Math.sin(radLat2) -
    Math.sin(radLat1) * Math.cos(radLat2) * Math.cos(dLon);
    
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** Utility to configure a d3-geo projection for the given camera and viewport */
export function getD3Projection(viewport: Viewport, camera: Camera) {
  return geoEquirectangular()
    .scale((camera.scale * 180) / Math.PI)
    .translate([viewport.width / 2, viewport.height / 2])
    .center([camera.centerLon, camera.centerLat]);
}

/** Get a d3 path generator for a specific canvas context */
export function getD3Path(context: CanvasRenderingContext2D, projection: any) {
  return geoPath().projection(projection).context(context);
}
