import React from 'react';
import './App.css';
import Header from './components/header';
import Login from './components/auth/login';
import Workflow from './components/workflow/workflow';
import Home from './components/home';
import Register from './components/auth/register';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="">
      <Header />

      <Router>
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/workflow/:workflowId" exact > <Workflow /></Route>
          <Route path="/login" exact ><Login /></Route>
          <Route path="/register" exact ><Register /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
