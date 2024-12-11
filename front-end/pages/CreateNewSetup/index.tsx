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
      <main className="min-h-screen bg-gray-50 py-8 px-6">
        {/* Page Title */}
        <h3 className="text-4xl font-bold text-gray-700 mb-8 text-center">
          Create New Setup
        </h3>

        {/* Input Fields Spread Across the Page */}
        <CreateNewSetupForm />
      </main>
    </>
  );
};

export default CreateNewSetup;


