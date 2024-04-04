import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Forms.css'

const UpdatePetForm = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch pet details for updating
  useEffect(() => {
    if (petId) {
      fetch(`http://localhost:3000/pets/${petId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pet not found.');
          }
          return response.json();
        })
        .then(data => {
          setFormData({
            name: data.name,
            type: data.type,
            age: data.age.toString(),
          });
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setError('Failed to fetch pet details.');
          setIsLoading(false);
        });
    } else {
      setError('No pet ID provided.');
      setIsLoading(false);
    }
  }, [petId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit updated pet details
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      age: parseInt(formData.age, 10) // Convert age from string to integer
    };

    fetch(`http://localhost:3000/pets/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData), // Use the updated form data with age as an integer
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update the pet.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      navigate('/'); // Navigate back to the pet list after successful update
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to update pet. Please try again later.');
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Update Pet</button>
    </form>
  );
};

export default UpdatePetForm;
