const getAllSetups = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch setups: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching setups:', error);
      throw error;
    }
  };

const getSetupById = async (setup_id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup/${setup_id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch setup: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching setup:', error);
      throw error;
    }
  };

  interface Owner {
    id: number;
  }

  interface Setup {
    owner: Owner;
    hardware_components: any[];
    image_urls: string[];
    details: string;
    last_updated: string;
  }

  const CreateSetup = async (setup: Setup) => {
    try {
      if (!setup) {
        throw new Error("No setup data provided");
      }

      if (
        typeof setup.owner?.id !== 'number' ||
        !Array.isArray(setup.hardware_components) ||
        !Array.isArray(setup.image_urls) ||
        typeof setup.details !== 'string'
      ) {
        throw new Error("Invalid setup format");
      }
  
      console.log("Sending setup to backend:", setup);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setup),
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error response from backend:', errorDetails);
        throw new Error(`Failed to add setup: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Setup successfully added:", data);
      return data;
    } catch (error) {
      console.error('Error adding setup:', error);
      throw error;
    }
  };

  const updateSetup = async (setup_id: string, updatedSetup: Setup) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup/${setup_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSetup),
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error response from backend:', errorDetails);
        throw new Error(`Failed to update setup: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Setup successfully updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating setup:', error);
      throw error;
    }
  };
  
  const SetupService = {
    getAllSetups,
    CreateSetup,
    getSetupById,
    updateSetup,
  };
  
  export default SetupService;
  