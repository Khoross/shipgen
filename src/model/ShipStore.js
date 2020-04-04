import {observable, computed, action} from 'mobx';
import {createTransformer} from 'mobx-utils'
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
import compQuality from '~/static/qualityComponent.json';
import weapQuality from '~/static/qualityWeapon.json';
import backgroundList from '~/static/background.json';

const qualObj = {
    comp: compQuality,
    weap: weapQuality
}

function undefAdd(accessor = d=>d, ...objs){
    return objs.reduce(
        (acc, cur) => acc + (cur === undefined || accessor(cur) === undefined ? 0 : accessor(cur))
        , 0)
}

function rectify(comp) {
    if(comp === undefined) {
        return -100
    }
    return comp
}

function deepRectify(comp) {
    let out = Object.assign({}, comp)
    for (let key in out) {
        out[key] = rectify(out[key])
    }
    return out
}

function unrectify(comp) {
    if(comp === -100) {
        return undefined
    }
    return comp
}

function deepUnrectify(comp) {
    let out = Object.assign({}, comp)
    for (let key in out) {
        out[key] = unrectify(out[key])
    }
    return out
}

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

    @observable backgroundIdx = 0;

    @observable id = undefined;

    /**
     * Generate a new component with quality modifiers applied
     * @param  {object} component Original component
     * @param  {object} quality   quality object - should have a cost and a number of other keys
     * @return {object}           New component with stats updated
     */
    applyQuality(component, quality, qualType) {
        let qualCopy = quality === undefined ? {name: 'Common'} :
            Object.assign({name: qualObj[qualType][quality.idx].name},
                qualObj[qualType][quality.idx].fixed,
                ...quality.choiceIdx
                    .filter(e=>e!==undefined)
                    .map(e=>qualObj[qualType][quality.idx].bonusOptions[e].mod));
        if("powergen" in qualCopy) {
            if(component.power < 0) {
                qualCopy.power = qualCopy.power + qualCopy.powergen
            }
            delete qualCopy.powergen
        }
        let compCopy = Object.assign({}, component);
        for (let key in qualCopy){
            /**
             * can't bring things below 1 if power, space or cost
             * can't bring power above -1 (-1 - generates 1 power)
             * other things can go from negative to positive
             * if property is 0, space and power cannot decrease
             */
            if(key === "name") {
                compCopy.quality = qualCopy[key]
            } else if(compCopy[key] > 0 && (key === 'power' || key === 'space' || key === 'cost')) {
                compCopy[key] = Math.max(1, compCopy[key] + qualCopy[key])
            } else if(key === 'power' && compCopy[key] < 0) {
                compCopy[key] = Math.min(-1, compCopy[key] + qualCopy[key])
            } else if(key === 'power' || key === 'space' || key === 'cost') {
                compCopy[key] = Math.max(0, compCopy[key] + qualCopy[key])
            } else if(key in compCopy) {
                compCopy[key] += qualCopy[key]
            }
        }
        if('damMod' in compCopy && 'damDice' in compCopy) {
            compCopy.dam=`${compCopy.damDice}${compCopy.damMod<0?'':'+'}${compCopy.damMod!==0?compCopy.damMod:''}`
            delete compCopy.damDice
            delete compCopy.damMod
        }
        return compCopy
    }

    @computed get hull() {
        return this.hullClassIdx !== undefined && this.hullIdx !== undefined ? hullList[this.hullClassIdx].hulls[this.hullIdx] : undefined;
    }
    @computed get hullClass() {
        return this.hullClassIdx !== undefined ? hullList[this.hullClassIdx] : undefined;
    }

    @computed get background() {
        return backgroundList[this.backgroundIdx]
    }

    // getComp = createTransformer(name=>{
    //     if(this[name].idx === undefined) {
    //         return {}
    //     }
    //     return this.applyQuality(lists[name][this[name].idx], this[name].quality)
    //     }
    // )

    @computed get augur() {
        if(this.augurInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(augurList[this.augurInternal.idx], this.augurInternal.quality, 'comp')
    }
    @computed get bridge() {
        if(this.bridgeInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(bridgeList[this.bridgeInternal.idx], this.bridgeInternal.quality, 'comp')
    }
    @computed get crew() {
        if(this.crewInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(crewList[this.crewInternal.idx], this.crewInternal.quality, 'comp')
    }
    @computed get gellar() {
        if(this.gellarInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(gellarList[this.gellarInternal.idx], this.gellarInternal.quality, 'comp')
    }
    @computed get life() {
        if(this.lifeInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(lifeList[this.lifeInternal.idx], this.lifeInternal.quality, 'comp')
    }
    @computed get plasma() {
        if(this.plasmaInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(plasmaList[this.plasmaInternal.idx], this.plasmaInternal.quality, 'comp')
    }
    @computed get shields() {
        if(this.shieldsInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(shieldsList[this.shieldsInternal.idx], this.shieldsInternal.quality, 'comp')
    }
    @computed get warp() {
        if(this.warpInternal.idx === undefined) {
            return undefined
        }
        return this.applyQuality(warpList[this.warpInternal.idx], this.warpInternal.quality, 'comp')
    }
    @computed get extras() {
        return this.extrasInternal.map(
            e=>e.idx === undefined ?
                undefined :
                this.applyQuality(extrasList[e.idx], e.quality, 'comp')
        );
    }
    @computed get prow() {
        return this.prowInternal.map(
            e=>e.idx === undefined ?
                undefined :
                this.applyQuality(weaponsList[e.idx], e.quality, 'weap')
            );
    }
    @computed get dorsal() {
        return this.dorsalInternal.map(
            e=>e.idx === undefined ?
                undefined :
                this.applyQuality(weaponsList[e.idx], e.quality, 'weap')
            );
    }
    @computed get keel() {
        return this.keelInternal.map(
            e=>e.idx === undefined ?
                undefined :
                this.applyQuality(weaponsList[e.idx], e.quality, 'weap')
            );
    }
    @computed get port() {
        return this.portInternal.map(
            e=>e.idx === undefined ?
                undefined :
                this.applyQuality(weaponsList[e.idx], e.quality, 'weap')
            );
    }
    @computed get starboard() {
        return this.starboardInternal.map(
            e=>e.idx === undefined ?
                undefined :
                this.applyQuality(weaponsList[e.idx], e.quality, 'weap')
            );
    }

    getKeyList = createTransformer((compList) => {
        return this[compList].reduce((acc, cur) => {
            if(rectify(cur.idx) in acc.map) {
                acc.map[rectify(cur.idx)] += 1;
            } else {
                acc.map[rectify(cur.idx)] = 0;
            }
            acc.push(`${rectify(cur.idx)} - ${acc.map[rectify(cur.idx)]}`);
            return acc;
        }, [])
    })

    @computed get compIdxLists() {
        if(this.hullClass === undefined) {
            return {
            augur: [],
            bridge: [],
            crew: [],
            gellar: [],
            life: [],
            plasma: [],
            shields: [],
            warp: []
        }
        }
        return {
            augur: this.hullClass.augur,
            bridge: this.hullClass.bridge,
            crew: this.hullClass.crew,
            gellar: this.hullClass.gellar,
            life: this.hullClass.life,
            plasma: this.hullClass.plasma,
            shields: this.hullClass.shields,
            warp: this.hullClass.warp
        }
    }

    @computed get weapIdxLists() {
        if(this.hullClass === undefined) {
            return {
            prow: [],
            dorsal: [],
            keel: [],
            port: [],
            starboard: []
        }
        }
        return {
            prow: this.hullClass.prow.concat([undefined]),
            dorsal: this.hullClass.dorsal.concat([undefined]),
            keel: this.hullClass.keel.concat([undefined]),
            port: this.hullClass.side.concat([undefined]),
            starboard: this.hullClass.side.concat([undefined])
        }
    }

    @computed get forbiddenExtras() {
        return this.extrasInternal.map(e=>e.idx)
            .filter(e=>e!==undefined && extrasList[e].unique)
    }

    @computed get extrasIdxList() {
        if(this.hullClass === undefined) {
            return []
        }
        return this.hullClass.extras
            .filter(e=>!this.forbiddenExtras.includes(e))
            .concat([undefined])
    }

    generateComponentList() {
        return [this.augur,
            this.bridge,
            this.crew,
            this.gellar,
            this.life,
            this.plasma,
            this.shields,
            this.warp,
            ...this.extras,
            ...this.prow,
            ...this.dorsal,
            ...this.keel,
            ...this.port,
            ...this.starboard]
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
        return undefAdd(d=>d.cost, this.hull, ...this.generateComponentList(), this.background)
    }

    @computed get powerGenerated() {
        return -undefAdd(d=>Math.min(d.power, 0),
            ...this.generateComponentList(), this.hull)
    }

    @computed get powerUsed() {
        return undefAdd(d=>Math.max(d.power, 0),
            ...this.generateComponentList(), this.hull)
    }

    @computed get xenosCount() {
        return undefAdd(d=>d.origin === "Xeno",
            ...this.generateComponentList())
    }

    @computed get archaeoCount() {
        return undefAdd(d=>d.origin === "Archaeo",
            ...this.generateComponentList())
    }

    @action changeHull = (newHullIdx, newHullClassIdx) => {
        if(newHullClassIdx !== this.hullClassIdx || newHullIdx !== this.hullIdx) {
            this.hullClassIdx = newHullClassIdx;
            this.hullIdx = newHullIdx;
            this.augurInternal = {idx: undefined, quality: undefined};
            this.bridgeInternal = {idx: undefined, quality: undefined};
            this.crewInternal = {idx: undefined, quality: undefined};
            this.gellarInternal = {idx: undefined, quality: undefined};
            this.lifeInternal = {idx: undefined, quality: undefined};
            this.plasmaInternal = {idx: undefined, quality: undefined};
            this.shieldsInternal = {idx: undefined, quality: undefined};
            this.warpInternal = {idx: undefined, quality: undefined};
            this.extrasInternal = [{idx: undefined, quality: undefined}];
            this.prowInternal = Array(
                hullList[newHullClassIdx]
                    .hulls[newHullIdx]
                    .prow).fill({});
            this.dorsalInternal = Array(
                hullList[newHullClassIdx]
                    .hulls[newHullIdx]
                    .dorsal).fill({idx: undefined, quality: undefined});
            this.keelInternal = Array(
                hullList[newHullClassIdx]
                    .hulls[newHullIdx]
                    .keel).fill({idx: undefined, quality: undefined});
            this.portInternal = Array(
                hullList[newHullClassIdx]
                    .hulls[newHullIdx]
                    .port).fill({idx: undefined, quality: undefined});
            this.starboardInternal = Array(
                hullList[newHullClassIdx]
                    .hulls[newHullIdx]
                    .star).fill({idx: undefined, quality: undefined});
        }
    }

    @action changeExtras = (newExtraIdx, newExtraQuality, idx) => {
        if(newExtraIdx === undefined && this.extras[idx] !== undefined) {
            this.extrasInternal.remove(this.extrasInternal[idx])
        } else if(this.extras[idx] !== undefined) {
            this.extrasInternal[idx] = {idx: newExtraIdx, quality: newExtraQuality}
        } else {
            this.extrasInternal[idx] = {idx: newExtraIdx, quality: newExtraQuality}
            this.extrasInternal.push({})
        }
    }

    @computed get serialize() {
        return {
            name: rectify(this.name),
            hullClassIdx: rectify(this.hullClassIdx),
            hullIdx: rectify(this.hullIdx),
            augurInternal: deepRectify(this.augurInternal),
            bridgeInternal: deepRectify(this.bridgeInternal),
            crewInternal: deepRectify(this.crewInternal),
            gellarInternal: deepRectify(this.gellarInternal),
            lifeInternal: deepRectify(this.lifeInternal),
            plasmaInternal: deepRectify(this.plasmaInternal),
            shieldsInternal: deepRectify(this.shieldsInternal),
            warpInternal: deepRectify(this.warpInternal),
            extrasInternal: this.extrasInternal.map(e=>deepRectify(e)),
            prowInternal: this.prowInternal.map(e=>deepRectify(e)),
            dorsalInternal: this.dorsalInternal.map(e=>deepRectify(e)),
            keelInternal: this.keelInternal.map(e=>deepRectify(e)),
            portInternal: this.portInternal.map(e=>deepRectify(e)),
            starboardInternal: this.starboardInternal.map(e=>deepRectify(e)),
            backgroundIdx: this.backgroundIdx,
            id: this.id
        }
    }

    @action hydrate(payload) {
        this.name = unrectify(payload.name);
        this.hullClassIdx = unrectify(payload.hullClassIdx);
        this.hullIdx = unrectify(payload.hullIdx);
        this.augurInternal = deepUnrectify(payload.augurInternal);
        this.bridgeInternal = deepUnrectify(payload.bridgeInternal);
        this.crewInternal = deepUnrectify(payload.crewInternal);
        this.gellarInternal = deepUnrectify(payload.gellarInternal);
        this.lifeInternal = deepUnrectify(payload.lifeInternal);
        this.plasmaInternal = deepUnrectify(payload.plasmaInternal);
        this.shieldsInternal = deepUnrectify(payload.shieldsInternal);
        this.warpInternal = deepUnrectify(payload.warpInternal);
        this.extrasInternal = payload.extrasInternal.map(e=>deepUnrectify(e));
        this.prowInternal = payload.prowInternal.map(e=>deepUnrectify(e));
        this.dorsalInternal = payload.dorsalInternal.map(e=>deepUnrectify(e));
        this.keelInternal = payload.keelInternal.map(e=>deepUnrectify(e));
        this.portInternal = payload.portInternal.map(e=>deepUnrectify(e));
        this.starboardInternal = payload.starboardInternal.map(e=>deepUnrectify(e));
        this.id = payload.id;
        this.backgroundIdx = payload.backgroundIdx;
    }
}