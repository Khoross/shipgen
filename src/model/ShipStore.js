import {observable, computed} from 'mobx';
import hullList from '~/static/hulls.json';

console.log(hullList)

export class ShipStore {
    @observable name = '';
    @observable hullClass = undefined;
    @observable hull = undefined;

    @computed get hulldets() {
        return this.hull !== undefined && this.hullClass !== undefined ?
            hullList[this.hullClass][this.hull] : {}
    }
}