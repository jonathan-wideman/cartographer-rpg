import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ToolButton } from './toolbar/tool-button';
import { DiceControls } from './toolbar/dice-controls';
import { tools, stamps } from './toolbar/tool-groups';
import { useStore } from '@/lib/store';
import { getRandomPoint, rollDie } from '@/lib/utils/map';

interface ToolbarProps {
  activeTool: string;
  selectedStamp: string | null;
  onToolChange: (tool: string) => void;
  onStampSelect: (stamp: string) => void;
}

export function MapToolbar({ 
  activeTool, 
  selectedStamp,
  onToolChange, 
  onStampSelect 
}: ToolbarProps) {
  const { character, mapState, updateMapState } = useStore();

  const handleRollDice = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const newDice = [];
    const { dicePools } = character;

    // Roll biome dice
    for (let i = 0; i < dicePools.biome; i++) {
      newDice.push({
        id: crypto.randomUUID(),
        type: 'biome',
        value: rollDie(),
        position: getRandomPoint(canvas)
      });
    }

    // Roll landmark dice
    for (let i = 0; i < dicePools.landmark; i++) {
      newDice.push({
        id: crypto.randomUUID(),
        type: 'landmark',
        value: rollDie(),
        position: getRandomPoint(canvas)
      });
    }

    // Roll bonus dice
    for (let i = 0; i < dicePools.bonus; i++) {
      newDice.push({
        id: crypto.randomUUID(),
        type: 'bonus',
        value: rollDie(),
        position: getRandomPoint(canvas)
      });
    }

    updateMapState({ dice: newDice });
  };

  const handleClearDice = () => {
    updateMapState({ dice: [] });
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2 p-2 bg-card rounded-lg shadow-sm">
        <div className="flex gap-1 border-r pr-2">
          {tools.map((tool) => (
            <ToolButton
              key={tool.id}
              icon={tool.icon}
              label={tool.label}
              isActive={activeTool === tool.id}
              onClick={() => onToolChange(tool.id)}
            />
          ))}
        </div>
        
        <div className={cn(
          "flex gap-1 transition-opacity",
          activeTool === 'stamp' ? 'opacity-100' : 'opacity-50 pointer-events-none'
        )}>
          {stamps.map((stamp) => (
            <ToolButton
              key={stamp.id}
              icon={stamp.icon}
              label={stamp.label}
              isActive={selectedStamp === stamp.id}
              onClick={() => onStampSelect(stamp.id)}
            />
          ))}
        </div>

        <DiceControls
          onRoll={handleRollDice}
          onClearDice={handleClearDice}
        />
      </div>
    </TooltipProvider>
  );
}