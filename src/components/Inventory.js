import React from 'react';
import AddFishForm from './AddFishForm';

const Inventory = ({ addNewFishes, fishes, loadSampleFishes }) => {
  return (
    <div className="inventory">
      <p>Inventory Component</p>
      <AddFishForm addNewFishes={addNewFishes} fishes={fishes} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

export default Inventory;
