import { Link } from 'react-router-dom';
import { DollarSign, CheckSquare, ListOrdered, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Status from './Status';
import Queue from './Queue';
import Prices from './Prices';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white">
      {/* Hero Section */}
      <div className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-6xl font-bold text-[#1A1F2C] tracking-tight">Artistic Commissions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing your imagination to life through unique and personalized artwork
          </p>
        </div>
      </div>

      {/* Commission Status Section */}
      <section id="status" className="py-16 px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <CheckSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A1F2C] mb-4">Commission Status</h2>
          </div>
          <Status />
        </div>
      </section>

      {/* Commission Queue Section */}
      <section id="queue" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <ListOrdered className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A1F2C] mb-4">Commission Queue</h2>
          </div>
          <Queue />
        </div>
      </section>

      {/* Commission Prices Section */}
      <section id="prices" className="py-16 px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A1F2C] mb-4">Commission Prices</h2>
          </div>
          <Prices />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-block p-3 bg-primary/10 rounded-full">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A1F2C]">Get in Touch</h2>
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
      </section>
    </div>
  );
};

export default Index;