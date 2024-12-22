import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PriceTier, defaultTiers } from '@/types/prices';
import { PriceTierCard } from '@/components/admin/PriceTierCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPrices = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PriceTier | null>(null);

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

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

  const handleAddTier = () => {
    const newTier: PriceTier = {
      id: `${Date.now()}`,
      name: 'New Tier',
      price: '$0',
      description: 'New tier description',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      imageSize: '2000x2000px',
      workDuration: '3-5 days',
      jobDetails: 'New tier details'
    };
    
    // In a real app, this would be an API call
    const updatedTiers = [...tiers, newTier];
    queryClient.setQueryData(['prices'], updatedTiers);
    toast.success('New tier added successfully');
  };

  const handleDelete = (tierId: string) => {
    // In a real app, this would be an API call
    const updatedTiers = tiers.filter(tier => tier.id !== tierId);
    queryClient.setQueryData(['prices'], updatedTiers);
    toast.success('Tier deleted successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-4 md:p-8">
      <BackButton />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A1F2C]">Manage Commission Prices</h1>
          <Button onClick={handleAddTier} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Tier
          </Button>
        </div>
        
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.id} className="relative">
              <PriceTierCard
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
              {!editingId && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2"
                  onClick={() => handleDelete(tier.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPrices;