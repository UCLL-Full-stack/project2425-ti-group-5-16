import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';

const CreateNewSetup: React.FC = () => {
  const [setupId, setSetupId] = useState<number | undefined>();
  const [ownerId, setOwnerId] = useState<number | undefined>();
  const [hardwareComponents, setHardwareComponents] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [details, setDetails] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      setup_id: setupId,
      owner: {
        id: ownerId
      },
      hardware_components: hardwareComponents,
      image_urls: imageUrls,
      details: details,
      last_updated: lastUpdated
    };

    try {
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Data submitted successfully');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Setup</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Create New Setup</h1>
        <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
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
            <div>
              <label className="block text-gray-600 font-medium mb-1">Last Updated:</label>
              <input
                type="datetime-local"
                value={lastUpdated}
                onChange={(e) => setLastUpdated(e.target.value)}
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
        </section>
      </main>
    </>
  );
};

export default CreateNewSetup;

