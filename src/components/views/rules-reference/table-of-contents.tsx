import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { id: "basics", title: "Game Basics", subsections: ["Core Concepts", "Getting Started"] },
  { id: "character", title: "Character Creation", subsections: ["Attributes", "Background", "Equipment"] },
  { id: "gameplay", title: "Gameplay", subsections: ["Actions", "Combat", "Travel"] },
  { id: "advancement", title: "Advancement", subsections: ["Experience", "Skills", "Reputation"] },
  { id: "appendix", title: "Appendix", subsections: ["Tables", "Optional Rules"] },
];

export function TableOfContents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-4">
          {sections.map((section) => (
            <div key={section.id}>
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="ml-4 space-y-1 mt-1">
                {section.subsections.map((subsection) => (
                  <li key={subsection} className="text-muted-foreground hover:text-foreground cursor-pointer">
                    {subsection}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}