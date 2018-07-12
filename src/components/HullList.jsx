import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import {Modal, Button, Panel, ListGroup, ListGroupItem, Glyphicon, Col, Row} from 'react-bootstrap';

@observer
export default class HullList extends Component {
  @observable.ref selected = undefined;
  @observable open = {};

  constructor(props) {
    super(props);
    this.updateHull = this.updateHull.bind(this);
    this.resetState(props.shipStore)
  }

  updateHull() {
    this.props.shipStore.changeHull(this.selected);
    this.props.viewStore.chooseHull = false;
    this.resetState(this.props.shipStore)
  }

  @action resetState(store) {
    this.selected = store.hull,
    this.open = hullList.reduce((acc, cur) => {
        acc[cur.class] = store.hull !== undefined && (cur.class === store.hull.class)
        return acc
      }, {})
  }

  render() {
    return (
      <Modal
        show={this.props.viewStore.chooseHull}
        onHide={()=>{
            this.resetState(this.props.shipStore);
            this.props.viewStore.chooseHull = false;
          }}
        bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Choose hull</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          hullList.map(cls => {
            return(
            <Panel expanded={this.open[cls.class]} key={cls.class} onToggle>
              <Panel.Heading onClick={()=>{this.open[cls.class] = !this.open[cls.class]}}>
                <Panel.Title>
                  {cls.class}
                  <Glyphicon glyph={this.open[cls.class] ? 'chevron-down' : 'chevron-right'} className="pull-right"/>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                

                  <ListGroup bsClass='list-group-flush'>
                  {
                    cls.hulls.map(hull => {
                      return(
                        <ListGroupItem
                          onClick={()=>this.selected = hull}
                          key={hull.name}
                          active={this.selected === hull}>
                            <Col xs={3} ><Row><h1>{hull.name}</h1></Row></Col>
                            <Col xs={9} >
                              <Row>
                                <div className="d-flex flex-row p-2 justify-content-between">
                                  <div>
                                    <span>Speed: </span>
                                    <span>{hull.speed}</span>
                                  </div>
                                  <div>
                                    <span>Manoeuvrability: </span>
                                    <span>{hull.man}</span>
                                  </div>
                                  <div>
                                    <span>Detection: </span>
                                    <span>{}</span>
                                  </div>
                                  <div>
                                    <span></span>
                                    <span>{}</span>
                                  </div>
                                  <div>
                                    <span></span>
                                    <span>{}</span>
                                  </div>
                                </div>
                              </Row>
                              <Row>
                                
                              </Row>
                              <Row>{hull.misc !== "-" ? hull.misc : ''}</Row>
                            </Col>
                        </ListGroupItem>
                        )
                    })
                  }
                  </ListGroup>

                
              </Panel.Collapse>
            </Panel>
          )
          })
        }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>this.props.viewStore.chooseHull = false}>Close</Button>
          <Button bsStyle="primary" onClick={this.updateHull}>Save new hull</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

//<div className="row">
  //{hullList.map(
    //e =>
      //<ul key={e.class}>
        //{e.hulls.map(h =>
          //<li key={h.name} onClick={() => this.props.shipStore.hull = h}>{h.name}</li>
          //)
        //}
      //</ul>
    //)
  //}
//</div>