import './App.css';
import React from 'react';
import { Details } from './components/details/details';

function App() {
  return (
    <div className="App">
      <Route path='/details' component = {Details} />
    </div>
  );
}

export default App;
