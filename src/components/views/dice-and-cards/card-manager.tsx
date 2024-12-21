import { useState } from 'react';
import { LayoutGrid, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PlayingCard = {
  id: string;
  suit: '♠' | '♥' | '♦' | '♣' | 'J';
  value: string;
  isRed: boolean;
};

function createDeck(): PlayingCard[] {
  const suits: Array<'♠' | '♥' | '♦' | '♣'> = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  const cards: PlayingCard[] = [];
  
  // Regular cards
  for (const suit of suits) {
    for (const value of values) {
      cards.push({
        id: `${value}${suit}`,
        suit,
        value,
        isRed: suit === '♥' || suit === '♦'
      });
    }
  }
  
  // Jokers
  cards.push({ id: 'JR', suit: 'J', value: '🃏', isRed: true });
  cards.push({ id: 'JB', suit: 'J', value: '🃏', isRed: false });
  
  return cards;
}

function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  return [...deck].sort(() => Math.random() - 0.5);
}

export function CardManager() {
  const [deck, setDeck] = useState<PlayingCard[]>(createDeck());
  const [hand, setHand] = useState<PlayingCard[]>([]);
  const [discard, setDiscard] = useState<PlayingCard[]>([]);

  const drawCard = () => {
    if (deck.length === 0) return;
    
    const [drawnCard, ...remainingDeck] = deck;
    setDeck(remainingDeck);
    setHand([...hand, drawnCard]);
  };

  const discardCard = (cardId: string) => {
    const card = hand.find(c => c.id === cardId);
    if (!card) return;
    
    setHand(hand.filter(c => c.id !== cardId));
    setDiscard([...discard, card]);
  };

  const resetDeck = () => {
    const allCards = [...deck, ...hand, ...discard];
    setDeck(shuffleDeck(allCards));
    setHand([]);
    setDiscard([]);
  };

  const shuffleHandIntoDeck = () => {
    setDeck(shuffleDeck([...deck, ...hand]));
    setHand([]);
  };

  const shuffleDiscardIntoDeck = () => {
    setDeck(shuffleDeck([...deck, ...discard]));
    setDiscard([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5" />
          Playing Cards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button onClick={drawCard} disabled={deck.length === 0}>
              Draw ({deck.length})
            </Button>
            <Button variant="outline" onClick={resetDeck}>
              Reset & Shuffle
            </Button>
          </div>

          {/* Hand */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Hand ({hand.length})</h3>
              {hand.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shuffleHandIntoDeck}
                  className="h-8 gap-2"
                >
                  <Shuffle className="h-4 w-4" />
                  Shuffle into Deck
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {hand.map((card) => (
                <Button
                  key={card.id}
                  variant="outline"
                  className="h-12 px-2 font-mono"
                  onClick={() => discardCard(card.id)}
                >
                  <span className={card.isRed ? 'text-red-500' : ''}>
                    {card.value}{card.suit}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Discard */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Discard ({discard.length})</h3>
              {discard.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shuffleDiscardIntoDeck}
                  className="h-8 gap-2"
                >
                  <Shuffle className="h-4 w-4" />
                  Shuffle into Deck
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {discard.slice(-5).map((card) => (
                <div
                  key={card.id}
                  className="h-12 px-2 font-mono border rounded flex items-center opacity-50"
                >
                  <span className={card.isRed ? 'text-red-500' : ''}>
                    {card.value}{card.suit}
                  </span>
                </div>
              ))}
              {discard.length > 5 && (
                <div className="h-12 px-2 border rounded flex items-center opacity-50">
                  +{discard.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}