import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import SetupService from '@services/SetupService';
import SetupOverviewTable from '@components/SetupOverviewTable';
import { Setup } from '@types';

const Lecturers: React.FC = () => {

    // Basic state management
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // specific state management
    const [setup, setSetup] = useState<Setup[]>([]);
    const [selectedLecturer, setSelectedLecturer] = useState<Setup | null>(null);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const data = await SetupService.getAllSetups();
                setSetup(data);
            } catch (error) {
                setError('Failed to fetch setups');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturers();
    }, []);

    const selectsetups = (Setup: Setup) => {
        setSelectedLecturer(Setup);
        console.log('Selected Setup:', Setup);
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
                    <SetupOverviewTable setups={setup} selectsetups={selectsetups} />
                </section>
            </main>
        </>
    );
};

export default Lecturers;