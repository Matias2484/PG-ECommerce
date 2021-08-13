import { Route } from "react-router-dom";
import Home from "./components/home/home";
import Details from "./components/details/details";
import './App.css';
import React from 'react';



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home}/>
      <Route path='/details/:id' component = {Details} />
    </div>
  );
}

export default App;
