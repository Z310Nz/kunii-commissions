import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Clock, Users, Image, Upload, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface PriceTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  imageUrl?: string;
}

const AdminPrices = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PriceTier | null>(null);

  const { data: tiers = [] } = useQuery({
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
            <Card key={tier.id} className="p-8 bg-white/80 backdrop-blur border-none shadow-lg">
              {editingId === tier.id ? (
                // Edit Mode
                <div className="space-y-4">
                  {editForm?.imageUrl && (
                    <div className="relative mb-4">
                      <img 
                        src={editForm.imageUrl} 
                        alt={editForm.name}
                        className="w-full h-48 object-cover rounded-lg"
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
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, tier.id)}
                      className="hidden"
                      id={`image-upload-${tier.id}`}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById(`image-upload-${tier.id}`)?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>

                  <Input
                    value={editForm?.name}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                    placeholder="Tier Name"
                  />
                  
                  <Input
                    value={editForm?.price}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, price: e.target.value } : null)}
                    placeholder="Price"
                  />
                  
                  <Textarea
                    value={editForm?.description}
                    onChange={(e) => setEditForm(prev => prev ? { ...prev, description: e.target.value } : null)}
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
                    <Button 
                      className="flex-1"
                      onClick={() => editForm && handleSave(editForm)}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setEditingId(null);
                        setEditForm(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  {tier.imageUrl && (
                    <div className="mb-6 overflow-hidden rounded-lg">
                      <img 
                        src={tier.imageUrl} 
                        alt={tier.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="text-primary mb-4">
                    <Image className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-[#1A1F2C]">{tier.name}</h2>
                  <p className="text-3xl font-bold text-primary mb-4">{tier.price}</p>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleEdit(tier)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPrices;