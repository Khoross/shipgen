import React, { Component } from 'react';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import injectSheet from 'react-jss';
import DisplayQuality from '~/components/DisplayQuality';

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  }
}

@injectSheet(styles)
export default class WeaponDisplay extends Component {
  render() {
    const classes = this.props.classes;
    const item = this.props.item;
    return (
      <Row>
        <Col xs={3}>
          {this.props.qualityAccessor !== undefined ?
            <DisplayQuality qualityAccessor={this.props.qualityAccessor} item={this.props.item} qualType="weap"/> :
            <div className={classes.comp}>{`${item.quality} quality ${item.name}`}</div>}
        </Col>
        <Col xs={9}>
          <Row>
            <Col xs={3}>
              <span className={classes.compItem}>Power: </span>
              <span className={classes.compItemVal}>{item.power < 0 ? `${-item.power} Generated` : item.power}</span></Col>
            <Col xs={3}>
              <span className={classes.compItem}>Space: </span>
              <span className={classes.compItemVal}>{item.space}</span>
            </Col>
            <Col xs={3}>
              <span className={classes.compItem}>Cost: </span>
              <span className={classes.compItemVal}>{item.cost}</span>
            </Col>
            <Col xs={3}>
              <span className={classes.compItem}>Type: </span>
              <span className={classes.compItemVal}>{item.type}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <span className={classes.compItem}>Damage: </span>
              <span className={classes.compItemVal}>{item.dam}</span>
            </Col>
            <Col xs={3}>
              <span className={classes.compItem}>Strength: </span>
              <span className={classes.compItemVal}>{item.strength}</span>
            </Col>
            <Col xs={3}>
              <span className={classes.compItem}>Crit rating: </span>
              <span className={classes.compItemVal}>{item.crit}</span>
            </Col>
            <Col xs={3}>
              <span className={classes.compItem}>Range: </span>
              <span className={classes.compItemVal}>{
                isNaN(item.range) ? item.range :
                `${item.range/2}/${item.range}/${item.range*2}`
              }</span>
            </Col>
          </Row>
          {item.misc !== "-" ? item.misc : ''}
        </Col>
      </Row>
    );
  }
}
