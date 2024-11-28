import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Queue = () => {
  const { isAuthenticated } = useAuth();
  const [queue, setQueue] = useState([
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' },
  ]);
  const [newClient, setNewClient] = useState('');

  const addToQueue = () => {
    if (!newClient.trim()) {
      toast.error('Please enter a client name');
      return;
    }
    setQueue([...queue, { id: queue.length + 1, name: newClient }]);
    setNewClient('');
    toast.success('Added to queue');
  };

  const removeFromQueue = (id: number) => {
    setQueue(queue.filter(client => client.id !== id));
    toast.success('Removed from queue');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8">Commission Queue</h1>
        
        <Card className="p-8">
          {isAuthenticated && (
            <div className="mb-8">
              <div className="flex gap-4 mb-4">
                <Input
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="Enter client name"
                />
                <Button onClick={addToQueue}>Add to Queue</Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {queue.map((client) => (
              <div key={client.id} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <div>
                  <span className="font-semibold">#{client.id}</span> - {client.name}
                </div>
                {isAuthenticated && (
                  <Button variant="destructive" onClick={() => removeFromQueue(client.id)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Queue;