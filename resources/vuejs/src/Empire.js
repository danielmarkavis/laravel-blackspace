import {Vector} from './Vector.js';
import {Fleet} from './Fleet.js';
import {fn} from './Functions.js';

class Empire {

    constructor(empireID, name) {
        this.name = name || 'Empire ' + fn.rand(10000) + 1;
        this.empireID = empireID;
        this.astroOwned = [];
        this.fleets = [];
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
    botFindTargetClosest(universe, fleet) {
        let target = null;
        let i = 0;
        let currentDistance = null;
        while(i < 100) {
            i++;
            let planetID = fn.rand(universe.stars.length);
            let system = universe.getStar(planetID);
            let distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y);
            if (currentDistance === null) {
                currentDistance = distance;
            }
            if (system.owner !== this.empireID) {
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
            if (system.owner !== this.empireID) {
                target = system;
            }
        }
        return target;
    }

    botLaunchFleet(universe, fleets, time) {
        this.fleets.forEach( (fleetID) => {
            if (fleets.fleet[fleetID].isHome()) {
                let target = this.botFindTargetClosest(universe, fleets.fleet[fleetID]);
                if (target && fleets.fleet[fleetID].location !== target.astroID) {
                    fleets.fleet[fleetID].launchFleet(target.astroID, target, time);
                }
            }
        });

    }

    tick(universe, fleets, time) {
        this.botLaunchFleet(universe, fleets, time);
    }
}

export {Empire};
