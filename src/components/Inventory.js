import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

const Inventory = ({
  addNewFishes,
  fishes,
  loadSampleFishes,
  updateFishes,
}) => {
  return (
    <div className="inventory">
      {fishes &&
        Object.keys(fishes).map((fish) => {
          return (
            <EditFishForm
              key={fish}
              fish={fishes[fish]}
              fishKey={fish}
              updateFishes={updateFishes}
            />
          );
        })}
      <AddFishForm addNewFishes={addNewFishes} fishes={fishes} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

export default Inventory;
