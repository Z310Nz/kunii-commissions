import { Link } from 'react-router-dom';
import { DollarSign, CheckSquare, ListOrdered, Mail, ArrowUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Status from './Status';
import Queue from './Queue';
import Prices from './Prices';
import { useEffect, useState } from 'react';

const Index = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('status')}
              className="flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              Status
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('queue')}
              className="flex items-center gap-2"
            >
              <ListOrdered className="w-4 h-4" />
              Queue
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('prices')}
              className="flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Prices
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content with top padding for fixed navbar */}
      <div className="pt-20">
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
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <CheckSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A1F2C] mb-4">Commission Status</h2>
          </div>
          <Status />
        </section>

        {/* Commission Queue Section */}
        <section id="queue" className="py-16 px-8">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <ListOrdered className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A1F2C] mb-4">Commission Queue</h2>
          </div>
          <Queue />
        </section>

        {/* Commission Prices Section */}
        <section id="prices" className="py-16 px-8 bg-white/50">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-[#1A1F2C] mb-4">Commission Prices</h2>
          </div>
          <Prices />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-8">
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
        </section>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all animate-fade-in z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Index;
