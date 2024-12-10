import React, { useState } from 'react';
import SetupService from '@services/SetupService';

const CreateNewSetupForm: React.FC = () => {
  const [setupId, setSetupId] = useState<number | undefined>();
  const [ownerId, setOwnerId] = useState<number | undefined>();
  const [hardwareComponents, setHardwareComponents] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [details, setDetails] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (setupId !== undefined && ownerId !== undefined) {
      const formattedSetup = {
        setup_id: setupId,
        owner: { id: ownerId },
        hardware_components: hardwareComponents,
        image_urls: imageUrls,
        details,
        last_updated: new Date().toISOString(),
      };

      try {
        await SetupService.CreateSetup(formattedSetup);
        setSuccessMessage('Setup successfully added!');
      } catch (error) {
        console.error('Failed to create setup:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Internal Server Error');
      }
    } else {
      setErrorMessage('Setup ID and Owner ID are required.');
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full">
      {/* Left column fields */}
      <div className="col-span-1 grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Setup ID</label>
          <input
            type="number"
            value={setupId || ''}
            onChange={(e) => setSetupId(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Setup ID"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Owner ID</label>
          <input
            type="number"
            value={ownerId || ''}
            onChange={(e) => setOwnerId(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Owner ID"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-1">Hardware Components</label>
          <input
            type="text"
            value={hardwareComponents.join(', ')}
            onChange={(e) =>
              setHardwareComponents(e.target.value.split(',').map((s) => s.trim()))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., NVIDIA GeForce RTX 3070, Intel Core i9"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-1">Image URLs</label>
          <input
            type="text"
            value={imageUrls.join(', ')}
            onChange={(e) =>
              setImageUrls(e.target.value.split(',').map((s) => s.trim()))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., www.example1.com, www.example2.com"
          />
        </div>
      </div>

      {/* Right column for Details and Submit Button */}
      <div className="col-span-1 flex flex-col justify-between">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add detailed description about the setup..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="self-end bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Submit
        </button>
      </div>

      {/* Error and Success Messages */}
      <div className="col-span-2">
        {errorMessage && (
          <div className="text-red-500 font-medium">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 font-medium">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default CreateNewSetupForm;




