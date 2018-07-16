import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer, inject, Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import {Panel, ListGroup, Glyphicon} from 'react-bootstrap';
import HullSelector from './HullSelector'

@inject('hullViewStore')
@observer
export default class HullClassSelector extends Component {
  render() {
    return (
      <Panel expanded={this.props.hullViewStore.open[this.props.idx]} onToggle>
        <Panel.Heading onClick={()=>this.props.hullViewStore.toggleOpen(this.props.idx)}>
          <Panel.Title>
            {hullList[this.props.idx].class}
            <Glyphicon glyph={this.props.hullViewStore.open[this.props.idx] ? 'chevron-down' : 'chevron-right'} className="pull-right"/>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          

            <ListGroup bsClass='list-group-flush'>
            {
              hullList[this.props.idx].hulls.map((_, hullIdx) => {
                return(
                  <HullSelector key={hullIdx} hullIdx={hullIdx} classIdx={this.props.idx}/>
                  )
              })
            }
            </ListGroup>

          
        </Panel.Collapse>
      </Panel>
    );
  }
}
