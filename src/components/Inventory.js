import React, { useEffect, useState } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

const Inventory = ({
  addNewFishes,
  fishes,
  loadSampleFishes,
  updateFishes,
  deleteFish,
  storeId,
}) => {
  const [loginState, setLoginState] = useState({ uid: null, owner: null });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        authHandler({ user });
      }
    });
  }, []);

  const authHandler = async (authData) => {
    const store = await base.fetch(storeId, { context: this });
    if (!store.owner) {
      await base.post(`${storeId}/owner`, { data: authData.user.uid });
      setLoginState({
        uid: authData.user.uid,
        owner: store.owner || authData.user.uid,
      });
    } else {
      setLoginState({
        uid: authData.user.uid,
        owner: store.owner || authData.user.uid,
      });
    }
  };

  const logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    setLoginState({ ...loginState, uid: null });
  };

  const logoutButton = <button onClick={logout}>Log Out!</button>;

  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(authHandler);
  };

  // check to see if user is logged in
  if (!loginState.uid) {
    return <Login authenticate={authenticate} />;
  }

  // check to see if the logged in user is the owner of the store
  if (loginState.uid !== loginState.owner) {
    return (
      <div>
        <p>Sorry, you are not the store owner!!!</p>
        {logoutButton}
      </div>
    );
  }

  // display inventory if user is owner
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logoutButton}
      {fishes &&
        Object.keys(fishes).map((fish) => {
          return (
            <EditFishForm
              key={fish}
              fish={fishes[fish]}
              fishKey={fish}
              updateFishes={updateFishes}
              deleteFish={deleteFish}
            />
          );
        })}
      <AddFishForm addNewFishes={addNewFishes} fishes={fishes} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

export default Inventory;
