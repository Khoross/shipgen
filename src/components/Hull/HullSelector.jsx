import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import {ListGroupItem, Col, Row} from 'react-bootstrap';

@inject('hullViewStore')
@observer
export default class HullSelector extends Component {
  render() {
    const hull = hullList[this.props.classIdx].hulls[this.props.hullIdx];
    const weaponString = [
      {name: 'Prow', count: hull.prow},
      {name: 'Dorsal', count: hull.dorsal},
      {name: 'Port', count: hull.port},
      {name: 'Starboard', count: hull.star},
      {name: 'Keel', count: hull.keel}
    ].filter(e=>e.count>0)
      .reduce((acc, cur)=>`${acc} ${cur.count} ${cur.name},`, "Weapon Slots:")
      .replace(/,$/, '')
      .replace(/,(?=[^,]*$)/, ' and');
    return (
      <ListGroupItem
        onClick={()=>this.props.hullViewStore.setSelected(this.props.hullIdx, this.props.classIdx)}
        active={this.props.hullViewStore.selectedArr[this.props.classIdx][this.props.hullIdx]}>
          <Col xs={3} ><Row>{hull.name}</Row></Col>
          <Col xs={9} >
            <Row>
              <Col xs={4}><Row>Speed: <b>{hull.speed}</b></Row></Col>
              <Col xs={4}><Row>Manoeuvrability: <b>{hull.man}</b></Row></Col>
              <Col xs={4}><Row>Detection: <b>{hull.detection}</b></Row></Col>
            </Row>
            <Row>
              <Col xs={4}><Row>Hull Points: <b>{hull.hits}</b></Row></Col>
              <Col xs={4}><Row>Armour: <b>{hull.armour}</b></Row></Col>
              <Col xs={4}><Row>Turret Rating: <b>{hull.turret}</b></Row></Col>
            </Row>
            <Row>
              <Col xs={8}><Row>Space: <b>{hull.space}</b></Row></Col>
              <Col xs={4}><Row>Cost: <b>{hull.cost}</b></Row></Col>
            </Row>
            <Row>
              {weaponString}
            </Row>
            <Row>{hull.misc !== "-" ? hull.misc : ''}</Row>
          </Col>
      </ListGroupItem>
    );
  }
}
