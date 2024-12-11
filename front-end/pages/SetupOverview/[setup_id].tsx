import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Setup } from '@types';
import SetupService from '@services/SetupService'; // Import the service

type Props = {
  setup: Setup | null;
};

const SetupDetailsPage: React.FC<Props> = ({ setup }) => {
  const router = useRouter();
  const { setup_id } = router.query;

  if (!setup) {
    return <div>Setup with ID {setup_id} not found!</div>;
  }

  return (
    <div>
      <h1>Setup Details for ID: {setup_id}</h1>
      <h2>Owner: {setup.owner.name}</h2>
      <h3>Hardware Components:</h3>
      <ul>
        {setup.hardware_components.map((component, idx) => (
          <li key={idx}>
            <strong>{component.name}</strong> - {component.details} (${component.price})
          </li>
        ))}
      </ul>
      <h3>Image URLs:</h3>
      <ul>
        {setup.image_urls.map((image, idx) => (
          <li key={idx}>
            <a href={image.url} target="_blank" rel="noopener noreferrer">
              {image.details}
            </a>
          </li>
        ))}
      </ul>
      <p>{setup.details}</p>
      <p>Last Updated: {new Date(setup.last_updated).toLocaleDateString()}</p>
      <h3>Comments:</h3>
      <ul>
        {setup.comments.map((comment, idx) => (
          <li key={idx}>
            <strong>User {comment.user_id}:</strong> {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Use getServerSideProps to fetch the setup details
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { setup_id } = context.params!; // Get the setup ID from the URL parameters

  try {
    // Use the SetupService to fetch the setup by ID
    const setup = await SetupService.getSetupById(setup_id as string);

    return {
      props: {
        setup, // Pass the setup data as props
      },
    };
  } catch (error) {
    console.error('Error fetching setup:', error);
    return {
      props: {
        setup: null, // Pass null if there's an error
      },
    };
  }
};

export default SetupDetailsPage;


