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
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Setup Overview</h1>
          <section>
            {loading && (
              <p className="text-gray-500 text-center">Loading setups...</p>
            )}
            {error && (
              <div className="text-red-600 border border-red-500 bg-red-100 px-4 py-2 rounded mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}
            {!loading && !error && (
              <SetupOverviewTable setups={setup} selectsetups={selectsetups} />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default SetupOverview;

