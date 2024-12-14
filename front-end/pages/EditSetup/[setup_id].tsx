import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Setup } from '@types';
import SetupService from '@services/SetupService';

// Define the Props type
type Props = {
  setup: Setup | null;
};

const SetupModifierPage: React.FC<Props> = ({ setup }) => {
  const router = useRouter();
  const { setup_id } = router.query;

  // State for editing setup details
  const [hardwareComponents, setHardwareComponents] = useState(setup?.hardware_components || []);
  const [details, setDetails] = useState(setup?.details || '');
  const [imageUrls, setImageUrls] = useState(setup?.image_urls || []);
  const [error, setError] = useState<string | null>(null);

  const handleComponentChange = (index: number, value: string) => {
    const updatedComponents = [...hardwareComponents];
    updatedComponents[index] = { ...updatedComponents[index], name: value };
    setHardwareComponents(updatedComponents);
  };

  const handleImageChange = (index: number, key: string, value: string) => {
    const updatedImages = [...imageUrls];
    updatedImages[index] = { ...updatedImages[index], [key]: value };
    setImageUrls(updatedImages);
  };

  const handleSave = async () => {
    try {
      if (!setup) throw new Error('No setup to update');

      // Validate the components before saving
      const validComponents = hardwareComponents.filter((component) => 
        setup.hardware_components.some((existing) => existing.name === component.name)
      );

      const updatedSetup = {
        ...setup,
        hardware_components: validComponents,
        details,
        image_urls: imageUrls,
      };

      await SetupService.updateSetup(setup_id as string, updatedSetup);
      alert('Setup updated successfully!');
      router.push('/overview');
    } catch (error) {
      console.error('Error updating setup:', error);
      setError('Failed to save changes. Please try again.');
    }
  };

  if (!setup) {
    return <div>Setup with ID {setup_id} not found!</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Modify Setup ID: {setup_id}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Hardware Components</h3>
      {hardwareComponents.map((component, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={component.name}
            onChange={(e) => handleComponentChange(index, e.target.value)}
            placeholder="Component Name"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </div>
      ))}

      <h3>Image URLs</h3>
      {imageUrls.map((image, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={image.url}
            onChange={(e) => handleImageChange(index, 'url', e.target.value)}
            placeholder="Image URL"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <input
            type="text"
            value={image.details}
            onChange={(e) => handleImageChange(index, 'details', e.target.value)}
            placeholder="Image Details"
            style={{ width: '100%' }}
          />
        </div>
      ))}

      <h3>Setup Details</h3>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Setup Details"
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
      />

      <button onClick={handleSave} style={{ width: '100%', padding: '1rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Save Changes
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { setup_id } = context.params!;

  try {
    const setup = await SetupService.getSetupById(setup_id as string);
    return {
      props: {
        setup,
      },
    };
  } catch (error) {
    console.error('Error fetching setup:', error);
    return {
      props: {
        setup: null,
      },
    };
  }
};

export default SetupModifierPage;







