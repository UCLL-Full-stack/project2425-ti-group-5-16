import Head from 'next/head';
import Header from '@components/header';
import CreateNewSetupForm from '@components/CreateNewSetupForm';

const CreateNewSetup: React.FC = () => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

  return (
    <>
      <Head>
        <title>Create New Setup</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8 px-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create New Setup
        </h1>
        {/* Conditional Content */}
        {token ? (
          <CreateNewSetupForm />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div style={{ color: 'red', border: '2px solid red', padding: '1em', margin: '1em 0', backgroundColor: '#ffe6e6' }}>
              Unauthorized, log in with a valid account to create a new setup
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default CreateNewSetup;




