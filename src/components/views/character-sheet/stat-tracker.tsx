import { Plus, Minus, Users, Coins, Package, Utensils, Backpack, Bandage, AlertTriangle, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';

interface StatProps {
  label: keyof typeof defaultStats;
  value: number;
  notes: string;
  onValueChange: (value: number) => void;
  onNotesChange: (notes: string) => void;
}

const defaultStats = {
  reputation: { 
    icon: <Users className="h-4 w-4 text-foreground" />,
    min: -10,
    max: 10,
  },
  coin: { 
    icon: <Coins className="h-4 w-4 text-foreground" />,
    max: undefined,
    min: undefined,
  },
  wares: { 
    icon: <Package className="h-4 w-4 text-foreground" />,
    max: undefined,
    min: undefined,
  },
  food: { 
    icon: <Utensils className="h-4 w-4 text-foreground" />,
    max: undefined,
    min: undefined,
  },
  items: { 
    icon: <Backpack className="h-4 w-4 text-foreground" />,
    max: undefined,
    min: undefined,
  },
  wounds: { 
    icon: <Bandage className="h-4 w-4 text-foreground" />,
    max: undefined,
    min: undefined,
  },
  threat: { 
    icon: <AlertTriangle className="h-4 w-4 text-foreground" />,
    max: 3,
    min: undefined,
  },
  disaster: { 
    icon: <Skull className="h-4 w-4 text-foreground" />,
    max: 3, 
    min: undefined,
  },
};

function Stat({ label, value, notes, onValueChange, onNotesChange }: StatProps) {
  const { icon, max: statMax, min: statMin } = defaultStats[label as keyof typeof defaultStats];
  const max = statMax ?? Number.MAX_VALUE;
  const min = statMin ?? 0;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="capitalize flex items-center gap-2">
          {icon} {label}
        </Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onValueChange(Math.max(min, value - 1))}
            disabled={value <= min}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-4 w-4 text-foreground" />
          </Button>
          <span className="w-8 text-center font-mono">{value}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onValueChange(Math.min(max, value + 1))}
            disabled={value >= max}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4 text-foreground" />
          </Button>
        </div>
      </div>
      <Textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder={`Notes about ${label}...`}
        className="h-24 resize-none"
      />
    </div>
  );
}

export function StatTracker() {

  const { character, updateCharacter } = useStore();
  const { stats } = character;

  const handleStatChange = (stat: keyof typeof stats) => (value: number) => {
    updateCharacter({
      stats: {
        ...stats,
        [stat]: { value, notes: stats[stat].notes }
      }
    });
  };

  const handleNotesChange = (stat: keyof typeof stats) => (notes: number) => {
     updateCharacter({
      stats: {
        ...stats,
        [stat]: { value: stats[stat].value, notes }
      }
    });
  };
  
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Object.keys(defaultStats).map((stat) => <Stat
        key = {stat}
        // @ts-ignore TODO: issue #1 cleanup tsignores
        label = {stat}
        // @ts-ignore TODO: issue #1 cleanup tsignores
        value = {stats[stat].value}
        // @ts-ignore
        notes = {stats[stat].notes}
        // @ts-ignore TODO: issue #1 cleanup tsignores
        onValueChange = {handleStatChange(stat)}
        // @ts-ignore TODO: issue #1 cleanup tsignores
        onNotesChange = {handleNotesChange(stat)}
      />)}
    </div>
  );
}