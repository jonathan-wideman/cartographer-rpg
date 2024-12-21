import { useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { MapCanvas } from './canvas';
import { MapToolbar } from './toolbar';

export function Map() {
  const [activeTool, setActiveTool] = useState('draw');
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

  const handleToolChange = (tool: string) => {
    setActiveTool(tool);
    if (tool !== 'stamp') {
      setSelectedStamp(null);
    }
  };

  const handleStampSelect = (stamp: string) => {
    setSelectedStamp(stamp);
    setActiveTool('stamp');
  };

  const handleLocationMove = (point: { x: number; y: number }) => {
    // Handle location update in parent component or store
    console.log('Location moved to:', point);
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
        tool={activeTool as 'draw' | 'erase' | 'stamp' | 'move'}
        selectedStamp={selectedStamp}
        onLocationMove={handleLocationMove}
      />
    </div>
  );
}