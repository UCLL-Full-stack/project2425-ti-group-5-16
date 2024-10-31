import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';

const HomePage: React.FC = () => {

  return (
    <>
      <Head>
        <title>HomePage</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>HomePage</h1>
        <section>
          <p>
            This is the homepage of the Setup Showcase. 
          </p>
        </section>
      </main>
    </>
  );
};

export default HomePage;
