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
      <main className="min-h-screen bg-gray-100 grid grid-rows-layout grid-cols-layout gap-6 p-6">
        {/* Page Title */}
        <h3 className="text-3xl font-bold text-gray-700 col-span-2 m-0 p-0">
          Create New Setup
        </h3>
        {/* Form Elements Spread Across the Page */}
        <CreateNewSetupForm />
      </main>
    </>
  );
};

export default CreateNewSetup;



