import React, { Component } from 'react';
import {observer} from'mobx-react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
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
      <div
        className='list-group-item'
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
      </div>
    );
  }
}
