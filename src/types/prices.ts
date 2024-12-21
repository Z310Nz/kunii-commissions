export interface PriceTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  imageUrl?: string;
  imageSize?: string;
  workDuration?: string;
  jobDetails?: string;
}

export const defaultTiers: PriceTier[] = [
  {
    id: '1',
    name: 'Sketch',
    price: '$30',
    description: 'Simple black and white sketch',
    features: ['Single character', 'Basic background', '3-5 day delivery'],
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    imageSize: '2000x2000px',
    workDuration: '3-5 days',
    jobDetails: 'Black and white sketch with basic shading and linework'
  },
  {
    id: '2',
    name: 'Full Color',
    price: '$60',
    description: 'Fully colored illustration',
    features: ['Single character', 'Detailed background', '7-10 day delivery'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    imageSize: '3000x3000px',
    workDuration: '7-10 days',
    jobDetails: 'Full color illustration with detailed shading and effects'
  },
  {
    id: '3',
    name: 'Premium',
    price: '$100',
    description: 'Premium fully rendered illustration',
    features: ['Multiple characters', 'Complex background', 'Commercial rights'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    imageSize: '4000x4000px',
    workDuration: '14-20 days',
    jobDetails: 'Premium quality artwork with multiple revisions and commercial usage rights'
  }
];