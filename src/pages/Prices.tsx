import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Prices = () => {
  const tiers = [
    {
      name: 'Sketch',
      price: '$30',
      description: 'Simple black and white sketch',
      features: ['Single character', 'Basic background', '3-5 day delivery']
    },
    {
      name: 'Full Color',
      price: '$60',
      description: 'Fully colored illustration',
      features: ['Single character', 'Detailed background', '7-10 day delivery']
    },
    {
      name: 'Premium',
      price: '$100',
      description: 'Premium fully rendered illustration',
      features: ['Multiple characters', 'Complex background', 'Commercial rights']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8">Commission Prices</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{tier.name}</h2>
              <p className="text-3xl font-bold text-primary mb-4">{tier.price}</p>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Request Commission</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;