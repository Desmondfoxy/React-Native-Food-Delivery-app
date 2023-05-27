import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import Navigation, {AppStack, AuthStack} from './navigation';

export default function App() {
  // const [currentUser, setCurrentUser] = useState(true);
  const currentUser = true;
  return (
    <Provider store={store}>
      <>{currentUser ? <AppStack /> : <AuthStack />}</>
    </Provider>
  );
}
