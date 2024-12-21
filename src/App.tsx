import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Journal } from '@/components/views/journal';
import { Map } from '@/components/views/map';
import { CharacterSheet } from '@/components/views/character-sheet';
import { DiceAndCards } from '@/components/views/dice-and-cards';
import { RulesReference } from '@/components/views/rules-reference';
import { Settings } from '@/components/views/settings';
import { Toaster } from '@/components/ui/sonner';

type View = 'journal' | 'map' | 'character' | 'dice-cards' | 'rules' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('journal');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="min-h-screen bg-background text-foreground flex">
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-6 overflow-auto">
          {currentView === 'journal' && <Journal />}
          {currentView === 'map' && <Map />}
          {currentView === 'character' && <CharacterSheet />}
          {currentView === 'dice-cards' && <DiceAndCards />}
          {currentView === 'rules' && <RulesReference />}
          {currentView === 'settings' && <Settings />}
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;