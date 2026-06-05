import type { GameState } from '../../types/game';
import { Camera, Viewport, getD3Projection, getD3Path, geoToScreen } from '../../lib/mapUtils';
import type { FeatureCollection } from 'geojson';

export class MapRenderer {
  private geoCanvas: HTMLCanvasElement;
  private featuresCanvas: HTMLCanvasElement;
  private overlayCanvas: HTMLCanvasElement;
  private entitiesCanvas: HTMLCanvasElement;
  private cursorCanvas: HTMLCanvasElement;
  
  private viewport: Viewport;
  public camera: Camera;
  
  // Offscreen buffer for geography
  private geoBuffer: HTMLCanvasElement;
  private geoBufferDirty: boolean = true;
  
  private geoData: FeatureCollection | null = null;
  private gameState: GameState | null = null;
  
  private isRendering: boolean = false;
  private animationFrameId: number | null = null;

  constructor(
    geoCanvas: HTMLCanvasElement,
    featuresCanvas: HTMLCanvasElement,
    overlayCanvas: HTMLCanvasElement,
    entitiesCanvas: HTMLCanvasElement,
    cursorCanvas: HTMLCanvasElement,
    viewport: Viewport,
    initialCamera: Camera
  ) {
    this.geoCanvas = geoCanvas;
    this.featuresCanvas = featuresCanvas;
    this.overlayCanvas = overlayCanvas;
    this.entitiesCanvas = entitiesCanvas;
    this.cursorCanvas = cursorCanvas;
    
    this.viewport = viewport;
    this.camera = initialCamera;
    
    // Create offscreen buffer
    this.geoBuffer = document.createElement('canvas');
    this.geoBuffer.width = viewport.width;
    this.geoBuffer.height = viewport.height;
  }

  public setGeoData(data: FeatureCollection) {
    this.geoData = data;
    this.geoBufferDirty = true;
  }

  public setGameState(state: GameState) {
    this.gameState = state;
  }

  public setCamera(camera: Camera) {
    this.camera = camera;
    this.geoBufferDirty = true;
  }
  
  public setViewport(viewport: Viewport) {
    this.viewport = viewport;
    
    // Update all canvases
    const canvases = [
      this.geoCanvas, 
      this.featuresCanvas, 
      this.overlayCanvas, 
      this.entitiesCanvas, 
      this.cursorCanvas,
      this.geoBuffer
    ];
    
    canvases.forEach(c => {
      c.width = viewport.width;
      c.height = viewport.height;
    });
    
    this.geoBufferDirty = true;
  }

  public start() {
    if (!this.isRendering) {
      this.isRendering = true;
      this.render();
    }
  }

  public stop() {
    this.isRendering = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private render = () => {
    if (!this.isRendering) return;

    // Layer 0: Geography (only redraw buffer if dirty)
    if (this.geoBufferDirty && this.geoData) {
      this.renderGeography();
      this.geoBufferDirty = false;
      
      // Copy buffer to visible canvas
      const geoCtx = this.geoCanvas.getContext('2d');
      if (geoCtx) {
        geoCtx.clearRect(0, 0, this.viewport.width, this.viewport.height);
        geoCtx.drawImage(this.geoBuffer, 0, 0);
      }
    }

    // Layer 1: Static features (Bases)
    this.renderFeatures();
    
    // Layer 2: Overlays (not implemented yet)
    // this.renderOverlays();
    
    // Layer 3: Dynamic entities (Aircraft)
    this.renderEntities();

    this.animationFrameId = requestAnimationFrame(this.render);
  };

  private renderGeography() {
    if (!this.geoData) return;
    
    const ctx = this.geoBuffer.getContext('2d');
    if (!ctx) return;
    
    // Clear background
    ctx.fillStyle = '#0a1628'; // Ocean color
    ctx.fillRect(0, 0, this.viewport.width, this.viewport.height);
    
    // Setup D3 Projection
    const projection = getD3Projection(this.viewport, this.camera);
    const pathGenerator = getD3Path(ctx, projection);
    
    // Draw land
    ctx.fillStyle = '#1a1f1e';
    ctx.strokeStyle = '#3a5a7a';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    pathGenerator(this.geoData as any);
    ctx.fill();
    ctx.stroke();
  }

  private renderFeatures() {
    const ctx = this.featuresCanvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);
    
    if (!this.gameState) return;
    
    // Draw Bases
    Object.values(this.gameState.bases).forEach(base => {
      const pos = geoToScreen(base.location.lat, base.location.lon, this.viewport, this.camera);
      
      // Avoid rendering if completely off screen
      if (pos.x < -50 || pos.y < -50 || pos.x > this.viewport.width + 50 || pos.y > this.viewport.height + 50) return;
      
      // Draw base icon
      ctx.fillStyle = '#4a90d9';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      
      const size = base.type === 'MOB' ? 12 : 8;
      
      ctx.beginPath();
      if (base.type === 'MOB') {
        ctx.rect(pos.x - size/2, pos.y - size/2, size, size);
      } else {
        // Diamond for FOS
        ctx.moveTo(pos.x, pos.y - size);
        ctx.lineTo(pos.x + size, pos.y);
        ctx.lineTo(pos.x, pos.y + size);
        ctx.lineTo(pos.x - size, pos.y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw label at high zoom levels
      if (this.camera.zoomLevel >= 1 || base.type === 'MOB') {
        ctx.fillStyle = '#e0e6ed';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(base.name, pos.x + size + 4, pos.y + 4);
      }
    });
  }

  private renderEntities() {
    const ctx = this.entitiesCanvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, this.viewport.width, this.viewport.height);
    
    if (!this.gameState) return;
    
    // In a real implementation, aircraft would have a location on the map.
    // For now, our data model puts aircraft 'inside' bases, without a global pos unless flying.
    // We will draw a small representation next to bases if needed later.
  }
}
