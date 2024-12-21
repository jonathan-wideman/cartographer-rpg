import { useStore } from '@/lib/store';
import { EntryCard } from './entry-card';

export function EntryList() {
  const { journalEntries, updateJournalEntry, deleteJournalEntry } = useStore();

  // Sort entries by date in reverse chronological order
  const sortedEntries = [...journalEntries].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-4">
      {sortedEntries.map((entry) => (
        <EntryCard
          key={entry.id}
          {...entry}
          onUpdate={updateJournalEntry}
          onDelete={deleteJournalEntry}
        />
      ))}
    </div>
  );
}