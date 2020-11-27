import React, { useEffect, useState } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

function App({ match }) {
  const [fishes, setFish] = useState({});
  const [order, setOrder] = useState({});

  // sync state with firebase on load
  useEffect(() => {
    const ref = base.syncState(`${match.params.storeId}/fishes`, {
      context: {
        setState: ({ fishes }) => setFish({ ...fishes }),
        state: { fishes },
      },
      state: 'fishes',
    });
    return () => {
      base.removeBinding(ref);
    };
  }, []);

  // update order from local storage on mount
  useEffect(() => {
    const localStorageRef = localStorage.getItem(match.params.storeId);
    const updatedOrder = JSON.parse(localStorageRef);
    setOrder(updatedOrder || {});
  }, []);

  // update local storage with order on change
  useEffect(() => {
    localStorage.setItem(match.params.storeId, JSON.stringify(order));
  }, [order]);

  // add fish from inventory form to fish state
  const addNewFishes = ({ newFish }) => {
    const fishName = `fish${Date.now()}`;
    const updatedFishes = { ...fishes, [fishName]: { ...newFish } };
    setFish(updatedFishes);
    base.post(`${match.params.storeId}/fishes`, {
      data: updatedFishes,
    });
  };
  // update fish inventory
  const updateFishes = (key, fish) => {
    const updatedFishes = { ...fishes };
    updatedFishes[key] = fish;
    setFish(updatedFishes);
    base.post(`${match.params.storeId}/fishes`, {
      data: updatedFishes,
    });
  };

  // delete fish from inventory
  const deleteFish = (key) => {
    const fishList = { ...fishes };
    fishList[key] = null;
    console.log(fishList);
    setFish({ fishList });
    base.post(`${match.params.storeId}/fishes`, {
      data: fishList,
    });
  };

  // loads sample data into state from sample file
  const loadSampleFishes = () => {
    const updatedFishes = { ...fishes, ...sampleFishes };
    setFish(updatedFishes);
    base.post(`${match.params.storeId}/fishes`, {
      data: updatedFishes,
    });
  };

  // add order from menu to state
  const addToOrder = (key) => {
    const newOrder = order;
    newOrder[key] = newOrder[key] + 1 || 1;
    setOrder({ ...newOrder });
  };

  // delete from order
  const deleteOrder = (key) => {
    const currentOrder = { ...order };
    delete currentOrder[key];
    setOrder({ ...currentOrder });
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
      <Order fishes={fishes} order={order} deleteOrder={deleteOrder} />
      <Inventory
        addNewFishes={addNewFishes}
        fishes={fishes}
        loadSampleFishes={loadSampleFishes}
        updateFishes={updateFishes}
        deleteFish={deleteFish}
        storeId={match.params.storeId}
      />
    </div>
  );
}
export default App;
