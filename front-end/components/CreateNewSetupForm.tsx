import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import SetupService from '@services/SetupService';
import { SetupInput} from '@types';

const CreateNewSetupForm: React.FC = () => {
  const [setupId, setSetupId] = useState<number | undefined>();
  const [ownerId, setOwnerId] = useState<number | undefined>();
  const [hardwareComponents, setHardwareComponents] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [details, setDetails] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (setupId !== undefined && ownerId !== undefined) {
      // Format data to match backend structure
      const formattedSetup: SetupInput = {
        setupId: setupId,
        ownerId: ownerId,
        hardwareComponents: hardwareComponents,
        imageUrls: imageUrls,
        details: details,
        lastUpdated: new Date()  // Automatically set to current date in ISO format
      };

      try {
        // Pass formatted data to SetupService
        const setup = await SetupService.CreateSetup(formattedSetup);
        console.log('Created setup:', setup);
      } catch (error) {
        console.error('Failed to create setup:', error);
      }
    } else {
      console.error('Setup ID and Owner ID are required.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-600 font-medium mb-1">Setup ID:</label>
        <input
          type="number"
          value={setupId || ''}
          onChange={(e) => setSetupId(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">Owner ID:</label>
        <input
          type="number"
          value={ownerId || ''}
          onChange={(e) => setOwnerId(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">Hardware Components (comma-separated):</label>
        <input
          type="text"
          value={hardwareComponents.join(', ')}
          onChange={(e) =>
            setHardwareComponents(e.target.value.split(',').map((s) => s.trim()))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">Image URLs (comma-separated):</label>
        <input
          type="text"
          value={imageUrls.join(', ')}
          onChange={(e) =>
            setImageUrls(e.target.value.split(',').map((s) => s.trim()))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600 font-medium mb-1">Details:</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateNewSetupForm;


