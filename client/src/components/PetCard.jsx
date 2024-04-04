import React from 'react';
import '../styles/Pets.css'

const PetCard = ({ pet, onUpdate, onDelete }) => {
  return (
    <div className="pet-card">
      <h2>{pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Age: {pet.age}</p>
      <div className="actions">
        <button onClick={() => onUpdate(pet.id)}>Update</button>
        <button onClick={() => onDelete(pet.id)}>Delete</button>
      </div>
    </div>
  );
};

export default PetCard;
