import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

import store from './redux/store';

import App from './App';
import Loader from './components/Loader';

import './styles/normalizer.css';
import './fonts/fonts.css';
import './index.css';

const link = from([new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store.store}>
        <PersistGate loading={<Loader />} persistor={store.persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
