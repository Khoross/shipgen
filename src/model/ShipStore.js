import {observable, computed, action} from 'mobx';
import hullList from '~/static/hulls.json';

function undefAdd(accessor = d=>d, ...objs){
    console.log(objs)
    return objs.reduce(
        (acc, cur) => acc + (cur === undefined ? 0 : accessor(cur))
        , 0)
}

class ShipDetails {

}

export class ShipStore {
    @observable name = undefined;
    @observable.ref hull = undefined;
    @observable.shallow components =
        {
            augur: undefined,
            bridge: undefined,
            crew: undefined,
            gellar: undefined,
            life: undefined,
            plasma: undefined,
            shields: undefined,
            warp: undefined
        };
    @observable.shallow extras = [undefined];

    weapons = observable(
        {
            prow: [],
            dorsal: [],
            keel: [],
            port: [],
            starboard: []
        },
        {
            prow: observable.shallow,
            dorsal: observable.shallow,
            keel: observable.shallow,
            port: observable.shallow,
            starboard: observable.shallow
        }
    )

    generateComponentList() {
        return [
            ...Object.values(this.components),
            ...this.extras,
            ...[].concat(Object.values(this.weapons))
        ]

    }

    @computed get hullName() {
        return this.hull !== undefined ?
            `${this.hull.name} class ${this.hull.class}` :
            'No hull selected'
    }

    @computed get spaceUsed() {
        return undefAdd(d=>d.space, ...this.generateComponentList())
    }

    @computed get pointsUsed() {
        return undefAdd(d=>d.cost, this.hull, ...this.generateComponentList())
    }

    @computed get powerTotal() {
        return undefAdd(d=>Math.max(d.power, 0),
            ...this.generateComponentList())
    }

    @computed get powerUsed() {
        return undefAdd(d=>Math.min(d.power, 0),
            ...this.generateComponentList())
    }

    @action changeHull = (newHull) => {
        if(newHull !== this.hull) {
            this.hull = newHull;
            this.components.augur = undefined;
            this.components.bridge = undefined;
            this.components.crew = undefined;
            this.components.gellar = undefined;
            this.components.life = undefined;
            this.components.plasma = undefined;
            this.components.shields = undefined;
            this.components.warp = undefined;
            this.extras = [undefined];
            this.weapons.prow = Array(this.hull.prow);
            this.weapons.dorsal = Array(this.hull.dorsal);
            this.weapons.keel = Array(this.hull.keel);
            this.weapons.port = Array(this.hull.port);
            this.weapons.starboard = Array(this.hull.starboard);
        }
    }
}