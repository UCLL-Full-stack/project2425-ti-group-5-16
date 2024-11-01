import Head from 'next/head';
import Header from '@components/header';
import CreateNewSetupForm from '@components/CreateNewSetupForm';

const CreateNewSetup: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create New Setup</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Create New Setup</h1>
        <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <CreateNewSetupForm />
        </section>
      </main>
    </>
  );
};

export default CreateNewSetup;


