import React, { Component } from 'react';
import {observer} from 'mobx-react'

@observer
export default class ShipHeader extends Component {
    render() {
        return (
            <div
                className={this.props.store.hull === undefined ? "row nohull" : "row"}
                onClick={(e)=>{if(e.target !== this.nameBox) {this.props.viewStore.chooseHull=true}}}
            >
                <div className="col">
                    <input
                        style={{
                            border: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                            fontSize: "36px"
                        }}
                        className="form-control"
                        value={this.props.store.name}
                        onChange={(e)=>this.props.store.name = e.target.value}
                        placeholder={"The Unnamed"}
                        ref={(elem)=>this.nameBox = elem}
                    />
                    <h1>{this.props.store.hullName}</h1>

                </div>
                <div className="col">
                    <span>{this.props.store.pointsUsed}</span>
                </div>
            </div>
        );
    }
}
