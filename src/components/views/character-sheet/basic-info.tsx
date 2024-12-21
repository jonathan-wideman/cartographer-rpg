import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/store';

export function BasicInfo() {
  const { character, updateCharacter } = useStore();
  
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={character.name}
          onChange={(e) => updateCharacter({ name: e.target.value })}
          placeholder="Character name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="pronouns">Pronouns</Label>
        <Input
          id="pronouns"
          value={character.pronouns}
          onChange={(e) => updateCharacter({ pronouns: e.target.value })}
          placeholder="they/them"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="specialty">Specialty</Label>
        <Input
          id="specialty"
          value={character.specialty}
          onChange={(e) => updateCharacter({ specialty: e.target.value })}
          placeholder="What makes your character unique?"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="values">Values</Label>
        <Input
          id="values"
          value={character.values}
          onChange={(e) => updateCharacter({ values: e.target.value })}
          placeholder="What does your character believe in?"
        />
      </div>
      
      <div className="sm:col-span-2 space-y-2">
        <Label htmlFor="disposition">Disposition</Label>
        <Input
          id="disposition"
          value={character.disposition}
          onChange={(e) => updateCharacter({ disposition: e.target.value })}
          placeholder="How does your character typically act?"
        />
      </div>
    </div>
  );
}