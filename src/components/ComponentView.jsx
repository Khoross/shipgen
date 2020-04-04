import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {observable, action} from 'mobx';
import Grid from 'react-bootstrap/lib/Grid';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import EssentialRow from './Essential/EssentialRow'
import EssentialModal from './Essential/EssentialModal'
import injectSheet from 'react-jss';

const styles = {
  noPad: {
    marginTop: "-20px"
  }
}

@injectSheet(styles)
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
          <Row className={this.props.classes.noPad}>
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
                    comp => <EssentialRow
                      accessor={e=>e[comp]}
                      qualityAccessor={(store)=>store[`${comp}Internal`].quality}
                      comp={comp}
                      key={comp}
                      onClick={()=>this.displayModal(comp)} />)}
                </ListGroup>
              </Panel.Collapse>
            </Panel>
          </Row>
      <EssentialModal show={this.showModal} comp={this.modalComp} hide={this.clearModal} />
      </React.Fragment>
      );
  }
}
