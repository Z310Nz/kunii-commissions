import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Image, Clock } from 'lucide-react';  // Added Clock import
import { PriceTier } from '@/types/prices';

interface PriceTierCardProps {
  tier: PriceTier;
  isEditing: boolean;
  editForm: PriceTier | null;
  onEdit: (tier: PriceTier) => void;
  onSave: (tier: PriceTier) => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, tierId: string) => void;
  onFeatureChange: (index: number, value: string) => void;
  setEditForm: (form: PriceTier | null) => void;
}

export const PriceTierCard = ({
  tier,
  isEditing,
  editForm,
  onEdit,
  onSave,
  onCancel,
  onImageUpload,
  onFeatureChange,
  setEditForm
}: PriceTierCardProps) => {
  if (isEditing && editForm) {
    return (
      <Card className="p-8 bg-white/80 backdrop-blur border-none shadow-lg">
        <div className="space-y-4">
          {editForm.imageUrl && (
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
              onChange={(e) => onImageUpload(e, tier.id)}
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
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Tier Name"
          />
          
          <Input
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            placeholder="Price"
          />
          
          <Textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            placeholder="Description"
          />
          
          {editForm.features.map((feature, index) => (
            <Input
              key={index}
              value={feature}
              onChange={(e) => onFeatureChange(index, e.target.value)}
              placeholder={`Feature ${index + 1}`}
            />
          ))}
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => onSave(editForm)}
            >
              Save
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-white/80 backdrop-blur border-none shadow-lg">
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
        onClick={() => onEdit(tier)}
      >
        Edit
      </Button>
    </Card>
  );
};