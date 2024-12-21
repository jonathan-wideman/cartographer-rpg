import { 
  Pencil, 
  Eraser, 
  MapPin, 
  Navigation,
  Trash2,
  Home,
  Mountain,
  Trees,
  Building,
  Building2,
  Castle,
  Landmark
} from 'lucide-react';

export const tools = [
  { id: 'draw', icon: Pencil, label: 'Draw' },
  { id: 'erase', icon: Eraser, label: 'Erase' },
  { id: 'stamp', icon: MapPin, label: 'Place Landmark' },
  { id: 'delete', icon: Trash2, label: 'Delete Landmark' },
  { id: 'move', icon: Navigation, label: 'Move Location' },
];

export const stamps = [
  { id: 'town', icon: Home, label: 'Town' },
  { id: 'city', icon: Building, label: 'City' },
  { id: 'capital', icon: Building2, label: 'Capital' },
  { id: 'ruins', icon: Castle, label: 'Ruins' },
  { id: 'landmark', icon: Landmark, label: 'Point of Interest' },
  { id: 'mountain', icon: Mountain, label: 'Mountain' },
  { id: 'forest', icon: Trees, label: 'Forest' },
];