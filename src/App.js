import React, { Component } from 'react';
import logo from '~/logo.svg';
import '~/static/bootstrap.css';
import './App.css';
import {ShipStore} from '~/model/ShipStore';
import {observer} from 'mobx-react';
import ShipHeader from '~/components/ShipHeader';
import HullList from '~/components/HullList';

const Ship = new ShipStore();
window.store = Ship;

class App extends Component {
  render() {
    return (

      <div className="container">
        <ShipHeader store={Ship} />
        <div className="row">
          <HullList shipStore={Ship}/>
        </div>
      </div>
    );
  }
}

export default App;
