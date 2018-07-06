import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer} from 'mobx-react'

console.log(hullList)

@observer
export default class HullList extends Component {
  render() {
    return (
      <div className="row">
        {hullList.map(
          e =>
            <ul key={e.class}>
              {e.hulls.map(h =>
                <li key={h.name} onClick={() => this.props.shipStore.hull = h}>{h.name}</li>
                )
              }
            </ul>
          )
        }
      </div>
    );
  }
}
