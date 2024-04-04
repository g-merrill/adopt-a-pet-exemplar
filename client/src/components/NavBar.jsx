import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import '../styles/Forms.css'
import '../styles/NavBar.css'

const NavBar = ({ onFilter }) => {
  const [type, setType] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilter({ type, ageMin, ageMax });
  };

  const handleClearFilters = () => {
    // Reset filter state values
    setType('');
    setAgeMin('');
    setAgeMax('');
    // Optionally, re-fetch all pets or update the UI accordingly
    onFilter({ type: '', ageMin: '', ageMax: '' });
  };

  return (
    <nav>
      <div>
        <Link to="/add-pet">Add Pet</Link> {/* Link to the AddPetForm component */}
      </div>
      <form onSubmit={handleFilterSubmit}>
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Age"
          value={ageMin}
          onChange={(e) => setAgeMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Age"
          value={ageMax}
          onChange={(e) => setAgeMax(e.target.value)}
        />
        <button type="submit">Filter</button>
        <button type="button" onClick={handleClearFilters}>Clear Filters</button> {/* Add this button */}
      </form>
    </nav>
  );
};

export default NavBar;
