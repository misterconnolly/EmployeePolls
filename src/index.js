import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/index.css';
import App from './components/App';
import reducer from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";

const store = createStore(reducer, middleware);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  );