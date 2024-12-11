import Head from 'next/head';
import Header from '@components/header';
import CreateNewSetupForm from '@components/CreateNewSetupForm';

const CreateNewSetup: React.FC = () => {
  return (
    <>
      <Head>
        <title>EdityourSetup</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Edit Your setups</h1>
        <p>Select the setup you want to Edit</p>
        <section>
          
        </section>
      </main>
    </>
  );
};

export default CreateNewSetup;