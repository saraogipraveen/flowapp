import React, { useState } from 'react';
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
import { AuthContext } from './context/AuthContext';
import Authenticate from './hoc/authenticate';


export const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  PROGRESS : 'progress'
}

function App() {

  const [user, setUser] = useState(null)


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>{Authenticate(Home)}</Route>
          <Route path="/workflow/:workflowId" exact> <Workflow /></Route>
          <Route path="/login" exact ><Login /></Route>
          <Route path="/register" exact ><Register /></Route>
          <Route>
            <h3>Error 404: Page Not Found</h3>
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider >
  );
}

export default App;
