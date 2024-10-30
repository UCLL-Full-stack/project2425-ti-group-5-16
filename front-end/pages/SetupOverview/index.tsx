import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';

const Lecturers: React.FC = () => {

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
                </section>
            </main>
        </>
    );
};

export default Lecturers;