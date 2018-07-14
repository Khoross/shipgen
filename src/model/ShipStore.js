import {observable, computed, action} from 'mobx';
import hullList from '~/static/hulls.json';
import augurList from '~/static/augur.json';
import bridgeList from '~/static/bridge.json';
import crewList from '~/static/crew.json';
import extrasList from '~/static/extras.json';
import gellarList from '~/static/gellar.json';
import lifeList from '~/static/life.json';
import plasmaList from '~/static/plasma.json';
import shieldsList from '~/static/shields.json';
import warpList from '~/static/warp.json';
import weaponsList from '~/static/weapons.json';

function undefAdd(accessor = d=>d, ...objs){
    console.log(objs)
    return objs.reduce(
        (acc, cur) => acc + (cur === undefined ? 0 : accessor(cur))
        , 0)
}

/**
 * structure of a quality vector:
 * 
 */

export class ShipStore {
    @observable name = undefined;
    @observable hullClassIdx = undefined;
    @observable hullIdx = undefined;

    @observable augurInternal = {idx: undefined, quality: undefined};
    @observable bridgeInternal = {idx: undefined, quality: undefined};
    @observable crewInternal = {idx: undefined, quality: undefined};
    @observable gellarInternal = {idx: undefined, quality: undefined};
    @observable lifeInternal = {idx: undefined, quality: undefined};
    @observable plasmaInternal = {idx: undefined, quality: undefined};
    @observable shieldsInternal = {idx: undefined, quality: undefined};
    @observable warpInternal = {idx: undefined, quality: undefined};

    @observable extrasInternal = [{idx: undefined, quality: undefined}];

    @observable prowInternal = [];
    @observable dorsalInternal = [];
    @observable keelInternal = [];
    @observable portInternal = [];
    @observable starboardInternal = [];

    /**
     * Generate a new component with quality modifiers applied
     * @param  {object} component Original component
     * @param  {object} quality   quality object - should have a cost and a number of other keys
     * @return {object}           New component with stats updated
     */
    applyQuality(component, quality) {
        let qualCopy = Object.assign({}, quality);
        if("powergen" in qualCopy) {
            if(component.power > 0) {
                qualCopy.power = qualCopy.power + qualCopy.powergen
            }
            delete qualCopy.powergen
        }
        let compCopy = Object.assign({}, component);
        for (let key in qualCopy){
            //can't bring things below 1
            //can't bring power above -1
            //if property is 0, and not power, can make positive but not negative
            //for simplicity, will switch power to have negative is good (as with everything else)
            if(compCopy[key] > 0) {
                compCopy[key] = Math.max(1, compCopy[key] + qualCopy[key])
            } else if(key === 'power' && compCopy[key] < 0) {
                compCopy[key] = Math.min(-1, compCopy[key] + qualCopy[key])
            } else {

            }
        }
    }

    @computed get hull() {
        return this.hullClassIdx !== undefined && this.hullIdx !== undefined ? hullList[this.hullClassIdx].hulls[this.hullIdx] : undefined;
    }
    @computed get hullClass() {
        return this.hullClassIdx !== undefined ? hullList[this.hullClassIdx] : undefined;
    }
    @computed get augur() {
        if(this.augurInternal === undefined) {
            return undefined
        }
        return Object.assign({}, augurList[this.augurInternal])
        return this.augurInternal === undefined ? undefined : augurList[this.augurInternal];
    }
    @computed get bridge() {
        if(this.bridgeInternal === undefined) {
            return undefined
        }
        return Object.assign({}, bridgeList[this.bridgeInternal])
        return this.bridgeInternal === undefined ? undefined : bridgeList[this.bridgeInternal];
    }
    @computed get crew() {
        if(this.crewInternal === undefined) {
            return undefined
        }
        return Object.assign({}, crewList[this.crewInternal])
        return this.crewInternal === undefined ? undefined : crewList[this.crewInternal];
    }
    @computed get gellar() {
        if(this.gellarInternal === undefined) {
            return undefined
        }
        return Object.assign({}, gellarList[this.gellarInternal])
        return this.gellarInternal === undefined ? undefined : gellarList[this.gellarInternal];
    }
    @computed get life() {
        if(this.lifeInternal === undefined) {
            return undefined
        }
        return Object.assign({}, lifeList[this.lifeInternal])
        return this.lifeInternal === undefined ? undefined : lifeList[this.lifeInternal];
    }
    @computed get plasma() {
        if(this.plasmaInternal === undefined) {
            return undefined
        }
        return Object.assign({}, plasmaList[this.plasmaInternal])
        return this.plasmaInternal === undefined ? undefined : plasmaList[this.plasmaInternal];
    }
    @computed get shields() {
        if(this.shieldsInternal === undefined) {
            return undefined
        }
        return Object.assign({}, shieldsList[this.shieldsInternal])
        return this.shieldsInternal === undefined ? undefined : shieldsList[this.shieldsInternal];
    }
    @computed get warp() {
        if(this.warpInternal === undefined) {
            return undefined
        }
        return Object.assign({}, warpList[this.warpInternal])
        return this.warpInternal === undefined ? undefined : warpList[this.warpInternal];
    }
    @computed get extras() {
        return this.extrasInternal.map(e=>e === undefined ? undefined : extrasList[e]);
    }
    @computed get prow() {
        return this.prowInternal.map(e=>e === undefined ? undefined : weaponsList[e]);
    }
    @computed get dorsal() {
        return this.dorsalInternal.map(e=>e === undefined ? undefined : weaponsList[e]);
    }
    @computed get keel() {
        return this.keelInternal.map(e=>e === undefined ? undefined : weaponsList[e]);
    }
    @computed get port() {
        return this.portInternal.map(e=>e === undefined ? undefined : weaponsList[e]);
    }
    @computed get starboard() {
        return this.starboardInternal.map(e=>e === undefined ? undefined : weaponsList[e]);
    }



    generateComponentList() {
        return []
    }

    @computed get hullName() {
        return this.hull !== undefined ?
            `${this.hull.name} class ${this.hullClass.class}` :
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

    @action changeHull = (newHullClassIdx, newHullIdx) => {
        if(newHullClassIdx !== this.hullClassIdx || newHullIdx !== this.hullIdx) {
            this.hullClassIdx = newHullClassIdx;
            this.hullIdx = newHullIdx;
            this.augurIdx = undefined;
            this.bridgeIdx = undefined;
            this.crewIdx = undefined;
            this.gellarIdx = undefined;
            this.lifeIdx = undefined;
            this.plasmaIdx = undefined;
            this.shieldsIdx = undefined;
            this.warpIdx = undefined;
            this.extrasIdx = [undefined];
            this.prowIdx = Array(hullList[newHullClassIdx].hulls[newHullIdx].prow);
            this.dorsalIdx = Array(hullList[newHullClassIdx].hulls[newHullIdx].dorsal);
            this.keelIdx = Array(hullList[newHullClassIdx].hulls[newHullIdx].keel);
            this.portIdx = Array(hullList[newHullClassIdx].hulls[newHullIdx].port);
            this.starboardIdx = Array(hullList[newHullClassIdx].hulls[newHullIdx].starboard);
        }
    }
}