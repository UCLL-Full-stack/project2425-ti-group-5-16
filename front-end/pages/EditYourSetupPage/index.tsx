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
        const result = await SetupService.getAllSetups();
        console.log("Fetched setups data:", result);
  
        if (result.error) {
          setError(result.error);
          return;
        }
  
        // Hardcode "john" as the current owner for now
        const hardcodedOwner = "john";
        console.log("Filtering setups for owner:", hardcodedOwner);
  
        // Ensure setup.owner.name exists before filtering
        const filteredSetups = result.filter((setup: Setup) => {
          console.log("Owner comparison:", setup.owner.name, "==", hardcodedOwner);
          return setup.owner.name === hardcodedOwner;
        });
  
        console.log("Filtered setups:", filteredSetups);
  
        setSetup(filteredSetups);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching setups.");
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
        <title>Setup Overview</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Setup Overview</h1>
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

export default EditYourSetupPage





