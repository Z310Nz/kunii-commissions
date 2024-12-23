import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PriceTier } from "@/types/prices";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useState } from "react";
import { PriceTierCard } from "@/components/admin/PriceTierCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getPriceTiers, savePriceTiers, deletePriceTier, uploadImage } from "@/utils/priceTierStorage";
import BackButton from "@/components/BackButton";

const AdminPrices = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PriceTier | null>(null);

  const { data: tiers = [] } = useQuery({
    queryKey: ["prices"],
    queryFn: getPriceTiers
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTier: PriceTier) => {
      await savePriceTiers(updatedTier);
      return updatedTier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast.success("Price tier updated successfully");
      setEditingId(null);
      setEditForm(null);
    },
    onError: (error) => {
      toast.error("Failed to update price tier");
      console.error("Update error:", error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePriceTier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast.success("Price tier deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete price tier");
      console.error("Delete error:", error);
    }
  });

  const addMutation = useMutation({
    mutationFn: async (newTier: PriceTier) => {
      await savePriceTiers(newTier);
      return newTier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast.success("New price tier added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add price tier");
      console.error("Add error:", error);
    }
  });

  const handleEdit = (tier: PriceTier) => {
    setEditingId(tier.id);
    setEditForm(tier);
  };

  const handleSave = (tier: PriceTier) => {
    updateMutation.mutate(tier);
  };

  const handleDelete = (tierId: string) => {
    deleteMutation.mutate(tierId);
  };

  const handleAdd = () => {
    const newTier: PriceTier = {
      id: `tier-${Date.now()}`,
      name: "New Tier",
      price: "$0",
      description: "New tier description",
      features: ["Feature 1"],
      imageSize: "2000x2000px",
      workDuration: "3-5 days",
      jobDetails: "Job details here",
    };
    addMutation.mutate(newTier);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    tierId: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      const tierToUpdate = tiers.find((t) => t.id === tierId);

      if (tierToUpdate) {
        const updatedTier = {
          ...tierToUpdate,
          imageUrl,
        };
        updateMutation.mutate(updatedTier);
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Image upload error:", error);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!editForm) return;
    const updatedFeatures = [...editForm.features];
    updatedFeatures[index] = value;
    setEditForm({
      ...editForm,
      features: updatedFeatures,
    });
  };

  if (!isAuthenticated) {
    return <div>Access denied. Please log in as an admin.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-4 md:p-8">
      <BackButton />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Commission Prices</h1>
          <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add New Tier
          </Button>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <PriceTierCard
              key={tier.id}
              tier={tier}
              isEditing={editingId === tier.id}
              editForm={editForm}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={() => setEditingId(null)}
              onDelete={handleDelete}
              onImageUpload={handleImageUpload}
              onFeatureChange={handleFeatureChange}
              setEditForm={setEditForm}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPrices;