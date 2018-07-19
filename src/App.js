import React, { Component } from 'react';
import logo from '~/logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Provider} from 'mobx-react';
import {create as createJss} from 'jss'
import {JssProvider} from 'react-jss'
import jssNested from 'jss-nested';
import jssCamel from 'jss-camel-case';
import jssVendor from 'jss-vendor-prefixer';
// import firebase from 'firebase';
// import 'firebase/firestore';
// import {initFirestorter, Collection, Document} from 'firestorter';
import {ShipStore} from '~/model/ShipStore';
import ShipHeader from '~/components/ShipHeader';
import ComponentView from '~/components/ComponentView';
import WeaponsView from '~/components/WeaponsView';
import ExtrasView from '~/components/ExtrasView';

// firebase.initializeApp({
//   apiKey: 'AIzaSyDAqEMurbKpQT8Bz7mZuVmncWiG-0G4-o4',
//   authDomain: 'rtshipdesigner.firebaseapp.com',
//   projectId: 'rtshipdesigner'
// });

// initFirestorter({firebase: firebase});

// async function save(store) {
//   const designs = new Collection('shipdesigns');
//   const doc = await designs.add(
//     store.serialize
//   )
// }


const jss = createJss()
jss.use(jssNested())
jss.use(jssCamel())
jss.use(jssVendor())

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
              <WeaponsView />
              <ExtrasView />
            </React.Fragment>
          </Provider>
        </JssProvider>
      </div>
    );
  }
}

export default App;