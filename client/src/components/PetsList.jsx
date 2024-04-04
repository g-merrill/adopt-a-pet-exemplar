import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PetCard from './PetCard'; // Make sure this import path matches your file structure
import '../styles/Pets.css'

const PetsList = ({ filters }) => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Construct query parameters from the filters object
    const queryParams = new URLSearchParams({
      ...(filters.type && { type: filters.type }),
      ...(filters.ageMin && { age_min: filters.ageMin }),
      ...(filters.ageMax && { age_max: filters.ageMax }),
    }).toString();

    fetch(`http://localhost:3000/pets?${queryParams}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPets(data); // Update the pets state with the fetched data
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        setError('Failed to fetch pets. Please try again later.');
      });
  }, [filters]); // This useEffect depends on the filters, it re-runs whenever filters change

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/pets/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the pet.');
      }
      // Filter out the pet that was deleted
      setPets(pets.filter(pet => pet.id !== id));
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to delete pet. Please try again later.');
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update-pet/${id}`); // Navigate to the update form
  };

  if (error) return <div>Error: {error}</div>;
  if (!pets.length) return <div>Loading...</div>;

  return (
    <div>
      {pets.map(pet => (
        <PetCard 
          key={pet.id}
          pet={pet}
          onUpdate={() => handleUpdate(pet.id)}
          onDelete={() => handleDelete(pet.id)}
        />
      ))}
    </div>
  );
};

export default PetsList;
