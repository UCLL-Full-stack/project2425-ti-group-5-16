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
  
  const CreateSetup = async (setup?: {
    setup_id: number;
    owner: { id: number };
    hardware_components: string[];
    image_urls: string[];
    details: string;
    last_updated: string;
}) => {
    try {
        // Use a mock setup only if no setup is provided
        if (!setup) {
            setup = {
                setup_id: Math.floor(Math.random() * 10000), // Random unique ID for testing
                owner: { id: 1 },
                hardware_components: [
                    "AMD Ryzen 5 3600x",
                    "NVIDIA GeForce RTX 3070",
                    "Intel Core i9-10900k",
                ],
                image_urls: ["www.example2.com", "www.example3.com"],
                details: "High-performance gaming setup with water cooling.",
                last_updated: new Date().toISOString(),
            };
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

  const SetupService = {
    getAllSetups,
    CreateSetup,
  };
  
  export default SetupService;
  