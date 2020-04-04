import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import injectSheet from 'react-jss';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import WeaponRow from './WeaponRow'
import classNames from 'classnames';

const styles = {
  title: {
    textTransform: "capitalize",
    backgroundColor: "#dff0d8",
    borderColor: "#dff0d8",
    color: "#3c763d"
  }
}

@injectSheet(styles)
@inject('shipStore')
@observer
class WeaponList extends Component {
  render() {
    if(this.props.shipStore[this.props.slot] !== undefined && this.props.shipStore[this.props.slot].length > 0) {
    return (
      <React.Fragment>
        <div className={classNames(this.props.classes.title, "container")}>
          {this.props.slot}
        </div>
        <ListGroup>
          {
          this.props.shipStore[this.props.slot].map((e, i)=>{
            return(
              <WeaponRow
                item={e}
                key={i}
                onClick={()=>this.props.onClick(i)}
                qualityAccessor={(store)=>store[`${this.props.slot}Internal`][i].quality} />
            )
          })
          }
        </ListGroup>
      </React.Fragment>
    );
  } else {
    return null
  }
  }
};

WeaponList.propTypes = {
  slot: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

WeaponList.defaultProps = {
  
};

export default WeaponList