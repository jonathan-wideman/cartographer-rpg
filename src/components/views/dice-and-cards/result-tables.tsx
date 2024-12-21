import { useState } from 'react';
import { Table } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample tables - these would be expanded with real content
const tables = {
  encounters: {
    title: 'Random Encounters',
    type: 'dice',
    results: [
      { roll: '1-2', result: 'Friendly Traveler' },
      { roll: '3-4', result: 'Natural Hazard' },
      { roll: '5-6', result: 'Hostile Creature' },
    ]
  },
  weather: {
    title: 'Weather Events',
    type: 'cards',
    results: [
      { card: '♠A-3', result: 'Clear Skies' },
      { card: '♠4-6', result: 'Light Rain' },
      { card: '♠7-10', result: 'Heavy Storm' },
    ]
  },
  discoveries: {
    title: 'Location Discoveries',
    type: 'dice',
    results: [
      { roll: '1-2', result: 'Ancient Ruins' },
      { roll: '3-4', result: 'Hidden Cave' },
      { roll: '5-6', result: 'Sacred Grove' },
    ]
  },
};

export function ResultTables() {
  const [selectedTable, setSelectedTable] = useState<keyof typeof tables>('encounters');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Table className="h-5 w-5" />
          Result Tables
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select
            value={selectedTable}
            onValueChange={(value) => setSelectedTable(value as keyof typeof tables)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a table" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(tables).map(([key, table]) => (
                <SelectItem key={key} value={key}>
                  {table.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="space-y-4">
              <h3 className="font-semibold">{tables[selectedTable].title}</h3>
              <p className="text-sm text-muted-foreground">
                Use {tables[selectedTable].type === 'dice' ? 'dice roll' : 'card draw'} to determine result
              </p>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">
                      {tables[selectedTable].type === 'dice' ? 'Roll' : 'Card'}
                    </th>
                    <th className="text-left py-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {tables[selectedTable].results.map((result, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 font-mono">
                        {tables[selectedTable].type === 'dice' ? result.roll : result.card}
                      </td>
                      <td className="py-2">{result.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}