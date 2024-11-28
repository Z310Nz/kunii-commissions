import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Clock, Users, Image } from 'lucide-react';

const Prices = () => {
  const tiers = [
    {
      name: 'Sketch',
      price: '$30',
      description: 'Simple black and white sketch',
      features: ['Single character', 'Basic background', '3-5 day delivery'],
      icon: Image
    },
    {
      name: 'Full Color',
      price: '$60',
      description: 'Fully colored illustration',
      features: ['Single character', 'Detailed background', '7-10 day delivery'],
      icon: Palette
    },
    {
      name: 'Premium',
      price: '$100',
      description: 'Premium fully rendered illustration',
      features: ['Multiple characters', 'Complex background', 'Commercial rights'],
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold text-center mb-4 text-[#1A1F2C]">Commission Prices</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose the perfect tier for your artistic vision
        </p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card key={tier.name} className="p-8 bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-primary mb-4">
                  <Icon className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-[#1A1F2C]">{tier.name}</h2>
                <p className="text-3xl font-bold text-primary mb-4">{tier.price}</p>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Request Commission
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Prices;