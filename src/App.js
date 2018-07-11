import React, { Component } from 'react';
import logo from '~/logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {ShipStore} from '~/model/ShipStore';
import {ViewStore} from '~/model/ViewStore';
import {observer} from 'mobx-react';
import ShipHeader from '~/components/ShipHeader';
import HullList from '~/components/HullList';

const Ship = new ShipStore();
const View = new ViewStore();
window.store = Ship;
window.store2 = View

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HullList shipStore={Ship} viewStore={View}/>
        <ShipHeader store={Ship} viewStore={View}/>
      </div>
    );
  }
}

export default App;