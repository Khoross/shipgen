import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import HullList from './HullList';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const styles = {
  header: {
  },
  nohull: {
  },
  nameInput: {
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    fontSize: '36px',
    marginTop: '20px'
  },
  hullItem: {

  },
  hullItemVal: {
    fontWeight: 'bold'
  },
  hullItemValOver: {
    extend: 'hullItemVal',
    color: 'red'
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
    const classes = this.props.classes
    return (
      <React.Fragment>
        <div
          className={classNames({
            row: true,
            [this.props.classes.header]: true,
            [this.props.classes.nohull]: store.hull === undefined,
          })}
          onClick={(e)=>{
            hullViewStore.resetState(store.hullIdx, store.hullClassIdx)
            hullViewStore.setVisible(true)
          }}
        >
          <div className="container">
            <div className="col">
              <input
                className={classNames("form-control", classes.nameInput)}
                value={store.name}
                onClick={(e)=>{
                  e.stopPropagation();
                }}
                onChange={(e)=>{
                  store.name = e.target.value;
                }}
                placeholder={"The Unnamed"}
              />
              <h1>{store.hullName}</h1>
            </div>
            {
            store.hull !== undefined &&
            <div className="col">
              <Row>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Speed: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.hull.speed}
                  </span>
                </Row></Col>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Manoeuvrability: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.hull.man}
                  </span>
                </Row></Col>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Detection: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.hull.detection}
                  </span>
                </Row></Col>
              </Row>
              <Row>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Hull Points: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.hull.hits}
                  </span>
                </Row></Col>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Armour: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.hull.armour}
                  </span>
                </Row></Col>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Turret Rating: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.hull.turret}
                  </span>
                </Row></Col>
              </Row>
              <Row>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Space: 
                  </span>
                  <span className={store.spaceUsed<=store.hull.space?classes.hullItemVal:classes.hullItemValOver}>
                    {`${store.spaceUsed}/${store.hull.space}`}
                  </span>
                </Row></Col>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Power: 
                  </span>
                  <span className={store.powerUsed<=store.powerGenerated?classes.hullItemVal:classes.hullItemValOver}>
                    {`${store.powerUsed}/${store.powerGenerated}`}
                  </span>
                </Row></Col>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Total Cost: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {`${store.pointsUsed}`}
                  </span>
                </Row></Col>
              </Row>
              <Row>
                <Col xs={8}><Row>
                  <span className={classes.hullItem}>
                    Xenotech Components: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.xenosCount}
                  </span>
                </Row></Col>
                <Col xs={4}><Row>
                  <span className={classes.hullItem}>
                    Archaeotech Components: 
                  </span>
                  <span className={classes.hullItemVal}>
                    {store.archaeoCount}
                  </span>
                </Row></Col>
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
