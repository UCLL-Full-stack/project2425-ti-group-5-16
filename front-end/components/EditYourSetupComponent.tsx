import React from 'react';
import { useRouter } from 'next/router'; // Import Next.js router
import { Setup } from '@types';

type Props = {
  setups: Setup[];
  selectsetups: (setup: Setup) => void;
};

const EditYourSetupComponent: React.FC<Props> = ({ setups, selectsetups }) => {
  const router = useRouter(); // Use Next.js router

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Setup ID</th>
          <th scope="col">Owner</th>
          <th scope="col">Hardware Components</th>
          <th scope="col">Image URLs</th>
          <th scope="col">Details</th>
          <th scope="col">Last Updated</th>
          <th scope="col">Comments</th>
        </tr>
      </thead>
      <tbody>
        {setups.map((setup, index) => (
          <tr
            key={index}
            onClick={() => {
              console.log('Navigating to setup:', setup.setup_id);
              router.push(`/EditYourSetupPage/${setup.setup_id}`); // Navigate to the dynamic route
              selectsetups(setup); // Call selectsetups if needed
            }}
            style={{ cursor: 'pointer' }} // Add pointer cursor for clickability
          >
            <td>{setup.setup_id}</td>
            <td>{setup.owner.name}</td>
            <td>
              <ul>
                {setup.hardware_components.map((component, idx) => (
                  <li key={idx}>
                    <strong>{component.name}</strong> - {component.details} (${component.price})
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {setup.image_urls.map((image, idx) => (
                  <li key={idx}>
                    <a href={image.url} target="_blank" rel="noopener noreferrer">
                      {image.details}
                    </a>
                  </li>
                ))}
              </ul>
            </td>
            <td>{setup.details}</td>
            <td>{new Date(setup.last_updated).toLocaleDateString()}</td>
            <td>
              <ul>
                {setup.comments && setup.comments.length > 0 ? (
                  setup.comments.map((comment, idx) => (
                    <li key={idx}>
                      <strong>User {comment.user_id}:</strong> {comment.content}
                    </li>
                  ))
                ) : (
                  <li>No comments available</li>
                )}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditYourSetupComponent;




