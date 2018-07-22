import React, { Component } from 'react';
import {action} from 'mobx';
import {observer, inject} from 'mobx-react';
import qualityWeapon from '~/static/qualityWeapon.json'
import qualityComponent from '~/static/qualityComponent.json'
import injectSheet from 'react-jss';

const qualityObj={weap: qualityWeapon, comp: qualityComponent}

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  }
}

@injectSheet(styles)
@inject('shipStore')
@observer
export default class DisplayQuality extends Component {
  render() {
    const classes = this.props.classes
    const qualStore = this.props.qualityAccessor(this.props.shipStore)
    const quality=qualityObj[this.props.qualType]
    return (
      <React.Fragment>
        <div className={classes.comp}>
          <select
            value={qualStore.idx}
            onClick={(e)=>{e.stopPropagation()}}
            onChange={action((e)=>{
              qualStore.idx = parseInt(e.target.value)
              qualStore.choiceIdx = Array(quality[e.target.value].choices).fill(undefined)
            })}>
            {quality.map(
              (e, idx)=>
              <option
                value={idx}
                key={idx}>
                {e.name}
              </option>
              )}
          </select>
          {` quality ${this.props.item.name}`}
        </div>
        {qualStore.choiceIdx.map((val, idx)=>{
          console.log(qualStore.choiceIdx)
          console.log(qualStore.idx)
          console.log(quality[qualStore.idx].bonusOptions)
          return  <select
                    value={val}
                    key={idx}
                    onClick={(e)=>{e.stopPropagation()}}
                    onChange={(e)=>qualStore.choiceIdx[idx] = parseInt(e.target.value)}
                  >
                    <option style={{display: 'none'}} />
                    {quality[qualStore.idx].bonusOptions.map((opt, optIdx)=>
                        <option
                          key={optIdx}
                          value={optIdx}>
                          {opt.name}
                        </option>
                      )}
                  </select>}
          )}
      </React.Fragment>
    );
  }
}
