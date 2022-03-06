import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './components/StateProvider';
import './index.css';
import reducer,{initalState} from './components/reducer';

import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initalState} reducer={reducer}>
      <App/>

    </StateProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
