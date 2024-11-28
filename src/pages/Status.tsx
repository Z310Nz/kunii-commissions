import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Status = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8">Commission Status</h1>
        
        <Card className="p-8 text-center">
          <div className={`text-2xl font-semibold mb-4 ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
            Commissions are currently {isOpen ? 'OPEN' : 'CLOSED'}
          </div>
          
          {isAuthenticated && (
            <Button 
              onClick={() => setIsOpen(!isOpen)}
              variant={isOpen ? "destructive" : "default"}
            >
              {isOpen ? 'Close Commissions' : 'Open Commissions'}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Status;