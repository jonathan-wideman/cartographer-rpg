import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MapState } from './types/map';

export interface GameState {
  // Journal
  journalEntries: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
  }>;

  // Character
  character: {
    name: string;
    pronouns: string;
    specialty: string;
    values: string;
    disposition: string;
    dicePools: {
      biome: number;
      landmark: number;
      bonus: number;
    };
    stats: {
      reputation: { value: number; notes: string };
      coin: { value: number; notes: string };
      wares: { value: number; notes: string };
      food: { value: number; notes: string };
      items: { value: number; notes: string };
      wounds: { value: number; notes: string };
      threat: { value: number; notes: string };
      disaster: { value: number; notes: string };
    };
  };

  // Map
  mapState: MapState;

  // Settings
  settings: {
    theme: 'light' | 'dark' | 'system';
    autoSave: boolean;
  };

  // Actions
  updateCharacter: (character: Partial<GameState['character']>) => void;
  updateSettings: (settings: Partial<GameState['settings']>) => void;
  addJournalEntry: (entry: Omit<GameState['journalEntries'][0], 'id'>) => void;
  updateJournalEntry: (id: string, entry: Partial<GameState['journalEntries'][0]>) => void;
  deleteJournalEntry: (id: string) => void;
  updateMapState: (state: Partial<MapState>) => void;
  resetGame: () => void;
}

const initialState: Omit<GameState, 'updateCharacter' | 'updateSettings' | 'addJournalEntry' | 'updateJournalEntry' | 'deleteJournalEntry' | 'updateMapState' | 'resetGame'> = {
  journalEntries: [],
  character: {
    name: '',
    pronouns: '',
    specialty: '',
    values: '',
    disposition: '',
    dicePools: {
      biome: 0,
      landmark: 0,
      bonus: 0,
    },
    stats: {
      reputation: { value: 0, notes: '' },
      coin: { value: 0, notes: '' },
      wares: { value: 0, notes: '' },
      food: { value: 0, notes: '' },
      items: { value: 0, notes: '' },
      wounds: { value: 0, notes: '' },
      threat: { value: 0, notes: '' },
      disaster: { value: 0, notes: '' },
    },
  },
  mapState: {
    paths: [],
    landmarks: [],
    currentLocation: null,
    dice: [],
  },
  settings: {
    theme: 'system',
    autoSave: true,
  },
};

export const useStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,
      updateCharacter: (character) =>
        set((state) => ({
          character: { ...state.character, ...character },
        })),
      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [
            ...state.journalEntries,
            { ...entry, id: crypto.randomUUID() },
          ],
        })),
      updateJournalEntry: (id, entry) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((e) =>
            e.id === id ? { ...e, ...entry } : e
          ),
        })),
      deleteJournalEntry: (id) =>
        set((state) => ({
          journalEntries: state.journalEntries.filter((e) => e.id !== id),
        })),
      updateMapState: (state) =>
        set((prev) => ({
          mapState: { ...prev.mapState, ...state },
        })),
      resetGame: () =>
        set((state) => ({
          ...initialState,
          settings: state.settings,
        })),
    }),
    {
      name: 'game-storage',
    }
  )
);