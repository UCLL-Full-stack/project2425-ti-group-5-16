const getAllSetups = async () => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.warn('Unauthorized: No token found in session storage');
      return { error: 'Unauthorized, log in with a valid account to see setups' };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch setups: ${response.statusText}`);
    }

    const data = await response.json();

    const normalizedData = data.map((setup: any) => ({
      setup_id: setup.id,
      owner: {
        name: setup.owner.name,
        id: setup.owner.id,
      },
      hardware_components: setup.hardwareComponents,
      image_urls: setup.images.map((image: any) => ({
        url: image.url,
        details: image.details,
      })),
      details: setup.details,
      last_updated: setup.lastUpdated,
      comments: setup.comments.map((comment: any) => ({
        user_id: comment.userId,
        content: comment.content,
      })),
    }));

    return normalizedData;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching setups:', error.message);
    } else {
      console.error('Error fetching setups:', error);
    }
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
};


// ----------------------------

const getSetupById = async (setup_id: string) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in session storage');
    }

    console.log('Fetching setup:', setup_id);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setup/${setup_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch setup: ${response.statusText}`);
    }

    const data = await response.json();

    // Normalize keys to match frontend expectations
    const normalizedData = {
      setup_id: data.id,
      owner: {
        name: data.owner.name,
        id: data.owner.id,
      },
      hardware_components: data.hardwareComponents,
      image_urls: data.images.map((image: any) => ({
        url: image.url,
        details: image.details,
      })),
      details: data.details,
      last_updated: data.lastUpdated,
      comments: data.comments.map((comment: any) => ({
        user_id: comment.userId,
        content: comment.content,
      })),
    };

    return normalizedData;
  } catch (error) {
    console.error('Error fetching setup:', error);
    throw error;
  }
};

// ----------------------------
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
  