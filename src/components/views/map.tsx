import { useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { MapCanvas } from './map/canvas';
import { MapToolbar } from './map/toolbar';
import { useStore } from '@/lib/store';
import type { Point } from '@/lib/types/map';

export function Map() {
  const [activeTool, setActiveTool] = useState<'draw' | 'erase' | 'stamp' | 'move'>('draw');
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const { updateMapState } = useStore();

  const handleToolChange = (tool: string) => {
    setActiveTool(tool as 'draw' | 'erase' | 'stamp' | 'move');
    if (tool !== 'stamp') {
      setSelectedStamp(null);
    }
  };

  const handleStampSelect = (stamp: string) => {
    setSelectedStamp(stamp);
    setActiveTool('stamp');
  };

  const handleLocationMove = (point: Point) => {
    updateMapState({ currentLocation: point });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapIcon className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Map</h1>
      </div>
      
      <MapToolbar
        activeTool={activeTool}
        selectedStamp={selectedStamp}
        onToolChange={handleToolChange}
        onStampSelect={handleStampSelect}
      />
      
      <MapCanvas
        tool={activeTool}
        selectedStamp={selectedStamp}
        onLocationMove={handleLocationMove}
      />
    </div>
  );
}