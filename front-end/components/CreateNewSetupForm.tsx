import React, { useState } from 'react';
import SetupService from '@services/SetupService';

const CreateNewSetupForm: React.FC = () => {
  const [hardwareIdsInput, setHardwareIdsInput] = useState<string>('');
  const [imageIdsInput, setImageIdsInput] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const hardwareComponentIds = hardwareIdsInput
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')
      .map(Number);

    const imageIds = imageIdsInput
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')
      .map(Number);

    if (hardwareComponentIds.some(isNaN) || imageIds.some(isNaN)) {
      setErrorMessage('Please enter valid numbers for hardware and image IDs.');
      return;
    }

    if (!details.trim()) {
      setErrorMessage('Details cannot be empty.');
      return;
    }

    const setupData = {
      details,
      hardwareComponentIds,
      imageIds,
    };

    try {
      await SetupService.createSetup(setupData);
      setSuccessMessage('Setup successfully created!');
      setHardwareIdsInput('');
      setImageIdsInput('');
      setDetails('');
    } catch (error) {
      console.error('Failed to create setup:', error);
      setErrorMessage('Failed to create setup. Please try again later.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="flex flex-col space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Hardware Components (IDs)</label>
          <input
            type="text"
            value={hardwareIdsInput}
            onChange={(e) => setHardwareIdsInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter hardware IDs separated by commas (e.g., 1, 2, 3)"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Images (IDs)</label>
          <input
            type="text"
            value={imageIdsInput}
            onChange={(e) => setImageIdsInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter image IDs separated by commas (e.g., 101, 102)"
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
            className="w-full h-64 px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Add detailed description about the setup..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300"
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












