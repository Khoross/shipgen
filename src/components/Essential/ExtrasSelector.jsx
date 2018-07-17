import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {ListGroupItem, Col, Row} from 'react-bootstrap';
import extrasList from '~/static/extras.json';


@inject('shipStore')
@observer
export default class ExtrasSelector extends Component {
  render() {
    if(this.props.idx === undefined){
      return(
          <ListGroupItem onClick={this.props.onClick}>
              <Col xs={3} ><Row><h2>Remove component</h2></Row></Col>
          </ListGroupItem>
        )
    }
    const item = extrasList[this.props.idx]
    return (
      <ListGroupItem
        onClick={this.props.onClick}
        active={this.props.shipStore.extrasInternal[this.props.slot].idx === this.props.idx}>
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
