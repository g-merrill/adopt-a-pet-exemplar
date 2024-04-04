import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import PetsList from './components/PetsList';
import AddPetForm from './components/AddPetForm';
import UpdatePetForm from './components/UpdatePetForm';

const App = () => {
  const [filters, setFilters] = useState({});

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <div>
        <h1>Adopt-a-Pet</h1>
        <NavBar onFilter={handleFilter} />
        <Routes>
          <Route path="/" element={<PetsList filters={filters} />} />
          <Route path="/add-pet" element={<AddPetForm onPetAdded={() => window.location.href = '/'} />} />
          <Route path="/update-pet/:petId" element={<UpdatePetForm onPetUpdated={() => window.location.href = '/'} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
