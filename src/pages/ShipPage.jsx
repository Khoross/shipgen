import React, { Component } from 'react';
import ComponentView from '~/components/ComponentView';
import WeaponsView from '~/components/WeaponsView';
import ExtrasView from '~/components/ExtrasView';
import BackgroundView from '~/components/BackgroundView';

export default class ShipPage extends Component {
  render() {
    return (
      <React.Fragment>
        <ComponentView />
        <WeaponsView />
        <ExtrasView />
        <BackgroundView />
      </React.Fragment>
    );
  }
}
