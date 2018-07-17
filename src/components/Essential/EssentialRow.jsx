import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {ListGroupItem, Grid, Col, Row} from 'react-bootstrap';
import injectSheet from 'react-jss';

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  }
}

@injectSheet(styles)
@inject('shipStore')
@observer
export default class EssentialRow extends Component {
  render() {
    const item = this.props.accessor(this.props.shipStore)
    const classes = this.props.classes
    return (
      <ListGroupItem
        onClick={this.props.onClick}
        >
        <Grid>
          {item.name === undefined ?
            <Row>
              <Col xs={3}>
                <div className={classes.emptyComp}>{"No Component Selected"}</div>
                <div className={classes.title}>{this.props.comp}</div>
              </Col>
            </Row> :
            <Row>
              <Col xs={3}>
                <div className={classes.comp}>{item.name}</div>
                <div className={classes.title}>{this.props.comp}</div>
              </Col>
              <Col xs={9} >
                <Row>
                  <Col xs={4}>
                    <span className={classes.compItem}>Power: </span>
                    <span className={classes.compItemVal}>{item.power < 0 ? `${-item.power} Generated` : item.power}</span></Col>
                  <Col xs={4}>
                    <span className={classes.compItem}>Space: </span>
                    <span className={classes.compItemVal}>{item.space}</span>
                  </Col>
                  <Col xs={4}>
                    <span className={classes.compItem}>Cost: </span>
                    <span className={classes.compItemVal}>{item.cost}</span>
                  </Col>
                </Row>
                {item.misc !== "-" ? item.misc : ''}
              </Col>
            </Row>
          }
        </Grid>
      </ListGroupItem>
    );
  }
}
