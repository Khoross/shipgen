import React, { Component } from 'react';
import {Navbar, Nav, NavItem, Row} from 'react-bootstrap';
import {observer, inject} from 'mobx-react';

@inject('routingStore')
@observer
export default class NavBar extends Component {
  render() {
    return (
      <Row>
        <Navbar>
          <Nav
            activeKey={this.props.routingStore.location.pathname}
            onSelect={(key, event)=>{
              this.props.routingStore.push(key)
            }}>
            <NavItem eventKey="/">
              Ship Design
            </NavItem>
            <NavItem eventKey="/io/">
              Save/Load
            </NavItem>
          </Nav>
        </Navbar>
      </Row>
    );
  }
}
