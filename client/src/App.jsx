import React from 'react';
import PetList from './components/PetList';
import AddPetForm from './components/AddPetForm';

function App() {
  return (
    <div className="App">
      <h1>Adopt a Pet</h1>
      <AddPetForm />
      <PetList />
    </div>
  );
}

export default App;
