import { formatPrice } from '../helpers';

const Fish = ({ details, fishKey, addToOrder }) => {
  const isAvailable = details.status === 'available';
  return (
    <li className="menu-fish">
      <img src={details.image} alt={details.name} />
      <h3 className="fish-name">
        {details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
      <button disabled={!isAvailable} onClick={() => addToOrder(fishKey)}>
        {isAvailable ? 'ADD TO CART' : 'SOLD OUT!'}
      </button>
    </li>
  );
};

export default Fish;
