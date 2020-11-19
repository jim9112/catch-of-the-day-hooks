import React, { useEffect, useState } from 'react';
import { getFunName } from '../helpers';

const StorePicker = () => {
  var [myInput, setMyInput] = useState();
  useEffect(() => {
    setMyInput(getFunName());
  }, []);

  const gotToStore = (e) => {
    e.preventDefault();
    console.log('go to store');
  };

  return (
    <>
      <form action="" className="store-selector" onSubmit={gotToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" placeholder="Store Name" defaultValue={myInput} />
        <button type="submit">Visit Store</button>
      </form>
    </>
  );
};

export default StorePicker;
