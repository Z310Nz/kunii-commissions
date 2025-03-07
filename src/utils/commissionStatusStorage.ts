
import { supabase } from "@/integrations/supabase/client";

export const getCommissionStatus = async (): Promise<boolean> => {
  try {
    console.log("Fetching commission status");
    const { data, error } = await supabase
      .from("commission_status")
      .select("is_open")
      .single();

    if (error) {
      console.error("Error fetching commission status:", error);
      throw error;
    }

    console.log("Commission status fetched:", data?.is_open);
    return Boolean(data?.is_open); // Ensure boolean type
  } catch (error) {
    console.error("Error in getCommissionStatus:", error);
    throw error;
  }
};

export const updateCommissionStatus = async (isOpen: boolean): Promise<boolean> => {
  try {
    console.log("Updating commission status to:", isOpen);
    
    const { data: existingStatus, error: fetchError } = await supabase
      .from("commission_status")
      .select("id")
      .single();

    if (fetchError) {
      console.error("Error fetching status record:", fetchError);
      throw fetchError;
    }

    console.log("Found status record with ID:", existingStatus.id);

    // Ensure we're working with a boolean and not string/number
    const boolValue = isOpen === true;
    console.log("Converted value for update:", boolValue);

    const { data, error: updateError } = await supabase
      .from("commission_status")
      .update({ 
        is_open: boolValue,
        updated_at: new Date().toISOString()
      })
      .eq("id", existingStatus.id)
      .select('is_open')
      .single();

    if (updateError) {
      console.error("Error updating commission status:", updateError);
      throw updateError;
    }

    console.log("Successfully updated commission status to:", Boolean(data?.is_open));
    return Boolean(data?.is_open); // Return the actual updated value from Supabase
  } catch (error) {
    console.error("Error in updateCommissionStatus:", error);
    throw error;
  }
};
