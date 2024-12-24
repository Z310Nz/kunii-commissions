import { supabase } from "@/integrations/supabase/client";

export const getCommissionStatus = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("commission_status")
      .select("is_open")
      .maybeSingle();

    if (error) {
      console.error("Error fetching commission status:", error);
      throw error;
    }

    return data?.is_open ?? true;
  } catch (error) {
    console.error("Error in getCommissionStatus:", error);
    throw error;
  }
};

export const updateCommissionStatus = async (isOpen: boolean): Promise<void> => {
  try {
    // First, get the status record
    const { data: statusRecord, error: fetchError } = await supabase
      .from("commission_status")
      .select("id")
      .single();

    if (fetchError) {
      console.error("Error fetching status record:", fetchError);
      throw fetchError;
    }

    // Then update it
    const { error: updateError } = await supabase
      .from("commission_status")
      .update({ 
        is_open: isOpen, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", statusRecord.id);

    if (updateError) {
      console.error("Error updating commission status:", updateError);
      throw updateError;
    }
  } catch (error) {
    console.error("Error in updateCommissionStatus:", error);
    throw error;
  }
};