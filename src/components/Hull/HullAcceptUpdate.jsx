import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import {Button} from 'react-bootstrap';

@inject('hullViewStore')
@inject('shipStore')
@observer
export default class HullAcceptUpdate extends Component {
  render() {
    return (
      <Button bsStyle="primary" onClick={
        ()=>{
          this.props.shipStore.changeHull(
            this.props.hullViewStore.selected.hullIdx,
            this.props.hullViewStore.selected.hullClassIdx
          )
          this.props.hullViewStore.resetState(
            this.props.hullViewStore.selected.hullIdx,
            this.props.hullViewStore.selected.hullClassIdx
          )
          this.props.hide()
        }
      }>Save new hull</Button>
    );
  }
}
