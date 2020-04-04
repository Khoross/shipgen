import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import weaponsList from '~/static/weapons.json';
import WeaponDisplay from './WeaponDisplay';


@inject('shipStore')
@observer
export default class WeaponSelector extends Component {
  render() {
    if(this.props.idx === undefined){
      return(
          <ListGroupItem onClick={this.props.onClick}>
              <Col xs={3} ><Row>Remove weapon</Row></Col>
          </ListGroupItem>
        )
    }
    const item = weaponsList[this.props.idx]
    item.quality="Common"
    return (
      <ListGroupItem
        onClick={this.props.onClick}
        active={this.props.shipStore[this.props.slot][`${this.props.ownIdx}Internal`] !== undefined && this.props.shipStore[this.props.slot][`${this.props.ownIdx}Internal`].idx === this.props.idx}>
          <WeaponDisplay item={item} />
      </ListGroupItem>
    );
  }
}
