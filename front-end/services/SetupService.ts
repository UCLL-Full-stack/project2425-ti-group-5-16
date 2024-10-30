import exp from "constants";

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

const SetupService = {
    getAllSetups,
};

export default SetupService;
