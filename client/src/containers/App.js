import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Coming from './Coming';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Liquidate</h1>
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/coming' component={Coming} />
        </Switch>
      </div>
    );
  }
}
export default App;
