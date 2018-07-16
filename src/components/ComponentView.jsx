import React, { Component } from 'react';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import {Grid, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import EssentialRow from './Essential/EssentialRow'
import EssentialModal from './Essential/EssentialModal'

@inject('shipStore')
@observer
export default class ComponentView extends Component {
  @observable showModal = false;
  @observable modalComp = undefined;

  @action displayModal = (comp) => {
    console.log(comp)
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
        <Grid fluid={true}>
          <Row>
            <ListGroup>
              <ListGroupItem bsStyle="info">
                <Grid>
                  <Row>Essential Components</Row>
                </Grid>
              </ListGroupItem>
              {['plasma', 'shields', 'bridge', 'crew', 'life', 'augur', 'gellar', 'warp'].map(
                comp => <EssentialRow accessor={e=>e[comp]} key={comp} onClick={()=>this.displayModal(comp)} />)}
            </ListGroup>
          </Row>
        </Grid>
      </Row>
      <EssentialModal show={this.showModal} comp={this.modalComp} hide={this.clearModal} />
      </React.Fragment>
      );
  }
}
