import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

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

Fish.prototypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    dec: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
  addToOrder: PropTypes.func,
};

export default Fish;
