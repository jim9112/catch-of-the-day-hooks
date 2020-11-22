import { useState } from 'react';

const AddFishForm = ({ addNewFishes, fishes }) => {
  const [newFish, setNewFish] = useState({
    name: '',
    price: 0.0,
    status: 'available',
    desc: '',
    image: '',
  });

  // update component state on input change
  const handleInputChange = (e) => {
    const elName = e.target.name;
    if (elName === 'price') {
      const elValue = parseFloat(e.target.value);
      setNewFish({ ...newFish, [elName]: elValue });
    } else {
      const elValue = e.target.value;
      setNewFish({ ...newFish, [elName]: elValue });
    }
  };

  // Add fish to app fish state
  const createFish = (e) => {
    e.preventDefault();
    addNewFishes({ ...fishes, newFish });
    e.currentTarget.reset();
  };

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleInputChange}
      />
      <input
        name="price"
        type="text"
        placeholder="Price"
        onChange={handleInputChange}
      />
      <select name="status" onChange={handleInputChange}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!!</option>
      </select>
      <textarea
        name="desc"
        placeholder="Description"
        onChange={handleInputChange}
      />
      <input
        name="image"
        type="text"
        placeholder="Image"
        onChange={handleInputChange}
      />
      <button type="submit">+ Add Fish</button>
    </form>
  );
};

export default AddFishForm;
