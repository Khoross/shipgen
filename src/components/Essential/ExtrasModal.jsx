import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {observable, action} from 'mobx';
import {Modal, ListGroup} from 'react-bootstrap';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import ExtrasSelector from './ExtrasSelector'


const styles = {
  title: {
    'text-transform': "capitalize"
  }
}


@injectSheet(styles)
@inject('shipStore')
@observer
export default class ExtrasModal extends Component {
  render() {
    return (
        <Modal
          show={this.props.show}
          onHide={()=>{
              this.props.hide();
            }}
          bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>{`Choose Component`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
            {
              this.props.shipStore.extrasIdxList.map(e => {
                return(
                  <ExtrasSelector
                    key={e!==undefined?e:-1}
                    idx={e}
                    slot={this.props.idx}
                    onClick={()=>{
                      this.props.hide()
                      this.props.shipStore.changeExtras(e, {idx: 1, choiceIdx: []}, this.props.idx)
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