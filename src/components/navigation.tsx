import { ScrollText, Map as MapIcon, User, Dice6, BookOpen, Settings, DraftingCompass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type View = 'journal' | 'map' | 'character' | 'dice-cards' | 'rules' | 'settings';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const navItems = [
  { id: 'journal' as const, icon: ScrollText, label: 'Journal' },
  { id: 'map' as const, icon: MapIcon, label: 'Map' },
  { id: 'character' as const, icon: User, label: 'Character' },
  { id: 'dice-cards' as const, icon: Dice6, label: 'Dice & Cards' },
  { id: 'rules' as const, icon: BookOpen, label: 'Rules' },
  { id: 'settings' as const, icon: Settings, label: 'Settings' },
];

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="h-screen w-64 border-r bg-card p-4 flex flex-col gap-2">
      <div className="inline-flex gap-2 text-2xl font-semibold text-primary mb-6 px-2">
        <DraftingCompass /> Cartographer
      </div>
      {navItems.map(({ id, icon: Icon, label }) => (
        <Button
          key={id}
          variant={currentView === id ? 'secondary' : 'ghost'}
          className={cn(
            'w-full justify-start gap-2',
            currentView === id && 'bg-secondary'
          )}
          onClick={() => onViewChange(id)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </nav>
  );
}