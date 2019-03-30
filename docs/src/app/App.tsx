/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import React, { createContext, useState } from 'react';
import './App.scss';
import Introduction from './containers/Introduction';
import GettingStarted from './containers/GettingStarted';
import Example from './containers/Examples';
import Aside from './components/Aside';
import Header from './components/Header';

export interface ContextInterface {
  hash: string;
  setHash: (hashValue: string) => void;
}
// tslint:disable-next-line:no-empty
export const AppContext = createContext<ContextInterface>({hash: '', setHash: () => {}});

const App = () => {
  const [hash, setHash] = useState();
  const setHashValue = (hashValue: string) => {
    setHash(hashValue);
    if (history.pushState) {
      window.history.pushState(null, '', `#${hashValue}`);
    } else {
        window.location.hash = hashValue;
    }
  };

  return (
    <AppContext.Provider value={{hash, setHash: setHashValue}}>
    <div className='app'>
      <Aside />
      <Header />
      <div className='main'>
        <Introduction />
        <GettingStarted />
        <Example />
      </div>
    </div>
    </AppContext.Provider>
  );
};

export default App;
