import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Char from './Char';
import Home from './Home';
import './style.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="wrapper">
            <Switch>
              <Route path={"/"} exact component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
