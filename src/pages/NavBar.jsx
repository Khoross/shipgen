import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import Row from 'react-bootstrap/lib/Row';
import {observer, inject} from 'mobx-react';
import injectSheet from 'react-jss';

const styles = {
  navbarOverride: {
    marginBottom: '0px'
  }
}

@injectSheet(styles)
@inject('routingStore')
@observer
export default class NavBar extends Component {
  render() {
    return (
      <Row>
        <Navbar className={this.props.classes.navbarOverride}>
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
