import { supabase } from '@/integrations/supabase/client';
import { PriceTier } from '@/types/prices';

export const getPriceTiers = async (): Promise<PriceTier[]> => {
  const { data, error } = await supabase
    .from('price_tiers')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching price tiers:', error);
    throw error;
  }

  return data.map(tier => ({
    ...tier,
    features: tier.features || []
  }));
};

export const savePriceTiers = async (tier: PriceTier): Promise<void> => {
  const { error } = await supabase
    .from('price_tiers')
    .upsert({
      id: tier.id,
      name: tier.name,
      price: tier.price,
      description: tier.description,
      features: tier.features,
      image_url: tier.imageUrl,
      image_size: tier.imageSize,
      work_duration: tier.workDuration,
      job_details: tier.jobDetails,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error saving price tier:', error);
    throw error;
  }
};

export const deletePriceTier = async (tierId: string): Promise<void> => {
  const { error } = await supabase
    .from('price_tiers')
    .delete()
    .eq('id', tierId);

  if (error) {
    console.error('Error deleting price tier:', error);
    throw error;
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('price-tier-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('price-tier-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};