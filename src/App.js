import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './content/scss/styles.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route component={MainLayout} exact path={'/posts/:page'} />
          <Route component={() => <MainLayout page={1} />} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
