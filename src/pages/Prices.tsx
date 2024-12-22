import { Card } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PriceTier, defaultTiers } from '@/types/prices';
import { Button } from '@/components/ui/button';
import { Image, Maximize2, Clock, FileText, Plus, X } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { useState } from 'react';

const Prices = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PriceTier | null>(null);

  const { data: tiers = defaultTiers } = useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      return defaultTiers;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTier: PriceTier) => {
      // In a real app, this would be an API call
      const updatedTiers = tiers.map(tier => 
        tier.id === updatedTier.id ? updatedTier : tier
      );
      return updatedTiers;
    },
    onSuccess: (updatedTiers) => {
      queryClient.setQueryData(['prices'], updatedTiers);
      toast.success("Price tier updated successfully");
      setEditingId(null);
      setEditForm(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (tierId: string) => {
      // In a real app, this would be an API call
      const updatedTiers = tiers.filter(tier => tier.id !== tierId);
      return updatedTiers;
    },
    onSuccess: (updatedTiers) => {
      queryClient.setQueryData(['prices'], updatedTiers);
      toast.success("Price tier deleted successfully");
    }
  });

  const addMutation = useMutation({
    mutationFn: async (newTier: PriceTier) => {
      // In a real app, this would be an API call
      return [...tiers, newTier];
    },
    onSuccess: (updatedTiers) => {
      queryClient.setQueryData(['prices'], updatedTiers);
      toast.success("New price tier added successfully");
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
      name: 'New Tier',
      price: '$0',
      description: 'New tier description',
      features: ['Feature 1'],
      imageSize: '2000x2000px',
      workDuration: '3-5 days',
      jobDetails: 'Job details here'
    };
    addMutation.mutate(newTier);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, tierId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload to a storage service
    const imageUrl = URL.createObjectURL(file);
    const tierToUpdate = tiers.find(t => t.id === tierId);
    
    if (tierToUpdate) {
      // If there's an existing image, we would delete it from storage here
      const updatedTier = {
        ...tierToUpdate,
        imageUrl
      };
      updateMutation.mutate(updatedTier);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!editForm) return;
    const updatedFeatures = [...editForm.features];
    updatedFeatures[index] = value;
    setEditForm({
      ...editForm,
      features: updatedFeatures
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-4 md:p-8">
      <BackButton />
      <div className="max-w-6xl mx-auto animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#1A1F2C]">
          Commission Prices
        </h1>
        <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          Choose the perfect tier for your artistic vision
        </p>

        {isAuthenticated && (
          <Button 
            onClick={handleAdd}
            className="mb-6 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Tier
          </Button>
        )}
        
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.id} className="p-6 md:p-8 bg-white/80 backdrop-blur border-none shadow-lg">
              {editingId === tier.id ? (
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, tier.id)}
                    className="mb-4"
                  />
                  {editForm?.imageUrl && (
                    <div className="relative mb-4">
                      <img 
                        src={editForm.imageUrl} 
                        alt={editForm.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setEditForm({ ...editForm, imageUrl: undefined })}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <Input
                    value={editForm?.name}
                    onChange={(e) => setEditForm({ ...editForm!, name: e.target.value })}
                    placeholder="Tier Name"
                  />
                  <Input
                    value={editForm?.price}
                    onChange={(e) => setEditForm({ ...editForm!, price: e.target.value })}
                    placeholder="Price"
                  />
                  <Input
                    value={editForm?.imageSize}
                    onChange={(e) => setEditForm({ ...editForm!, imageSize: e.target.value })}
                    placeholder="Image Size"
                  />
                  <Textarea
                    value={editForm?.description}
                    onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                    placeholder="Description"
                  />
                  {editForm?.features.map((feature, index) => (
                    <Input
                      key={index}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                  ))}
                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(editForm!)}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  {tier.imageUrl && (
                    <div className="mb-6 overflow-hidden rounded-lg">
                      <img 
                        src={tier.imageUrl} 
                        alt={tier.name}
                        className="w-full h-40 md:h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="text-primary mb-4">
                    <Image className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 text-[#1A1F2C]">{tier.name}</h2>
                  <p className="text-2xl md:text-3xl font-bold text-primary mb-4">{tier.price}</p>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Maximize2 className="w-4 h-4" />
                    <span className="text-sm md:text-base">{tier.imageSize}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm md:text-base">{tier.workDuration}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{tier.description}</p>
                  
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-6">
                    <div className="flex items-start gap-2 text-gray-700">
                      <FileText className="w-4 h-4 mt-1" />
                      <p className="text-sm md:text-base">{tier.jobDetails}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6 md:mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {isAuthenticated && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEdit(tier)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDelete(tier.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;