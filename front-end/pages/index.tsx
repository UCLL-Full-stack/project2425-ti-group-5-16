import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import HomePageInfomation from '@components/HomePageInformation';

const HomePage: React.FC = () => {

  return (
    <>
      <Head>
        <title>HomePage</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <section>
          <HomePageInfomation />
        </section>
      </main>
    </>
  );
};

export default HomePage;
