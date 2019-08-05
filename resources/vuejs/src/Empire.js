import {Vector} from './Vector.js';
import {Fleet} from './Fleet.js';
import {fn} from './Functions.js';

class Empire {

    constructor(empireID, homePlanet, name) {
        this.name = name || 'Empire ' + fn.rand(10000) + 1;
        this.empireID = empireID;
        this.astroOwned = [];
        this.fleets = [];
        this.maxFleets = 10;
        this.homePlanet = homePlanet;
    }

    createFleet(fleets, astroID, target) {
        let fleetID = fleets.addFleet(astroID, target.x, target.y, this.empireID);
        this.fleets.push(fleetID);
    }

    update() {
    }


    /**
     *
     * @param universe
     * @param fleet
     * @returns {null}
     */
    botFindTargetClosestHomePlanet(universe, fleet) {
        let target = null;
        let i = 0;
        let currentDistance = null;
        let starID = null;
        let system = null;
        let distance = null;
        while(i < 100) {
            i++;
            starID = fn.rand(universe.stars.length);
            system = universe.getStar(starID);
            // console.log(system);
            distance = this.homePlanet.vector.getDistance(system.vector.x, system.vector.y);
            if (currentDistance === null) {
                currentDistance = distance;
            }
            if (system.empireID !== this.empireID) {
                if (distance < currentDistance && distance !== 0) {
                    target = system;
                    currentDistance = distance;
                }
            }
        }
        return target;
    }

    /**
     *
     * @param universe
     * @param fleet
     * @returns {null}
     */
    botFindTargetClosest(universe, fleet) {
        let i = 0;
        let currentDistance = null;
        let starID = null;
        let target = null;
        let system = null;
        let distance = null;
        while(i < 100) {
            i++;
            starID = fn.rand(universe.stars.length);
            system = universe.getStar(starID);
            distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y);
            if (currentDistance === null) {
                currentDistance = distance;
            }
            if (system.empireID !== this.empireID) {
                if (distance < currentDistance) {
                    target = system;
                    currentDistance = distance;
                }
            }
        }
        return target;
    }

    /**
     * Target star, if:
     * Target is not me
     * @param universe
     * @returns {null}
     */
    botFindTarget(universe) {
        let target = null;
        let i = 0;
        while((target === null) && (i < (universe.bodies.length)*2)) {
            i++;
            let planetID = fn.rand(universe.stars.length);
            let system = universe.getStar(planetID);
            if (system.empireID !== this.empireID) {
                target = system;
            }
        }
        return target;
    }

    botLaunchFleet(universe, fleets, time) {
        this.fleets.forEach( (fleetID) => {
            if (fleets.fleet[fleetID].isHome()) {
                let target = this.botFindTargetClosestHomePlanet(universe, fleets.fleet[fleetID]);
                if (target !== null) {
                    fleets.fleet[fleetID].launchFleet(target.astroID, target, time);
                }
            }
        });
    }

    xpCheck(universe, fleets, time) {
        if (this.fleets.length >= this.maxFleets) {
            return;
        }
        this.fleets.forEach( (fleetID) => {
            if (fleets.fleet[fleetID].xp > 1000) {
                fleets.fleet[fleetID].xp = 0;
                this.createFleet(fleets, this.homePlanet.astroID, this.homePlanet.vector);
            }
        });
    }

    tick(universe, fleets, time) {
        this.botLaunchFleet(universe, fleets, time);
        this.xpCheck(universe, fleets, time);
    }
}

export {Empire};
