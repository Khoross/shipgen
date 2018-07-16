import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {ListGroupItem, Col, Row} from 'react-bootstrap';
import augurList from '~/static/augur.json';
import bridgeList from '~/static/bridge.json';
import crewList from '~/static/crew.json';
import gellarList from '~/static/gellar.json';
import lifeList from '~/static/life.json';
import plasmaList from '~/static/plasma.json';
import shieldsList from '~/static/shields.json';
import warpList from '~/static/warp.json';

const compList = {
  augur: augurList,
  bridge: bridgeList,
  crew: crewList,
  gellar: gellarList,
  life: lifeList,
  plasma: plasmaList,
  shields: shieldsList,
  warp: warpList
};

@inject('shipStore')
@observer
export default class EssentialSelector extends Component {
  render() {
    const item = compList[this.props.comp][this.props.idx]
    return (
      <ListGroupItem
        onClick={this.props.onClick}
        active={this.props.shipStore[`${this.props.comp}Internal`].idx === this.props.idx}>
          <Col xs={3} ><Row><h2>{item.name}</h2></Row></Col>
          <Col xs={9} >
            <Row>
              <Col xs={4}><Row>Power: <b>{item.power < 0 ? `${-item.power} Generated` : item.power}</b></Row></Col>
              <Col xs={4}><Row>Space: <b>{item.space}</b></Row></Col>
              <Col xs={4}><Row>Cost: <b>{item.cost}</b></Row></Col>
            </Row>
            <Row>{item.misc !== "-" ? item.misc : ''}</Row>
          </Col>
      </ListGroupItem>
    );
  }
}
