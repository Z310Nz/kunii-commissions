
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

export const updateCommissionStatus = async (
  isOpen: boolean
): Promise<boolean> => {
  try {
    // Ensure we're passing a strict boolean value
    const boolValue = isOpen === true;
    
    console.log("Updating commission status to:", boolValue);

    // Check if status record exists
    const { data: existingStatus, error: fetchError } = await supabase
      .from("commission_status")
      .select("id")
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 = No rows found
      console.error("Error fetching status record:", fetchError);
      throw fetchError;
    }

    let updatedStatus;
    if (existingStatus) {
      // Update existing record
      const { data, error: updateError } = await supabase
        .from("commission_status")
        .update({
          is_open: boolValue,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingStatus.id)
        .select("is_open")
        .single();

      if (updateError) {
        console.error("Error updating commission status:", updateError);
        throw updateError;
      }

      updatedStatus = data?.is_open;
      console.log("Updated status record with value:", updatedStatus);
    } else {
      // Create new record if none exists
      const { data, error: insertError } = await supabase
        .from("commission_status")
        .insert([{ is_open: boolValue, updated_at: new Date().toISOString() }])
        .select("is_open")
        .single();

      if (insertError) {
        console.error("Error inserting new commission status:", insertError);
        throw insertError;
      }

      updatedStatus = data?.is_open;
      console.log("Created new status record with value:", updatedStatus);
    }

    // Return the actual updated value from the database
    return Boolean(updatedStatus);
  } catch (error) {
    console.error("Error in updateCommissionStatus:", error);
    throw error;
  }
};
