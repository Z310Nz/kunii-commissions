import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Mock API function - in a real app, this would be an actual API call
const fetchCommissionStatus = async () => {
  // For demo purposes, we'll use localStorage
  return localStorage.getItem('commissionStatus') === 'true';
};

const updateCommissionStatus = async (isOpen: boolean) => {
  // For demo purposes, we'll use localStorage
  localStorage.setItem('commissionStatus', String(isOpen));
  return isOpen;
};

const Status = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Query for fetching commission status
  const { data: isOpen = true } = useQuery({
    queryKey: ['commissionStatus'],
    queryFn: fetchCommissionStatus,
  });

  // Mutation for updating commission status
  const { mutate: toggleStatus } = useMutation({
    mutationFn: updateCommissionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissionStatus'] });
      toast.success(`Commissions are now ${isOpen ? 'CLOSED' : 'OPEN'}`);
    },
  });

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
                onClick={() => toggleStatus(!isOpen)}
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