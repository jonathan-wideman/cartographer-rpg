import { useState } from 'react';
import { Pencil, Trash2, GripVertical, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EntryCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  onUpdate: (id: string, data: { title?: string; content?: string }) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
}

export function EntryCard({
  id,
  title,
  content,
  date,
  onUpdate,
  onDelete,
  dragHandleProps,
}: EntryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    onUpdate(id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditContent(content);
    setIsEditing(false);
  };

  // Format the date for display
  const displayDate = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="relative group">
      <div
        {...dragHandleProps}
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4" />
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="font-semibold"
          />
        ) : (
          <div className="font-semibold">{title}</div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{displayDate}</span>
          {isEditing ? (
            <>
              <Button variant="ghost" onClick={handleSave} className="gap-2">
                <Check className="h-4 w-4" />
                Save
              </Button>
              <Button variant="ghost" onClick={handleCancel} className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="ghost"
                onClick={() => onDelete(id)}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <div className="whitespace-pre-wrap">{content}</div>
        )}
      </CardContent>
    </Card>
  );
}