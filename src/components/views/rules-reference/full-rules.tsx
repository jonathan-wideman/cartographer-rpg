import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: "Welcome to the storytelling journey. This game is designed to help you create memorable tales through exploration and journaling."
  },
  {
    id: "core-mechanics",
    title: "Core Mechanics",
    content: "The game uses a combination of dice pools and card draws to resolve actions and generate story elements. Each die that shows 4 or higher counts as a success."
  },
  {
    id: "character-creation",
    title: "Character Creation",
    content: "Begin by choosing your character's name, pronouns, and specialty. Then define their values and current disposition. These elements will guide your storytelling."
  },
  {
    id: "journaling",
    title: "Journaling",
    content: "Record your journey in the journal. Each entry represents a significant moment, discovery, or development in your character's story."
  },
  {
    id: "mapping",
    title: "Mapping",
    content: "Use the map to track your journey. Add landmarks as you discover them and maintain a record of your character's path through the world."
  }
];

export function FullRules() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Full Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}