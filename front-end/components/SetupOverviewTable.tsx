import React from 'react';
import { Setup } from '@types';

type Props = {
  setups: Array<Setup>;
  selectsetups: (setup: Setup) => void;
};

const LecturerOverviewTable: React.FC<Props> = ({ setups, selectsetups }) => {
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default LecturerOverviewTable;