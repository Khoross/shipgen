import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import DisplayQuality from '~/components/DisplayQuality'
import injectSheet from 'react-jss';

const styles = {
  title: {
    textTransform: "capitalize",
    textAlign: "right"
  },
  compRow: {
    backgroundColor: (props)=>{
      const item = props.accessor(props.shipStore)
      if(item===undefined){
        return 'transparent'
      }
      return item.origin === "Archaeo" ?
        "powderblue" :
      item.origin === "Xeno" ?
        "lightcoral" :
        "transparent"
    }
  }
}

@inject('shipStore')
@injectSheet(styles)
@observer
export default class EssentialRow extends Component {
  render() {
    const item = this.props.accessor(this.props.shipStore)
    const classes = this.props.classes
    return (
      <div
        className='list-group-item'
        onClick={this.props.onClick}
        >
        <Grid>
          {item === undefined ?
            <Row>
              <Col xs={3}>
                <div className={classes.emptyComp}>{"No Component Selected"}</div>
                <div className={classes.title}>{this.props.comp}</div>
              </Col>
            </Row> :
            <Row className={classes.compRow}>
              <Col xs={3}>
                <DisplayQuality item={item} qualityAccessor={this.props.qualityAccessor} qualType="comp"/>
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
      </div>
    );
  }
}
