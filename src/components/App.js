import React, { useState } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

const App = () => {
  console.log(sampleFishes);
  const [fishes, setFish] = useState({});
  const [order, setOrder] = useState({});

  // add fish from inventory form to fish state
  const addNewFishes = ({ newFish }) => {
    const fishName = `fish${Date.now()}`;
    setFish({ ...fishes, [fishName]: { ...newFish } });
  };
  const loadSampleFishes = () => {
    setFish({ ...fishes, ...sampleFishes });
  };
  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory
        addNewFishes={addNewFishes}
        fishes={fishes}
        loadSampleFishes={loadSampleFishes}
      />
    </div>
  );
};
export default App;
