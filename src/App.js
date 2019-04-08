import React, { Component } from 'react';
import Home from './components/Home'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="h-100">
       <Header />
       <Home />
      </div>
    );
  }
}

export default App;
