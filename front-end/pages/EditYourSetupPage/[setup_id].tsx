import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Setup } from '@types';
import Header from '@components/header';
import SetupService from '@services/SetupService';

type Props = {
  setup: Setup | null;
};

const SetupModifierPage: React.FC<Props> = ({ setup }) => {
  const router = useRouter();
  const { setup_id } = router.query;

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

      const validComponents = hardwareComponents.filter((component) => 
        setup.hardware_components.some((existing) => existing.name === component.name)
      );

      const updatedSetup = {
        ...setup,
        hardware_components: validComponents,
        details,
        image_urls: imageUrls,
      };

      // await SetupService.updateSetup(setup_id as string, updatedSetup);
      alert('Setup updated successfully!');
      router.push('/overview');
    } catch (error) {
      console.error('Error updating setup:', error);
      setError('Failed to save changes. Please try again.');
    }
  };

  if (!setup) {
    return (
      <div className="text-center text-red-600 text-lg mt-4">
        Setup with ID {setup_id} not found!
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Modify Setup ID: {setup_id}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Hardware Components</h3>
        {hardwareComponents.map((component, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={component.name}
              onChange={(e) => handleComponentChange(index, e.target.value)}
              placeholder="Component Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Image URLs</h3>
        {imageUrls.map((image, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={image.url}
              onChange={(e) => handleImageChange(index, 'url', e.target.value)}
              placeholder="Image URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 mb-2"
            />
            <input
              type="text"
              value={image.details}
              onChange={(e) => handleImageChange(index, 'details', e.target.value)}
              placeholder="Image Details"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Setup Details</h3>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Setup Details"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 h-28"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
    </>
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








