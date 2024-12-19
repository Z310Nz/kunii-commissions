import { Link } from 'react-router-dom';
import { DollarSign, CheckSquare, ListOrdered } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-[#1A1F2C] tracking-tight">Artistic Commissions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing your imagination to life through unique and personalized artwork
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Prices Card */}
          <Link to="/prices" className="transform hover:scale-105 transition-transform duration-300">
            <Card className="h-full bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mt-4">Commission Prices</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                View our detailed pricing structure for different commission types
              </CardContent>
            </Card>
          </Link>

          {/* Status Card */}
          <Link to="/status" className="transform hover:scale-105 transition-transform duration-300">
            <Card className="h-full bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                  <CheckSquare className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mt-4">Commission Status</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                Check if commissions are currently open or closed
              </CardContent>
            </Card>
          </Link>

          {/* Queue Card */}
          <Link to="/queue" className="transform hover:scale-105 transition-transform duration-300">
            <Card className="h-full bg-white/80 backdrop-blur border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                  <ListOrdered className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mt-4">Commission Queue</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                View current commission queue and position tracking
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Contact Section */}
        <div className="text-center space-y-6 mt-12">
          <h2 className="text-3xl font-semibold text-[#1A1F2C]">Get in Touch</h2>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="mailto:artist@example.com" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              artist@example.com
            </a>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/artist" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com/artist" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;