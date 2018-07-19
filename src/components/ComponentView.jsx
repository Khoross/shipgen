import React, { Component } from 'react';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import {Grid, ListGroup, ListGroupItem, Row, Panel} from 'react-bootstrap';
import EssentialRow from './Essential/EssentialRow'
import EssentialModal from './Essential/EssentialModal'

@inject('shipStore')
@observer
export default class ComponentView extends Component {
  @observable showModal = false;
  @observable modalComp = undefined;
  @observable show = true;

  @action displayModal = (comp) => {
    this.showModal = true;
    this.modalComp = comp;
  }

  @action clearModal = () => {
    this.showModal = false;
    this.modalComp = undefined;
  }

  render() {
    return (
      <React.Fragment>
          <Row>
            <Panel bsStyle="info" expanded={this.show} onToggle>
              <Panel.Heading onClick={()=>this.show = !this.show}>
                <Panel.Title>
                  <Grid>
                    <Row>Essential Components</Row>
                  </Grid>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <ListGroup bsClass='list-group-flush'>
                  {['plasma', 'shields', 'bridge', 'crew', 'life', 'augur', 'gellar', 'warp'].map(
                    comp => <EssentialRow accessor={e=>e[comp]} comp={comp} key={comp} onClick={()=>this.displayModal(comp)} />)}
                </ListGroup>
              </Panel.Collapse>
            </Panel>
          </Row>
      <EssentialModal show={this.showModal} comp={this.modalComp} hide={this.clearModal} />
      </React.Fragment>
      );
  }
}
