import React, { Component } from 'react';
import {ListGroupItem, Grid, Col, Row} from 'react-bootstrap';
import injectSheet from 'react-jss';

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  }
}

@injectSheet(styles)
export default class WeaponRow extends Component {
  render() {
    const classes = this.props.classes
    return (
      <ListGroupItem
        onClick={this.props.onClick}
        >
        <Grid>
          {this.props.item === undefined ?
            <Row>
              <Col xs={3}>
                <div className={classes.emptyComp}>{"No Weapon Selected"}</div>
              </Col>
            </Row> :
            <Row>
              <Col xs={3}>
                <div className={classes.comp}>{this.props.item.name}</div>
              </Col>
              <Col xs={9} >
                <Row>
                  <Col xs={4}>
                    <span className={classes.compItem}>Power: </span>
                    <span className={classes.compItemVal}>{this.props.item.power < 0 ? `${-this.props.item.power} Generated` : this.props.item.power}</span></Col>
                  <Col xs={4}>
                    <span className={classes.compItem}>Space: </span>
                    <span className={classes.compItemVal}>{this.props.item.space}</span>
                  </Col>
                  <Col xs={4}>
                    <span className={classes.compItem}>Cost: </span>
                    <span className={classes.compItemVal}>{this.props.item.cost}</span>
                  </Col>
                </Row>
                {this.props.item.misc !== "-" ? this.props.item.misc : ''}
              </Col>
            </Row>
          }
        </Grid>
      </ListGroupItem>
    );
  }
}
