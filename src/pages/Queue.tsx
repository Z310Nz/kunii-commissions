import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Users, UserPlus, UserMinus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BackButton from "@/components/BackButton";

// Mock API functions - in a real app, these would be actual API calls
const fetchQueue = async () => {
  const storedQueue = localStorage.getItem("commissionQueue");
  return storedQueue
    ? JSON.parse(storedQueue)
    : [
        { id: 1, name: "Client A" },
        { id: 2, name: "Client B" },
        { id: 3, name: "Client C" },
      ];
};

const updateQueue = async (newQueue: any[]) => {
  // Reorganize queue numbers
  const reorganizedQueue = newQueue.map((client, index) => ({
    ...client,
    id: index + 1, // Ensure sequential numbering starting from 1
  }));
  localStorage.setItem("commissionQueue", JSON.stringify(reorganizedQueue));
  return reorganizedQueue;
};

const Queue = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [newClient, setNewClient] = useState("");

  // Query for fetching queue data
  const { data: queue = [] } = useQuery({
    queryKey: ["commissionQueue"],
    queryFn: fetchQueue,
  });

  // Mutation for updating queue
  const { mutate: mutateQueue } = useMutation({
    mutationFn: updateQueue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissionQueue"] });
    },
  });

  const addToQueue = () => {
    if (!newClient.trim()) {
      toast.error("Please enter a client name");
      return;
    }
    const newQueue = [...queue, { id: queue.length + 1, name: newClient }];
    mutateQueue(newQueue);
    setNewClient("");
    toast.success("Added to queue");
  };

  const removeFromQueue = (id: number) => {
    const newQueue = queue.filter((client) => client.id !== id);
    mutateQueue(newQueue); // The updateQueue function will handle reordering
    toast.success("Removed from queue");
  };

  return (
    <div className="h-[50%] bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-[#1A1F2C]">
            Commission Queue
          </h1>
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-primary" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Current commission queue status and position tracking
          </p>
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur border-none shadow-lg">
          {isAuthenticated && (
            <div className="mb-8">
              <div className="flex gap-4 mb-4">
                <Input
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="Enter client name"
                  className="text-lg py-6"
                />
                <Button
                  onClick={addToQueue}
                  className="flex items-center gap-2 px-6"
                >
                  <UserPlus className="w-5 h-5" />
                  Add to Queue
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {queue.map((client) => (
              <div
                key={client.id}
                className="flex justify-between items-center p-6 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold text-primary">
                    #{client.id}
                  </span>
                  <span className="text-lg">{client.name}</span>
                </div>
                {isAuthenticated && (
                  <Button
                    variant="destructive"
                    onClick={() => removeFromQueue(client.id)}
                    className="flex items-center gap-2"
                  >
                    <UserMinus className="w-5 h-5" />
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
