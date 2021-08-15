import { Route } from "react-router-dom";
import Home from "./components/home/home";
import Details from "./components/details/details";
import NavBar from "./components/navBar/navBar";
import './App.css';
import React from 'react';



function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={Home}/>
      <Route path='/details/:id' component = {Details} />
    </div>
  );
}

export default App;
