import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import { compose, createStore , applyMiddleware} from 'redux';
import {appReducer} from "./redux/rootReducer"
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


// store redux 
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)


let store = createStore(persistedReducer, composeWithDevTools(
applyMiddleware(thunk)));
let persistor = persistStore(store)



const app = (  
  <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
  </Provider>
)



ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);


