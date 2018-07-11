import {observable, computed} from 'mobx';
import hullList from '~/static/hulls.json';

export class ShipStore {
    @observable name = undefined;
    @observable.ref hull = hullList[0].hulls[0];

    @computed get hullName() {
        return this.hull !== undefined ?
            `${this.hull.name} class ${this.hull.class}` : 'No hull selected'
    }
}