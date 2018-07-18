import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import HullList from './HullList';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import {Row, Col} from 'react-bootstrap';

const styles = {
  header: {
    position: 'sticky',
  },
  nohull: {
  },
  nameInput: {
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    fontSize: '36px'
  }
}



class HullViewStore {
  @observable selected = {hullIdx: undefined, hullClassIdx: undefined};
  @observable selectedArr = hullList.map((cls)=>cls.hulls.map(_=>false));
  @observable open = hullList.map(()=>false);
  @observable showHullModal = false

  @action.bound setVisible(bool) {
      this.showHullModal = bool
  }
  @action.bound resetState(oldHullIdx, oldClassIdx) {
    this.selected = {hullIdx: oldHullIdx, hullClassIdx: oldClassIdx};
    this.open = hullList.map((_, idx)=>idx===oldClassIdx)
  }
  @action.bound toggleOpen(idx) {
    this.open[idx] = !this.open[idx]
  }
  @action.bound setSelected(newHullIdx, newClassIdx) {
    if(this.selected.hullClassIdx !== undefined && this.selected.hullIdx !== undefined) {
      this.selectedArr[this.selected.hullClassIdx][this.selected.hullIdx] = false;
    }
    this.selectedArr[newClassIdx][newHullIdx] = true;
    this.selected = {hullIdx: newHullIdx, hullClassIdx: newClassIdx};
  }
}

const hullViewStore = new HullViewStore();

@injectSheet(styles)
@inject('shipStore')
@observer
export default class ShipHeader extends Component {
  render() {
    const store = this.props.shipStore
    return (
      <React.Fragment>
        <div
          className={classNames({
            row: true,
            [this.props.classes.header]: true,
            [this.props.classes.nohull]: store.hull === undefined,
          })}
          onClick={(e)=>{
            if(e.target !== this.nameBox) {
              hullViewStore.resetState(store.hullIdx, store.hullClassIdx)
              hullViewStore.setVisible(true)
            }
          }}
        >
          <div className="container">
            <div className="col">
              <input
                className={classNames("form-control", this.props.classes.nameInput)}
                value={store.name}
                onChange={(e)=>store.name = e.target.value}
                placeholder={"The Unnamed"}
                ref={(elem)=>this.nameBox = elem}
              />
              <h1>{store.hullName}</h1>
            </div>
            {
            store.hull !== undefined &&
            <div className="col">
              <Row>
                <Col xs={4}><Row>Speed: <b>{store.hull.speed}</b></Row></Col>
                <Col xs={4}><Row>Manoeuvrability: <b>{store.hull.man}</b></Row></Col>
                <Col xs={4}><Row>Detection: <b>{store.hull.detection}</b></Row></Col>
              </Row>
              <Row>
                <Col xs={4}><Row>Hull Points: <b>{store.hull.hits}</b></Row></Col>
                <Col xs={4}><Row>Armour: <b>{store.hull.armour}</b></Row></Col>
                <Col xs={4}><Row>Turret Rating: <b>{store.hull.turret}</b></Row></Col>
              </Row>
              <Row>
                <Col xs={4}><Row>Space: <b>{`${store.spaceUsed}/${store.hull.space}`}</b></Row></Col>
                <Col xs={4}><Row>Power: <b>{`${store.powerUsed}/${store.powerGenerated}`}</b></Row></Col>
                <Col xs={4}><Row>Total Cost: <b>{`${store.pointsUsed}`}</b></Row></Col>
              </Row>
              <Row>
                <Col xs={8}><Row>Xenotech Components: <b>{store.hull.xenosCount}</b></Row></Col>
                <Col xs={4}><Row>Archaeotech Components: <b>{store.hull.archaeoCount}</b></Row></Col>
              </Row>
            </div>
            }
          </div>
        </div>
        <Provider hullViewStore={hullViewStore}>
          <HullList show={hullViewStore.showHullModal} hide={()=>hullViewStore.setVisible(false)}/>
        </Provider>
      </React.Fragment>
      );
  }
}
