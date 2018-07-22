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
import {Router, Route} from 'react-router-dom'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {ShipStore} from '~/model/ShipStore';
import ShipHeader from '~/components/ShipHeader';
import ShipPage from '~/pages/ShipPage';
import LoadPage from '~/pages/LoadPage';
import NavBar from '~/pages/NavBar';


const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const jss = createJss()
jss.use(jssNested())
jss.use(jssCamel())
jss.use(jssVendor())

const Ship = new ShipStore();
window.store = Ship;

class App extends Component {
  render() {
    return (
      <Provider shipStore={Ship} routingStore={routingStore}>
        <Router history={history}>
          <div className="container-fluid">
            <JssProvider jss={jss}>
              <React.Fragment>
                <ShipHeader/>
                <NavBar />
                <Route path="/io" component={LoadPage} />
                <Route path="/" exact component={ShipPage} />
              </React.Fragment>
            </JssProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;