import React, { useEffect, useState } from 'react';
import { getFunName } from '../helpers';

const StorePicker = (props) => {
  var [myInput, setMyInput] = useState();
  useEffect(() => {
    setMyInput(getFunName());
  }, []);

  const gotToStore = (e) => {
    e.preventDefault();
    console.log(myInput);
    props.history.push(`/store/${myInput}`);
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
