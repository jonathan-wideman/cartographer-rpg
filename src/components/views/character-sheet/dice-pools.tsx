import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/store';

interface DicePoolProps {
  label: 'biome' | 'landmark' | 'bonus';
  value: number;
  onChange: (value: number) => void;
}

function DicePool({ label, value, onChange }: DicePoolProps) {
  return (
    <div className="space-y-2">
      <Label className="capitalize">{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4 text-foreground" />
        </Button>
        <span className="w-8 text-center font-mono">{value}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.min(12, value + 1))}
          disabled={value >= 12}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4 text-foreground" />
        </Button>
      </div>
    </div>
  );
}

export function DicePools() {
  const { character, updateCharacter } = useStore();
  const { dicePools } = character;

  const handlePoolChange = (pool: keyof typeof dicePools) => (value: number) => {
    updateCharacter({
      dicePools: {
        ...dicePools,
        [pool]: value
      }
    });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <DicePool
        label="biome"
        value={dicePools.biome}
        onChange={handlePoolChange('biome')}
      />
      <DicePool
        label="landmark"
        value={dicePools.landmark}
        onChange={handlePoolChange('landmark')}
      />
      <DicePool
        label="bonus"
        value={dicePools.bonus}
        onChange={handlePoolChange('bonus')}
      />
    </div>
  );
}