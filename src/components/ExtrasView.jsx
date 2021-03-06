import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {observable, action} from 'mobx';
import Grid from 'react-bootstrap/lib/Grid';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import EssentialRow from './Essential/EssentialRow'
import ExtrasModal from './Essential/ExtrasModal'

@inject('shipStore')
@observer
export default class ExtrasView extends Component {
  @observable showModal = false;
  @observable modalIdx = undefined;
  @observable show = true;

  @action displayModal = (idx) => {
    this.showModal = true;
    this.modalIdx = idx;
  }

  @action clearModal = () => {
    this.showModal = false;
  }

  render() {
    return (
      <React.Fragment>
          <Row>
            <Panel bsStyle="info" expanded={this.show} onToggle>
              <Panel.Heading onClick={()=> this.show = !this.show}>
                <Panel.Title>
                  <Grid>
                    <Row>Supplementary Components</Row>
                  </Grid>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <ListGroup bsClass='list-group-flush'>
                  {this.props.shipStore.extras.map((_,idx)=>
                    <EssentialRow
                      accessor={e=>e.extras[idx]}
                      qualityAccessor={store=>store.extrasInternal[idx].quality}
                      key={this.props.shipStore.getKeyList('extrasInternal')[idx]}
                      onClick={()=>this.displayModal(idx)} />)}
                </ListGroup>
              </Panel.Collapse>
            </Panel>
          </Row>
      <ExtrasModal show={this.showModal} idx={this.modalIdx} hide={this.clearModal} />
      </React.Fragment>
      );
  }
}
