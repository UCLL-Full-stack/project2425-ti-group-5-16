import React, { useState } from 'react';
import SetupService from '@services/SetupService';

const CreateNewSetupForm: React.FC = () => {
  const [hardwareComponents, setHardwareComponents] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [details, setDetails] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateInputs = () => {
    if (!hardwareComponents.length) return 'Hardware components cannot be empty.';
    if (!imageUrls.every((url) => url.startsWith('www'))) return 'All image URLs must be valid.';
    if (!details.trim()) return 'Details cannot be empty.';
    return null;
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Replace with actual user context or auth service.
    const ownerId = 1; // logged in user id

    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const formattedSetup = {
      owner: { id: ownerId },
      hardware_components: [...new Set(hardwareComponents)], // Ensure unique components
      image_urls: [...new Set(imageUrls)], // Ensure unique URLs
      details,
      last_updated: new Date().toISOString(),
    };

    try {
      await SetupService.CreateSetup(formattedSetup);
      setSuccessMessage('Setup successfully added!');
      setHardwareComponents([]);
      setImageUrls([]);
      setDetails('');
    } catch (error) {
      console.error('Failed to create setup:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again later.'
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="flex flex-col space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Hardware Components</label>
          <input
            type="text"
            value={hardwareComponents.join(', ')}
            onChange={(e) =>
              setHardwareComponents(
                e.target.value.split(',').map((s) => s.trim()).filter((s) => s)
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., NVIDIA GeForce RTX 3070, Intel Core i9"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Image URLs</label>
          <input
            type="text"
            value={imageUrls.join(', ')}
            onChange={(e) =>
              setImageUrls(
                e.target.value.split(',').map((s) => s.trim()).filter((s) => s)
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., www.example1.com, www.example2.com"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-between">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add detailed description about the setup..."
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!hardwareComponents.length || !details.trim()}
          className="mt-6 bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300 self-end disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>

      {/* Feedback Messages */}
      <div className="col-span-1 lg:col-span-2 mt-4">
        {errorMessage && (
          <div className="text-red-500 font-medium bg-red-100 p-3 rounded-md">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 font-medium bg-green-100 p-3 rounded-md">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewSetupForm;








