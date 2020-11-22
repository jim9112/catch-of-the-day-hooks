import React, { useState } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

const App = () => {
  const [fishes, setFish] = useState({});
  const [order, setOrder] = useState({});

  // add fish from inventory form to fish state
  const addNewFishes = ({ newFish }) => {
    const fishName = `fish${Date.now()}`;
    setFish({ ...fishes, [fishName]: { ...newFish } });
  };

  // loads sample data into state from sample file
  const loadSampleFishes = () => {
    setFish({ ...fishes, ...sampleFishes });
  };

  // add order from menu to state
  const addToOrder = (key) => {
    const newOrder = order;
    newOrder[key] = newOrder[key] + 1 || 1;
    setOrder({ ...newOrder });
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(fishes).map((key) => (
            <Fish
              key={key}
              details={fishes[key]}
              addToOrder={addToOrder}
              fishKey={key}
            />
          ))}
        </ul>
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
