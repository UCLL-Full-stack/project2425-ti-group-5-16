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
        // Retrieve and parse the "user" data from sessionStorage
        const userData = sessionStorage.getItem('user');
        if (!userData) {
          throw new Error("No user data found, please log in to see your setups.");
        }

        const parsedUser = JSON.parse(userData);
        const storedUsername = parsedUser.username;

        if (!storedUsername) {
          throw new Error("Username not found in user data. Please log in again.");
        }

        console.log("Current user:", storedUsername);

        // Fetch all setups from the API
        const result = await SetupService.getAllSetups();
        console.log("Fetched setups data:", result);

        if (result.error) {
          setError(result.error);
          return;
        }

        // Filter setups based on the retrieved username
        console.log("Filtering setups for owner:", storedUsername);

        const filteredSetups = result.filter((setup: Setup) => {
          console.log("Owner comparison:", setup.owner.name, "==", storedUsername);
          return setup.owner.name === storedUsername;
        });

        console.log("Filtered setups:", filteredSetups);

        if (filteredSetups.length === 0) {
          setError("No setups found for the current user.");
          return;
        }

        setSetup(filteredSetups);
      } catch (err: any) {
        console.error("Fetch error:", err);
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
        <title>EditYourSetup</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Edit Your Setup</h1>
        <p>Select a setup to edit:</p>
        <section>
          {loading && <p>Loading...</p>}
          {error && (
            <div
              style={{
                color: 'red',
                border: '2px solid red',
                padding: '1em',
                margin: '1em 0',
                backgroundColor: '#ffe6e6',
              }}
            >
              <strong>{error}</strong>
            </div>
          )}
          {!loading && !error && setup.length === 0 && <p>No setups available for the current user.</p>}
          {!loading && !error && setup.length > 0 && (
            <EditYourSetupComponent setups={setup} selectsetups={selectsetups} />
          )}
        </section>
      </main>
    </>
  );
};

export default EditYourSetupPage;







