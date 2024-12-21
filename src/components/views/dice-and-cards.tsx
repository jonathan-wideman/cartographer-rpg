import { Dice6 } from 'lucide-react';
import { DiceRoller } from './dice-and-cards/dice-roller';
import { CardManager } from './dice-and-cards/card-manager';
import { ResultTables } from './dice-and-cards/result-tables';

export function DiceAndCards() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Dice6 className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Dice & Cards</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <DiceRoller />
        <CardManager />
        <div className="md:col-span-2">
          <ResultTables />
        </div>
      </div>
    </div>
  );
}