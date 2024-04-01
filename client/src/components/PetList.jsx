import React, { useState, useEffect } from 'react';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []); // The empty array ensures this effect runs once after the initial render

  return (
    <div>
      <h2>Available Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>{pet.name} - {pet.type}</li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
