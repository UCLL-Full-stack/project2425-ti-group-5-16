import React from 'react';
import { Setup } from '@types';

type Props = {
  setups: Array<Setup>;
  selectsetups: (setup: Setup) => void;
};

const SetupOverview: React.FC<Props> = ({ setups, selectsetups }) => {
  return (
    <>
      {setups && (
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
              <tr key={index} onClick={() => selectsetups(setup)}>
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
      )}
    </>
  );
};

export default SetupOverview;
