import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import {Modal, Button, Panel, ListGroup, ListGroupItem, Glyphicon, Col, Row} from 'react-bootstrap';
import HullClassSelector from './Hull/HullClassSelector'
import HullAcceptUpdate from './Hull/HullAcceptUpdate'



@inject('hullViewStore')
@inject('shipStore')
@observer
export default class HullList extends Component {
  render() {
    return (
        <Modal
          show={this.props.show}
          onHide={()=>{
              this.props.hide();
            }}
          bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Choose hull</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {
            hullList.map((_, clsIdx) => {
              return(
                <HullClassSelector key={clsIdx} idx={clsIdx} />
              )
            })
          }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hide}>Close</Button>
            <HullAcceptUpdate hide={this.props.hide}/>
          </Modal.Footer>
        </Modal>
    );
  }
}

