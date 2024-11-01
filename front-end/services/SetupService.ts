import exp from "constants";
import { SetupInput } from "@types";

const getAllSetups = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch setups: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching lecturers:', error);
      throw error;
    }
};

const CreateSetup = async (setup: SetupInput) => {
    try {
        console.log(setup);  // Log the setup object for debugging

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(setup),
        });

        if (!response.ok) throw new Error(`Failed to add setup: ${response.statusText}`);
        return response.json();
    } catch (error) {
        console.error('Error adding setup:', error);
        throw error;
    }
};

const SetupService = {
    getAllSetups,
    CreateSetup,
};

export default SetupService;
