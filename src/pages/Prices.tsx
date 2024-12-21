import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { PriceTier, defaultTiers } from '@/types/prices';
import BackButton from '@/components/BackButton';

const Prices = () => {
  const { data: tiers = defaultTiers } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      return defaultTiers;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-4 md:p-8">
      <BackButton />
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#1A1F2C]">Commission Prices</h1>
        <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          Choose the perfect tier for your artistic vision
        </p>
        
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.id} className="p-6 md:p-8 bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {tier.imageUrl && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={tier.imageUrl} 
                    alt={tier.name}
                    className="w-full h-40 md:h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="text-primary mb-4">
                <Image className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-[#1A1F2C]">{tier.name}</h2>
              <p className="text-2xl md:text-3xl font-bold text-primary mb-4">{tier.price}</p>
              
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Maximize2 className="w-4 h-4" />
                <span className="text-sm md:text-base">{tier.imageSize}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm md:text-base">{tier.workDuration}</span>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm md:text-base">{tier.description}</p>
              
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-6">
                <div className="flex items-start gap-2 text-gray-700">
                  <FileText className="w-4 h-4 mt-1" />
                  <p className="text-sm md:text-base">{tier.jobDetails}</p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6 md:mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm md:text-base">{feature}</span>
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
