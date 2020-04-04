import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import augurList from '~/static/augur.json';
import bridgeList from '~/static/bridge.json';
import crewList from '~/static/crew.json';
import gellarList from '~/static/gellar.json';
import lifeList from '~/static/life.json';
import plasmaList from '~/static/plasma.json';
import shieldsList from '~/static/shields.json';
import warpList from '~/static/warp.json';
import injectSheet from 'react-jss';

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

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  },
  compRow: {
    backgroundColor: (props)=>{
      const item = compList[props.comp][props.idx]
      return item.origin === "Archaeo" ?
        "powderblue" :
      item.origin === "Xeno" ?
        "lightcoral" :
        "white"
    }
  }
}

@injectSheet(styles)
@inject('shipStore')
@observer
export default class EssentialSelector extends Component {
  render() {
    const item = compList[this.props.comp][this.props.idx]
    return (
      <ListGroupItem
        onClick={this.props.onClick}
        active={this.props.shipStore[`${this.props.comp}Internal`].idx === this.props.idx}
        className={this.props.classes.compRow}>
          <Col xs={3} ><Row>{item.name}</Row></Col>
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
