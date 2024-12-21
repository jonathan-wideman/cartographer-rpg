import { BookOpen } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRef } from 'react';

// Define the rules content structure
const rulesContent = {
  quickReference: {
    title: "Quick Reference",
    sections: [
      {
        id: "core-mechanics-quick",
        title: "Core Mechanics",
        content: "Roll dice from your pools to overcome challenges. The number of successes determines the outcome."
      },
      {
        id: "journey-actions-quick",
        title: "Journey Actions",
        content: ["Travel to a new location", "Explore the surroundings", "Make camp and recover"]
      },
      {
        id: "card-draws-quick",
        title: "Card Draws",
        content: "Draw cards to determine random events, encounters, and story developments."
      }
    ]
  },
  fullRules: [
    {
      id: "introduction",
      title: "Introduction",
      content: "Welcome to the storytelling journey. This game is designed to help you create memorable tales through exploration and journaling.",
      subsections: []
    },
    {
      id: "basics",
      title: "Game Basics",
      content: "The fundamental mechanics and concepts that drive the game.",
      subsections: [
        {
          id: "core-concepts",
          title: "Core Concepts",
          content: "This game combines traditional roleplaying elements with journaling and map-making to create a unique solo experience."
        },
        {
          id: "getting-started",
          title: "Getting Started",
          content: "Begin by creating your character and choosing your starting location on the map."
        }
      ]
    },
    {
      id: "character",
      title: "Character Creation",
      content: "The process of creating and developing your character.",
      subsections: [
        {
          id: "attributes",
          title: "Attributes",
          content: "Your character's core attributes define their capabilities and approach to challenges."
        },
        {
          id: "background",
          title: "Background",
          content: "Your character's history shapes their motivations and initial relationships."
        },
        {
          id: "equipment",
          title: "Equipment",
          content: "Starting gear and how to acquire new items during your journey."
        }
      ]
    },
    {
      id: "gameplay",
      title: "Gameplay",
      content: "The core mechanics and systems that drive the game.",
      subsections: [
        {
          id: "actions",
          title: "Actions",
          content: "How to resolve different types of actions using dice pools and cards."
        },
        {
          id: "combat",
          title: "Combat",
          content: "Rules for handling conflicts and combat situations."
        },
        {
          id: "travel",
          title: "Travel",
          content: "How to explore the world and discover new locations."
        }
      ]
    }
  ]
};

export function RulesReference() {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate flat list of all section IDs for quick navigation
  const quickLinks = [
    ...rulesContent.quickReference.sections.map(s => ({ id: s.id, title: s.title })),
    ...rulesContent.fullRules.flatMap(section => [
      { id: section.id, title: section.title },
      ...section.subsections.map(sub => ({ id: sub.id, title: sub.title }))
    ])
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Rules Reference</h1>
      </div>

      {/* Quick Navigation */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {quickLinks.map(link => (
              <Button
                key={link.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(link.id)}
                className="text-sm"
              >
                {link.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardContent className="p-6">
          <ScrollArea className="h-[calc(100vh-16rem)] pr-4" ref={contentRef}>
            {/* Quick Reference */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4" id="quick-reference">
                {rulesContent.quickReference.title}
              </h2>
              <div className="space-y-4">
                {rulesContent.quickReference.sections.map((section) => (
                  <div key={section.id} id={section.id} className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc list-inside text-muted-foreground">
                        {section.content.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">{section.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Full Rules */}
            <div className="space-y-12">
              {rulesContent.fullRules.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <p className="text-muted-foreground mb-6">{section.content}</p>
                  
                  {section.subsections.length > 0 && (
                    <div className="space-y-6 ml-6">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.id} id={subsection.id}>
                          <h3 className="text-xl font-semibold mb-2">{subsection.title}</h3>
                          <p className="text-muted-foreground">{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}