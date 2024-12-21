import { useState } from 'react';
import { Dice6 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DiceRoll {
  id: number;
  value: number;
}

export function DiceRoller() {
  const [diceCount, setDiceCount] = useState(1);
  const [rolls, setRolls] = useState<DiceRoll[]>([]);

  const rollDice = () => {
    const newRolls = Array.from({ length: diceCount }, (_, i) => ({
      id: Date.now() + i,
      value: Math.floor(Math.random() * 6) + 1
    }));
    setRolls(newRolls);
  };

  const sum = rolls.reduce((acc, roll) => acc + roll.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dice6 className="h-5 w-5" />
          Dice Roller
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setDiceCount(Math.max(1, diceCount - 1))}
              disabled={diceCount <= 1}
            >
              -
            </Button>
            <span className="min-w-[3ch] text-center">{diceCount}</span>
            <Button
              variant="outline"
              onClick={() => setDiceCount(Math.min(12, diceCount + 1))}
              disabled={diceCount >= 12}
            >
              +
            </Button>
            <Button onClick={rollDice}>Roll {diceCount}d6</Button>
          </div>

          {rolls.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {rolls.map((roll) => (
                  <div
                    key={roll.id}
                    className="w-10 h-10 rounded border flex items-center justify-center font-mono text-lg"
                  >
                    {roll.value}
                  </div>
                ))}
              </div>
              <div className="text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{sum}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}