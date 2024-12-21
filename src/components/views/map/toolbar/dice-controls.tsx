import { Dices } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { MapDie } from '@/lib/types/map';

interface DiceControlsProps {
  onRoll: () => void;
  onClearDice: () => void;
}

export function DiceControls({ onRoll, onClearDice }: DiceControlsProps) {
  const { character, mapState } = useStore();
  const { dicePools } = character;
  
  const diceByType = mapState.dice.reduce((acc, die) => {
    acc[die.type] = (acc[die.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex items-center gap-2 border-l pl-2">
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-green-600 dark:text-green-400">
          {dicePools.biome}d6
        </span>
        <span>+</span>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {dicePools.landmark}d6
        </span>
        <span>+</span>
        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
          {dicePools.bonus}d6
        </span>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onRoll}
        className="h-10 w-10 p-2"
      >
        <Dices className="h-full w-full" />
      </Button>

      {mapState.dice.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearDice}
          className="text-xs"
        >
          Clear Dice
        </Button>
      )}
    </div>
  );
}