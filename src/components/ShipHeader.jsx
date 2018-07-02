import React, { Component } from 'react';
import {observer} from 'mobx-react'

@observer
export default class ShipHeader extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <input
                        style={{border: 'none', outline: 'none', "box-shadow": 'none'}}
                        className="form-control"
                        value={this.props.store.name}
                        onChange={(e)=>this.props.store.name = e.target.value}
                    />
                </div>
            </div>
        );
    }
}
