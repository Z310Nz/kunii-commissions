import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PriceTier, defaultTiers } from '@/types/prices';
import { PriceTierCard } from '@/components/admin/PriceTierCard';

const AdminPrices = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PriceTier | null>(null);

  const { data: tiers = defaultTiers } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      // In a real app, this would fetch from your API
      return defaultTiers;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTier: PriceTier) => {
      // In a real app, this would be an API call
      console.log('Updating tier:', updatedTier);
      return updatedTier;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prices'] });
      toast.success('Price tier updated successfully');
      setEditingId(null);
      setEditForm(null);
    },
    onError: (error) => {
      toast.error('Failed to update price tier');
      console.error('Update error:', error);
    }
  });

  const handleEdit = (tier: PriceTier) => {
    setEditingId(tier.id);
    setEditForm(tier);
  };

  const handleSave = async (tier: PriceTier) => {
    await updateMutation.mutateAsync(tier);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, tierId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload to your storage service
    const reader = new FileReader();
    reader.onloadend = () => {
      if (editForm) {
        setEditForm({
          ...editForm,
          imageUrl: reader.result as string
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!editForm) return;
    const newFeatures = [...editForm.features];
    newFeatures[index] = value;
    setEditForm({ ...editForm, features: newFeatures });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-[#1A1F2C]">Manage Commission Prices</h1>
        <p className="text-gray-600 text-center mb-12">Edit commission tiers and pricing information</p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <PriceTierCard
              key={tier.id}
              tier={tier}
              isEditing={editingId === tier.id}
              editForm={editForm}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={() => {
                setEditingId(null);
                setEditForm(null);
              }}
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
