import { supabase } from '@/integrations/supabase/client';

interface QueueItem {
  id: string;
  name: string;
  position: number;
}

export const getCommissionQueue = async (): Promise<QueueItem[]> => {
  const { data, error } = await supabase
    .from('commission_queue')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching commission queue:', error);
    throw error;
  }

  return data;
};

export const addToQueue = async (name: string): Promise<void> => {
  const { data: lastItem } = await supabase
    .from('commission_queue')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .single();

  const newPosition = (lastItem?.position || 0) + 1;

  const { error } = await supabase
    .from('commission_queue')
    .insert({ name, position: newPosition });

  if (error) {
    console.error('Error adding to queue:', error);
    throw error;
  }
};

export const removeFromQueue = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('commission_queue')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error removing from queue:', error);
    throw error;
  }

  // Reorder remaining items
  const { data: remainingItems } = await supabase
    .from('commission_queue')
    .select('*')
    .order('position', { ascending: true });

  if (remainingItems) {
    for (let i = 0; i < remainingItems.length; i++) {
      await supabase
        .from('commission_queue')
        .update({ position: i + 1 })
        .eq('id', remainingItems[i].id);
    }
  }
};