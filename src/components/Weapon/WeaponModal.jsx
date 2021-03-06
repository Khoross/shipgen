import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import injectSheet from 'react-jss';
import WeaponSelector from './WeaponSelector'


const styles = {
  title: {
    'text-transform': "capitalize"
  }
}


@injectSheet(styles)
@inject('shipStore')
@observer
export default class WeaponModal extends Component {
  render() {
    if(this.props.slot === undefined){
      return null
    }
    return (
        <Modal
          show={this.props.show}
          onHide={()=>{
              this.props.hide();
            }}
          bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>{`Choose Weapon`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
            {
              this.props.shipStore.weapIdxLists[this.props.slot].map(e => {
                return(
                  <WeaponSelector
                    key={e!==undefined?e:-1}
                    idx={e}
                    slot={this.props.slot}
                    ownIdx={this.props.idx}
                    onClick={()=>{
                      this.props.hide()
                      this.props.shipStore[`${this.props.slot}Internal`][this.props.idx] =
                      e === undefined ? {} : {idx: e, quality: {idx: 1, choiceIdx: []}}
                  }}/>
                )
              })
            }
            </ListGroup>
          </Modal.Body>
        </Modal>
    );
  }
}