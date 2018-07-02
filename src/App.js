import React, { Component } from 'react';
import logo from '~/logo.svg';
import './App.css';
import {ShipStore} from '~/model/ShipStore';
import {observer} from 'mobx-react';
import ShipHeader from '~/components/ShipHeader';

const Ship = new ShipStore();
window.store = Ship;

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <ShipHeader store={Ship} />
      </div>
    );
  }
}

export default App;
