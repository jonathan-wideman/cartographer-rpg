import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Reference</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <section>
          <h3 className="font-semibold mb-2">Core Mechanics</h3>
          <p className="text-muted-foreground">Roll dice from your pools to overcome challenges. The number of successes determines the outcome.</p>
        </section>
        
        <section>
          <h3 className="font-semibold mb-2">Journey Actions</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Travel to a new location</li>
            <li>Explore the surroundings</li>
            <li>Make camp and recover</li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Card Draws</h3>
          <p className="text-muted-foreground">Draw cards to determine random events, encounters, and story developments.</p>
        </section>
      </CardContent>
    </Card>
  );
}