import React, { Component } from 'react';
import hullList from '~/static/hulls.json';
import {observer} from 'mobx-react';
import {Modal, Button, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

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
  <Modal show={this.props.viewStore.chooseHull} onHide={()=>this.props.viewStore.chooseHull = false} >
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
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>

              <ListGroup>
              {
                cls.hulls.map(hull => {
                  return(
                    <ListGroupItem onClick={()=>this.setState({selected: hull})} key={hull.name}>
                      {hull.name}
                    </ListGroupItem>
                    )
                })
              }
              </ListGroup>

            </Panel.Body>
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