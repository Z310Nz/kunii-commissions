export interface PriceTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  imageUrl?: string;
}

export const defaultTiers: PriceTier[] = [
  {
    id: '1',
    name: 'Sketch',
    price: '$30',
    description: 'Simple black and white sketch',
    features: ['Single character', 'Basic background', '3-5 day delivery'],
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
  },
  {
    id: '2',
    name: 'Full Color',
    price: '$60',
    description: 'Fully colored illustration',
    features: ['Single character', 'Detailed background', '7-10 day delivery'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
  },
  {
    id: '3',
    name: 'Premium',
    price: '$100',
    description: 'Premium fully rendered illustration',
    features: ['Multiple characters', 'Complex background', 'Commercial rights'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
  }
];