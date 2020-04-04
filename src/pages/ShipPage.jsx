import React, { Component } from 'react';
import ComponentView from '~/components/ComponentView';
import WeaponsView from '~/components/WeaponsView';
import ExtrasView from '~/components/ExtrasView';
import BackgroundView from '~/components/BackgroundView';
import injectSheet from 'react-jss';

const styles = {
}

@injectSheet(styles)
export default class ShipPage extends Component {
  render() {
    return (
      <div className={this.props.classes.grouping}>
        <ComponentView />
        <WeaponsView />
        <ExtrasView />
        <BackgroundView />
      </div>
    );
  }
}
