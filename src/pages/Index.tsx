import { Link } from 'react-router-dom';
import { Mail, Link as LinkIcon, Palette, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-[#1A1F2C] tracking-tight">Artistic Commissions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing your imagination to life through unique and personalized artwork
          </p>
        </div>

        {/* Featured Image */}
        <Card className="overflow-hidden border-none shadow-lg">
          <AspectRatio ratio={16 / 9}>
            <img 
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
              alt="Artistic landscape"
              className="object-cover w-full h-full rounded-lg transform hover:scale-105 transition-transform duration-500"
            />
          </AspectRatio>
        </Card>

        {/* Contact & Links Section */}
        <Card className="p-8 bg-white/80 backdrop-blur border-none shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-[#1A1F2C] flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            Contact & Links
          </h2>
          <div className="grid gap-6">
            <a 
              href="mailto:artist@example.com" 
              className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors p-3 rounded-lg hover:bg-secondary/50"
            >
              <Mail className="w-5 h-5" />
              artist@example.com
            </a>
            <a 
              href="https://instagram.com/artist" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors p-3 rounded-lg hover:bg-secondary/50"
            >
              <Instagram className="w-5 h-5" />
              @artist
            </a>
            <a 
              href="https://twitter.com/artist" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors p-3 rounded-lg hover:bg-secondary/50"
            >
              <LinkIcon className="w-5 h-5" />
              Twitter
            </a>
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/prices">
            <Button 
              variant="outline" 
              className="w-full bg-white/80 backdrop-blur border-2 hover:bg-secondary/50 transition-all duration-300 h-16 text-lg"
            >
              View Commission Prices
            </Button>
          </Link>
          <Link to="/status">
            <Button 
              variant="outline" 
              className="w-full bg-white/80 backdrop-blur border-2 hover:bg-secondary/50 transition-all duration-300 h-16 text-lg"
            >
              Commission Status
            </Button>
          </Link>
          <Link to="/queue">
            <Button 
              variant="outline" 
              className="w-full bg-white/80 backdrop-blur border-2 hover:bg-secondary/50 transition-all duration-300 h-16 text-lg"
            >
              Check Queue Position
            </Button>
          </Link>
          <Link to="/login">
            <Button 
              variant="outline" 
              className="w-full bg-white/80 backdrop-blur border-2 hover:bg-secondary/50 transition-all duration-300 h-16 text-lg"
            >
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;