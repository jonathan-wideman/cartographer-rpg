import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useStore } from '@/lib/store';

export function NewEntry() {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addJournalEntry = useStore((state) => state.addJournalEntry);

  const handleAdd = () => {
    if (!title.trim() && !content.trim()) return;
    
    // Use ISO string for consistent date sorting
    const now = new Date();
    
    addJournalEntry({
      title: title.trim() || now.toLocaleDateString(),
      content: content.trim(),
      date: now.toISOString(),
    });
    
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        New Entry
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <Input
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-semibold"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Write your entry..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Entry</Button>
        </div>
      </CardContent>
    </Card>
  );
}