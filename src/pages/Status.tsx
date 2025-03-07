
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, XCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { Switch } from "@/components/ui/switch";
import { getCommissionStatus, updateCommissionStatus } from "@/utils/commissionStatusStorage";

const Status = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: isOpen = true, isLoading, isError } = useQuery({
    queryKey: ["commissionStatus"],
    queryFn: getCommissionStatus,
    retry: 2,
  });

  const { mutate: toggleStatus, isPending } = useMutation({
    mutationFn: updateCommissionStatus,
    onSuccess: (_, newStatus) => {
      queryClient.invalidateQueries({ queryKey: ["commissionStatus"] });
      toast.success(`Commissions are now ${newStatus ? "OPEN" : "CLOSED"}`);
    },
    onError: (error) => {
      toast.error("Failed to update commission status");
      console.error("Error updating status:", error);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading commission status. Please try again later.
      </div>
    );
  }

  const handleStatusToggle = () => {
    if (!isPending) {
      const newStatus = !isOpen;
      console.log("Toggling status to:", newStatus);
      toggleStatus(newStatus);
    }
  };

  return (
    <div className="h-[50%] bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#1A1F2C]">
          Commission Status
        </h1>

        <Card className="p-12 text-center bg-white/80 backdrop-blur border-none shadow-lg">
          <div className="flex flex-col items-center gap-6">
            {isOpen ? (
              <CheckCircle2 className="w-24 h-24 text-green-500" />
            ) : (
              <XCircle className="w-24 h-24 text-red-500" />
            )}

            <div
              className={`text-3xl font-semibold ${
                isOpen ? "text-green-500" : "text-red-500"
              }`}
            >
              Commissions are currently {isOpen ? "OPEN" : "CLOSED"}
            </div>

            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Closed</span>
                <Switch
                  checked={isOpen}
                  onCheckedChange={handleStatusToggle}
                  disabled={isPending}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className="text-sm text-gray-500">Open</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Status;
