import React, { useState } from 'react';

function AddPetForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, type, age: parseInt(age, 10) }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Pet added:', data);
      // Optionally clear the form or give user feedback
    })
    .catch(error => console.error('Error adding pet:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Pet</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type (e.g., Dog, Cat)"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <button type="submit">Add Pet</button>
    </form>
  );
}

export default AddPetForm;
