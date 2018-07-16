import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {ListGroupItem, Grid, Col, Row} from 'react-bootstrap';
import injectSheet from 'react-jss';

const styles = {
  title: {
    'text-transform': "capitalize"
  }
}

@injectSheet(styles)
@inject('shipStore')
@observer
export default class EssentialRow extends Component {
  render() {
    const item = this.props.shipStore[this.props.comp]
    return (
      <ListGroupItem
        onClick={this.props.onClick}
        >
        <Grid>
          {item.name === undefined ?
            <Row><Col xs={5} className="border-right border-primary"><Row><h3>{"No Component Selected"}</h3><span className={this.props.classes.title}>{this.props.comp}</span></Row></Col></Row> :
            <Row>
              <Col xs={5} className="border-right border-primary"><Row><h3>{item.name}</h3><span className={this.props.classes.title}>{this.props.comp}</span></Row></Col>
              <Col xs={7} >
                <Row>
                  <Col xs={4}><Row>Power: <b>{item.power < 0 ? `${-item.power} Generated` : item.power}</b></Row></Col>
                  <Col xs={4}><Row>Space: <b>{item.space}</b></Row></Col>
                  <Col xs={4}><Row>Cost: <b>{item.cost}</b></Row></Col>
                </Row>
                <Row>{item.misc !== "-" ? item.misc : ''}</Row>
              </Col>
            </Row>
          }
        </Grid>
      </ListGroupItem>
    );
  }
}
