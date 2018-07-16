import React, { Component } from 'react';
import logo from '~/logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {ShipStore} from '~/model/ShipStore';
import ShipHeader from '~/components/ShipHeader';
import ComponentView from '~/components/ComponentView';
import {Provider} from 'mobx-react';
import {create as createJss} from 'jss'
import {JssProvider} from 'react-jss'
import jssNested from 'jss-nested';
import firebase from 'firebase';
import 'firebase/firestore';
import {initFirestorter, Collection, Document} from 'firestorter';
import {Button} from 'react-bootstrap';

firebase.initializeApp({
  apiKey: 'AIzaSyDAqEMurbKpQT8Bz7mZuVmncWiG-0G4-o4',
  authDomain: 'rtshipdesigner.firebaseapp.com',
  projectId: 'rtshipdesigner'
});

initFirestorter({firebase: firebase});

async function save(store) {
  const designs = new Collection('shipdesigns');
  console.log(store.serialize)
  const doc = await designs.add(
    store.serialize
  )
}


const jss = createJss()
jss.use(jssNested())

const Ship = new ShipStore();
window.store = Ship;

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <JssProvider jss={jss}>
          <Provider shipStore={Ship}>
            <React.Fragment>
              <ShipHeader/>
              <ComponentView />
              <Button onClick={()=>save(Ship)} > TEST </Button>
            </React.Fragment>
          </Provider>
        </JssProvider>
      </div>
    );
  }
}

export default App;