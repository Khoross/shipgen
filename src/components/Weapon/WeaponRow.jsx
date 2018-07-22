import React, { Component } from 'react';
import {observer} from'mobx-react';
import {ListGroupItem, Grid, Col, Row} from 'react-bootstrap';
import injectSheet from 'react-jss';
import WeaponDisplay from './WeaponDisplay';

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  }
}

@injectSheet(styles)
@observer
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
            <WeaponDisplay item={this.props.item} qualityAccessor={this.props.qualityAccessor} />
          }
        </Grid>
      </ListGroupItem>
    );
  }
}
