import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

const Status = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#1A1F2C]">Commission Status</h1>
        
        <Card className="p-12 text-center bg-white/80 backdrop-blur border-none shadow-lg">
          <div className="flex flex-col items-center gap-6">
            {isOpen ? (
              <CheckCircle2 className="w-24 h-24 text-green-500" />
            ) : (
              <XCircle className="w-24 h-24 text-red-500" />
            )}
            
            <div className={`text-3xl font-semibold ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
              Commissions are currently {isOpen ? 'OPEN' : 'CLOSED'}
            </div>
            
            {isAuthenticated && (
              <Button 
                onClick={() => setIsOpen(!isOpen)}
                variant={isOpen ? "destructive" : "default"}
                className="mt-6 text-lg px-8 py-6"
              >
                {isOpen ? 'Close Commissions' : 'Open Commissions'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Status;