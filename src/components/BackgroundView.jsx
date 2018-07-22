import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {observable, action} from 'mobx';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import injectSheet from 'react-jss';
import backgroundList from '~/static/background.json';

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  }
}

@injectSheet(styles)
@inject('shipStore')
@observer
export default class BackgroundView extends Component {
  @observable show=true;

  render() {
    const background = this.props.shipStore.background
    const classes = this.props.classes
    return (
        <Row>
          <Panel bsStyle="info" expanded={this.show} onToggle>
            <Panel.Heading onClick={()=> this.show = !this.show}>
              <Panel.Title>
                <Grid>
                  <Row>Expanded Backgrounds</Row>
                </Grid>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Grid>
                <Row>
                  <Col xs={3}>
                    <select
                      value={this.props.shipStore.backgroundIdx}
                      onChange={(e)=>this.props.shipStore.backgroundIdx = parseInt(e.target.value)}
                      className="form-control"
                    >
                      {backgroundList.map(
                        (e, idx)=><option value={idx}>{e.name}</option>
                        )}
                    </select>
                    <div>
                      <span className={classes.compItem}>Cost: </span>
                      <span className={classes.compItemVal}>{background.cost}</span>
                    </div>
                  </Col>
                  <Col xs={9}>{background.misc}</Col>
                </Row>
              </Grid>
            </Panel.Collapse>
          </Panel>
        </Row>
      );
  }
}
