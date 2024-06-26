import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';  // Implementing Redux: Import Provider from react-redux
import store from './store'; // Implementing Redux: import the store that I initially created
import HomeScreen from './screens/HomeScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
// eslint-disable-next-line import/first
import CartScreen from './screens/CartScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/book/:id' element={<BookDetailsScreen />} />
      <Route path='/cart' element={<CartScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Implementing Redux: Wrap the Router provider with Provider*/}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
