import { Link } from 'react-router-dom';
import { Mail, Link as LinkIcon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8">Artist Commissions</h1>
        
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact & Links</h2>
          <div className="grid gap-4">
            <a href="mailto:artist@example.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={20} />
              artist@example.com
            </a>
            <a href="https://twitter.com/artist" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <LinkIcon size={20} />
              Twitter
            </a>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/prices">
            <Button variant="outline" className="w-full">View Commission Prices</Button>
          </Link>
          <Link to="/status">
            <Button variant="outline" className="w-full">Commission Status</Button>
          </Link>
          <Link to="/queue">
            <Button variant="outline" className="w-full">Check Queue Position</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full">Admin Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;