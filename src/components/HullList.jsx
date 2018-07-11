import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer} from 'mobx-react';
import {Modal, Button, Panel, ListGroup, ListGroupItem, Glyphicon, Col, Row} from 'react-bootstrap';

@observer
export default class HullList extends Component {
  constructor(props) {
    super(props);
    this.updateHull = this.updateHull.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.state = {
      selected: props.shipStore.hull,
      open: hullList.reduce((acc, cur) => {
        acc[cur.class] = cur.class === props.shipStore.hull.class
        return acc
      }, {})
    }
  }

  toggleOpen(className) {
    this.setState((state, props) => {
      let open = {};
      open[className] = !state.open[className]
      return(
        {open}
        )
    })
  }

  updateHull() {
    this.props.shipStore.hull = this.state.selected;
    this.props.viewStore.chooseHull = false;
  }

  render() {
    console.log(this.state);
    return (
//<div className="modal-container">
  <Modal
    show={this.props.viewStore.chooseHull}
    onHide={()=>this.props.viewStore.chooseHull = false}
    bsSize="large">
    <Modal.Header closeButton>
      <Modal.Title>Choose hull</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {
      hullList.map(cls => {
        return(
        <Panel expanded={this.state.open[cls.class]} key={cls.class} onToggle>
          <Panel.Heading onClick={()=>this.toggleOpen(cls.class)}>
            <Panel.Title>
              {cls.class}
              <Glyphicon glyph={this.state.open[cls.class] ? 'chevron-down' : 'chevron-right'} className="pull-right"/>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            

              <ListGroup bsClass='list-group-flush'>
              {
                cls.hulls.map(hull => {
                  return(
                    <ListGroupItem
                      onClick={()=>this.setState({selected: hull})}
                      key={hull.name}
                      active={this.state.selected === hull}>
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
//</div>
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