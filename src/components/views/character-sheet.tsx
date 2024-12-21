import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BasicInfo } from './character-sheet/basic-info';
import { DicePools } from './character-sheet/dice-pools';
import { StatTracker } from './character-sheet/stat-tracker';

export function CharacterSheet() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Character Sheet</h1>
      </div>

      <div className="grid gap-6">
        {/* Basic Character Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <BasicInfo />
          </CardContent>
        </Card>

        {/* Dice Pools */}
        <Card>
          <CardHeader>
            <CardTitle>Dice Pools</CardTitle>
          </CardHeader>
          <CardContent>
            <DicePools />
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Stats & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <StatTracker />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}