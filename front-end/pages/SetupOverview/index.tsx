import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import SetupService from '@services/SetupService';
import SetupOverviewTable from '@components/SetupOverviewTable';
import { Setup } from '@types';

const SetupOverview: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [setup, setSetup] = useState<Setup[]>([]);

  useEffect(() => {
    const fetchSetups = async () => {
      const result = await SetupService.getAllSetups();
      if (result.error) {
        setError(result.error);
      } else {
        setSetup(result);
      }
      setLoading(false);
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
            <div style={{ color: 'red', border: '2px solid red', padding: '1em', margin: '1em 0', backgroundColor: '#ffe6e6' }}>
              <strong>{error}</strong>
            </div>
          )}
          {!loading && !error && (
            <SetupOverviewTable setups={setup} selectsetups={selectsetups} />
          )}
        </section>
      </main>
    </>
  );
};

export default SetupOverview;
