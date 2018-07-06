import {observable, computed} from 'mobx';
import hullList from '~/static/hulls.json';

console.log(hullList)

export class ShipStore {
    @observable name = undefined;
    @observable hull = undefined;

    @computed get hullName() {
        return this.hull !== undefined ?
            `${this.hull.name} class ${this.hull.class}` : 'No hull selected'
    }
}