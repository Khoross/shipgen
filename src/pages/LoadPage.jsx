import React, { Component } from 'react';
import {Button, Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import firebase from 'firebase';
import 'firebase/firestore';
import {initFirestorter, Collection, Document} from 'firestorter';

firebase.initializeApp({
  apiKey: 'AIzaSyDAqEMurbKpQT8Bz7mZuVmncWiG-0G4-o4',
  authDomain: 'rtshipdesigner.firebaseapp.com',
  projectId: 'rtshipdesigner'
});

initFirestorter({firebase: firebase});

window.design = new Collection('shipdesigns')

@inject('shipStore')
@observer
export default class LoadPage extends Component {
  @observable selectedBuild="NOCHANGE";

  constructor(props){
    super(props);
    this.designCol = new Collection('shipdesigns');

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
              <Button
                onClick={()=>this.save()}
                block>
                Save current build
              </Button>
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
                {this.designCol.docs.map((doc) => 
                  <option value={doc.id}>{doc.data.name}</option>
                  )}
              </select>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}
