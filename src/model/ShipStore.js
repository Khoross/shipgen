import {observable, computed} from 'mobx';
import hullList from '~/static/hulls.json';

export class ShipStore {
    @observable name = undefined;
    @observable.ref hull = hullList[0].hulls[0];
    @observable components = {
        augur: undefined,
        bridge: undefined,
        crew: undefined,
        gellar: undefined,
        life: undefined,
        plasma: undefined,
        shields: undefined,
        warp: undefined,
        extras: [],
        weapons: {
            prow: [],
            dorsal: [],
            keel: [],
            port: [],
            starboard: []
        }
    }

    @computed get hullName() {
        return this.hull !== undefined ?
            `${this.hull.name} class ${this.hull.class}` : 'No hull selected'
    }
}