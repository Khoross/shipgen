import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import {Grid, Row, Panel} from 'react-bootstrap';
import WeaponList from './Weapon/WeaponList';
import WeaponModal from './Weapon/WeaponModal';

@inject('shipStore')
@observer
class WeaponsView extends Component {
  @observable showModal = false;
  @observable modalIdx = undefined;
  @observable modalSlot = undefined;
  @observable show = true;

  @action displayModal = (slot, idx) => {
    this.showModal = true;
    this.modalIdx = idx;
    this.modalSlot = slot;
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
              <Grid>
                <Panel.Title>
                  <Row>Weapons</Row>
                </Panel.Title>
              </Grid>
            </Panel.Heading>
            <Panel.Collapse>
              {['prow', 'dorsal', 'port', 'starboard', 'keel'].map(e=>
                <WeaponList key={e} slot={e} onClick={(idx)=>this.displayModal(e, idx)}/>)}
            </Panel.Collapse>
          </Panel>
        </Row>
        <WeaponModal show={this.showModal} hide={this.clearModal} idx={this.modalIdx} slot={this.modalSlot}/>
      </React.Fragment>
    );
  }
};

WeaponsView.propTypes = {
  
};

WeaponsView.defaultProps = {
  
};

export default WeaponsView