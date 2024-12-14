import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import SetupService from '@services/SetupService';
import EditSetup from '@components/EditSetup';
import { Setup } from '@types';

const EditSetupOverview: React.FC = () => {

    // Basic state management
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // specific state management
    const [setup, setSetup] = useState<Setup[]>([]);
    const [selectedLecturer, setSelectedLecturer] = useState<Setup | null>(null);

    useEffect(() => {
        const fetchSetups = async () => {
            try {
                const data = await SetupService.getAllSetups();
                // Filter the setups to only include setups where the owner name is "Janny Smith"
                const filteredSetups = data.filter((setup: Setup) => setup.owner.name === 'Janny Smith');
                setSetup(filteredSetups);
            } catch (error) {
                setError('Failed to fetch setups');
            } finally {
                setLoading(false);
            }
        };

        fetchSetups();
    }, []);

    const selectsetups = (setup: Setup) => {
        setSelectedLecturer(setup);
        console.log('Selected Setup:', setup);
    };

    return (
        <>
            <Head>
                <title>SetupOverview</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>SetupOverview</h1>
                <section>
                    <p>List of registered setups will be displayed here:</p>
                    <h2>Setup Overvieuw</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    <EditSetup setups={setup} selectsetups={selectsetups} />
                </section>
            </main>
        </>
    );
};

export default EditSetupOverview;

