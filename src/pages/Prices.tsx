import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Maximize2, FileText, Image } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PriceTier, defaultTiers } from '@/types/prices';

const Prices = () => {
  const { data: tiers = defaultTiers } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      // In a real app, this would fetch from your API
      return defaultTiers;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold text-center mb-4 text-[#1A1F2C]">Commission Prices</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose the perfect tier for your artistic vision
        </p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.id} className="p-8 bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {tier.imageUrl && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={tier.imageUrl} 
                    alt={tier.name}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="text-primary mb-4">
                <Image className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-[#1A1F2C]">{tier.name}</h2>
              <p className="text-3xl font-bold text-primary mb-4">{tier.price}</p>
              
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Maximize2 className="w-4 h-4" />
                <span>{tier.imageSize}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span>{tier.workDuration}</span>
              </div>
              
              <p className="text-gray-600 mb-4">{tier.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-2 text-gray-700">
                  <FileText className="w-4 h-4 mt-1" />
                  <p>{tier.jobDetails}</p>
                </div>
              </div>
              
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;