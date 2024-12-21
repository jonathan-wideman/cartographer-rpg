import { ScrollText } from 'lucide-react';
import { NewEntry } from './journal/new-entry';
import { EntryList } from './journal/entry-list';

export function Journal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScrollText className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Journal</h1>
        </div>
      </div>
      <div className="space-y-4">
        <NewEntry />
        <EntryList />
      </div>
    </div>
  );
}