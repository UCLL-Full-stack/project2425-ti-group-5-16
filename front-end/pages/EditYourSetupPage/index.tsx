import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import SetupService from '@services/SetupService';
import EditYourSetupComponent from '@components/EditYourSetupComponent';
import { Setup } from '@types';

const EditYourSetupPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [setup, setSetup] = useState<Setup[]>([]);

  useEffect(() => {
    const fetchSetups = async () => {
      try {
        const userData = sessionStorage.getItem('user');
        if (!userData) {
          throw new Error("No user data found, please log in to see your setups.");
        }

        const parsedUser = JSON.parse(userData);
        const storedUsername = parsedUser.username;

        if (!storedUsername) {
          throw new Error("Username not found in user data. Please log in again.");
        }

        const result = await SetupService.getAllSetups();
        if (result.error) {
          setError(result.error);
          return;
        }

        const filteredSetups = result.filter((setup: Setup) => setup.owner.name === storedUsername);

        if (filteredSetups.length === 0) {
          setError("No setups found for the current user.");
          return;
        }

        setSetup(filteredSetups);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching setups.");
      } finally {
        setLoading(false);
      }
    };

    fetchSetups();
  }, []);

  const selectsetups = (selectedSetup: Setup) => {
    console.log('Selected setup:', selectedSetup);
  };

  return (
    <>
      <Head>
        <title>Edit Your Setup</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Edit Your Setup</h1>
          <section>
            {loading && (
              <p className="text-gray-500 text-center">Loading setups...</p>
            )}
            {error && (
              <div className="text-red-600 border border-red-500 bg-red-100 px-4 py-2 rounded mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}
            {!loading && !error && setup.length === 0 && (
              <p className="text-gray-500 text-center">
                No setups available for the current user.
              </p>
            )}
            {!loading && !error && setup.length > 0 && (
              <EditYourSetupComponent setups={setup} selectsetups={selectsetups} />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default EditYourSetupPage;









