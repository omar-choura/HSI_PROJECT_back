import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [references, setReferences] = useState([]);
  const [name, setName] = useState('');
  const [site, setSite] = useState('');

  // Fetch all references when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5555/reference/getAllReferences')
      .then(response => {
        console.log('Fetched references:', response.data.data);
        setReferences(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching references:', error);
      });
  }, []);

  // Function to add a new reference
  const addReference = () => {
    console.log('Adding reference:', { name, site });
    axios.post('http://localhost:5555/reference/addNewReference', { name, site })
      .then(response => {
        console.log('Add reference response:', response);
        if (response.status === 200) {
          // Fetch the updated list of references after adding a new one
          axios.get('http://localhost:5555/reference/getAllReferences')
            .then(response => {
              console.log('Fetched updated references:', response.data.data);
              setReferences(response.data.data);
            })
            .catch(error => {
              console.error('Error fetching updated references:', error);
            });
        }
        setName('');
        setSite('');
      })
      .catch(error => {
        console.error('Error adding reference:', error);
      });
  };

  return (
    <div>
      <h1>References</h1>
      <ul>
        {references.map((reference, index) => (
          <li key={index}>{reference.name} - {reference.site}</li>
        ))}
      </ul>
      <h2>Add New Reference</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        placeholder="Site"
      />
      <button onClick={addReference}>Add Reference</button>
    </div>
  );
};

export default App;
