import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import HullList from './HullList';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = {
  header: {
    position: 'sticky',
  },
  nohull: {
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
    return (
      <React.Fragment>
        <div
          className={classNames({
            row: true,
            [this.props.classes.header]: true,
            [this.props.classes.nohull]: this.props.shipStore.hull === undefined,
          })}
          onClick={(e)=>{
            if(e.target !== this.nameBox) {
              hullViewStore.resetState(this.props.shipStore.hullIdx, this.props.shipStore.hullClassIdx)
              hullViewStore.setVisible(true)
            }
          }}
        >
          <div className="container">
            <div className="col">
              <input
                style={{
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  fontSize: "36px"
                }}
                className="form-control"
                value={this.props.shipStore.name}
                onChange={(e)=>this.props.shipStore.name = e.target.value}
                placeholder={"The Unnamed"}
                ref={(elem)=>this.nameBox = elem}
              />
              <h1>{this.props.shipStore.hullName}</h1>
            </div>
            <div className="col">
              <span>{this.props.shipStore.pointsUsed}</span>
            </div>
          </div>
        </div>
        <Provider hullViewStore={hullViewStore}>
          <HullList show={hullViewStore.showHullModal} hide={()=>hullViewStore.setVisible(false)}/>
        </Provider>
      </React.Fragment>
      );
  }
}
