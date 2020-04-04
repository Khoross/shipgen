import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {initFirestorter, Collection, Document} from 'firestorter';

firebase.initializeApp({
  apiKey: 'AIzaSyDAqEMurbKpQT8Bz7mZuVmncWiG-0G4-o4',
  authDomain: 'rtshipdesigner.firebaseapp.com',
  projectId: 'rtshipdesigner'
});
firebase.firestore().settings({timestampsInSnapshots: true});

initFirestorter({firebase: firebase});

const designCol = new Collection('shipdesigns');

@inject('shipStore')
@observer
export default class LoadPage extends Component {
  @observable selectedBuild="NOCHANGE";

  saveNew() {
    this.props.shipStore.id = +new Date();
    this.save();
  }

  async save() {
    if(this.props.shipStore.id === undefined){
      this.props.shipStore.id = +new Date();
    }
    const doc = new Document(`shipdesigns/${this.props.shipStore.id}`)
    doc.set(this.props.shipStore.serialize)
  }

  async load() {
    if(this.selectedBuild !== "NOCHANGE") {
      const doc = new Document(`shipdesigns/${this.selectedBuild}`);
      doc.fetch();
      await doc.ready();
      this.props.shipStore.hydrate(doc.data)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Col xs={3}>
              {this.props.shipStore.id === undefined ?
                <Button
                  onClick={()=>this.save()}
                  block>
                  Save build as new
                </Button> :
                <React.Fragment>
                  <Button
                    onClick={()=>this.save()}
                    block>
                    Update current build
                  </Button>
                  <Button
                    onClick={()=>this.saveNew()}
                    block>
                    Save build as new
                  </Button>
                </React.Fragment>
              }
              <Button
                onClick={()=>this.load()}
                bsStyle="success"
                block>
                Load selected build
              </Button>
            </Col>
            <Col xs={9}>
              <select
                className="form-control"
                size={5}
                onChange={(e)=>this.selectedBuild = e.target.value}
                >
                <option value="NOCHANGE">Retain current design</option>
                {designCol.docs.map((doc) => 
                  <option value={doc.id}>{doc.data.name!=-100?doc.data.name:'Unnamed Design'}</option>
                  )}
              </select>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}
