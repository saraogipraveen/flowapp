import React from 'react';
import './App.css';
import Header from './components/header';
import Login from './components/login';
import Workflow from './components/workflow/workflow';
import Home from './components/home';

function App() {
  return (
    <div className="">
      <Header/>
      <Login/>
      <Home/>
      <Workflow/>
    </div>
  );
}

export default App;
