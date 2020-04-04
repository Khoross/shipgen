import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Modal from 'react-bootstrap/lib/Modal';
import injectSheet from 'react-jss';
import EssentialSelector from './EssentialSelector'


const styles = {
  title: {
    'text-transform': "capitalize"
  }
}


@injectSheet(styles)
@inject('shipStore')
@observer
export default class EssentialModal extends Component {
  @observable selected = undefined
  render() {
    return (
        <Modal
          show={this.props.show}
          onHide={()=>{
              this.props.hide();
            }}
          bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title className={this.props.classes.title}>{`Choose ${this.props.comp}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
            {
              this.props.comp !== undefined && this.props.shipStore.compIdxLists[this.props.comp].map(e => {
                return(
                  <EssentialSelector
                    key={e}
                    idx={e}
                    comp={this.props.comp}
                    onClick={()=>{
                      this.props.hide()
                      this.props.shipStore[`${this.props.comp}Internal`] =
                        {idx: e, quality: {idx: 1, choiceIdx: []}}
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