import React from 'react';
import { formatPrice } from '../helpers';

const Order = ({ fishes, order, deleteOrder }) => {
  const orderIds = Object.keys(order);
  const total = orderIds.reduce((acc, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    if (isAvailable) {
      return acc + count * fish.price;
    }
    return acc;
  }, 0);

  const showFish = (key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    if (!fish) {
      return null;
    }
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => deleteOrder(key)}>X</button>
      </li>
    );
  };

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <ul className="order">{orderIds.map((key) => showFish(key))}</ul>
      Total: <strong>{formatPrice(total)}</strong>
    </div>
  );
};

export default Order;
