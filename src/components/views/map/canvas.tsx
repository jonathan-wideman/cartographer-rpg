import { useRef, useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { 
  drawPath, 
  drawLandmark, 
  drawCurrentLocation, 
  drawDie, 
  findLandmarkAtPoint,
  findDieAtPoint 
} from '@/lib/utils/map';
import type { Point } from '@/lib/types/map';

interface CanvasProps {
  tool: 'draw' | 'erase' | 'stamp' | 'move';
  selectedStamp: string | null;
  onLocationMove?: (point: Point) => void;
}

export function MapCanvas({ tool, selectedStamp, onLocationMove }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const { mapState, updateMapState } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw current state
    drawMapState(ctx);
  }, [mapState]);

  const drawMapState = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw paths
    mapState.paths.forEach(path => drawPath(ctx, path));
    
    // Draw landmarks
    mapState.landmarks.forEach(landmark => drawLandmark(ctx, landmark));
    
    // Draw dice
    mapState.dice.forEach(die => drawDie(ctx, die));
    
    // Draw current location
    if (mapState.currentLocation) {
      drawCurrentLocation(ctx, mapState.currentLocation);
    }
  };

  const getCanvasPoint = (e: React.MouseEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {    
    setIsDrawing(true);
    const point = getCanvasPoint(e);
    setLastPoint(point);
    
    // Check for die click first
    const dieIndex = findDieAtPoint(point, mapState.dice);
    if (dieIndex !== -1) {
      const newDice = [...mapState.dice];
      newDice.splice(dieIndex, 1);
      updateMapState({ dice: newDice });
      return;
    }
    
    if (tool === 'stamp' && selectedStamp) {
      updateMapState({
        landmarks: [...mapState.landmarks, {
          type: selectedStamp,
          position: point
        }]
      });
    } else if (tool === 'move') {
      updateMapState({ currentLocation: point });
      onLocationMove?.(point);
    } else if (tool === 'delete') {
      const landmarkIndex = findLandmarkAtPoint(point, mapState.landmarks);
      if (landmarkIndex !== -1) {
        const newLandmarks = [...mapState.landmarks];
        newLandmarks.splice(landmarkIndex, 1);
        updateMapState({ landmarks: newLandmarks });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !lastPoint) return;
    
    const point = getCanvasPoint(e);
    
    if (tool === 'draw' || tool === 'erase') {
      const newPath = {
        color: tool === 'draw' ? '#000000' : '#ffffff',
        width: tool === 'draw' ? 2 : 10,
        points: [lastPoint, point]
      };
      
      updateMapState({
        paths: [...mapState.paths, newPath]
      });
    }
    
    setLastPoint(point);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[600px] bg-white rounded-lg shadow-sm cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}