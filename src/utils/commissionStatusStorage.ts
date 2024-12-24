import { supabase } from '@/integrations/supabase/client';

export const getCommissionStatus = async (): Promise<boolean> => {
  const { data, error } = await supabase
    .from('commission_status')
    .select('is_open')
    .single();

  if (error) {
    console.error('Error fetching commission status:', error);
    throw error;
  }

  return data.is_open;
};

export const updateCommissionStatus = async (isOpen: boolean): Promise<void> => {
  const { error } = await supabase
    .from('commission_status')
    .update({ is_open: isOpen, updated_at: new Date().toISOString() })
    .eq('id', (await supabase.from('commission_status').select('id').single()).data?.id);

  if (error) {
    console.error('Error updating commission status:', error);
    throw error;
  }
};