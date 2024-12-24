import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Users, UserPlus, UserMinus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BackButton from "@/components/BackButton";
import { getCommissionQueue, addToQueue, removeFromQueue } from "@/utils/commissionQueueStorage";

const Queue = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [newClient, setNewClient] = useState("");

  const { data: queue = [], isLoading } = useQuery({
    queryKey: ["commissionQueue"],
    queryFn: getCommissionQueue,
  });

  const addMutation = useMutation({
    mutationFn: addToQueue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissionQueue"] });
      setNewClient("");
      toast.success("Added to queue");
    },
    onError: (error) => {
      toast.error("Failed to add to queue");
      console.error("Add error:", error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromQueue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissionQueue"] });
      toast.success("Removed from queue");
    },
    onError: (error) => {
      toast.error("Failed to remove from queue");
      console.error("Remove error:", error);
    },
  });

  const handleAdd = () => {
    if (!newClient.trim()) {
      toast.error("Please enter a client name");
      return;
    }
    addMutation.mutate(newClient);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                  onClick={handleAdd}
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
                    #{client.position}
                  </span>
                  <span className="text-lg">{client.name}</span>
                </div>
                {isAuthenticated && (
                  <Button
                    variant="destructive"
                    onClick={() => removeMutation.mutate(client.id)}
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