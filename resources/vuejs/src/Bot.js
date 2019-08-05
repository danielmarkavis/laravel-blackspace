import {fn} from "./Functions";

class Bot {
    constructor(empireID, homePlanet) {
        this.empireID = empireID;
        this.homePlanet = homePlanet;
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
            distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y) + this.homePlanet.vector.getDistance(system.vector.x, system.vector.y);
            if (distance === 0) { // Ignore planet currently orbiting.
                continue;
            }
            if (currentDistance === null) {
                currentDistance = distance;
            }
            if (distance < currentDistance) {
                if (system.empireID !== this.empireID) {
                    currentDistance = distance;
                    target = system;
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
    // botFindTargetClosest(universe, fleet) {
    //     let i = 0;
    //     let currentDistance = null;
    //     let starID = null;
    //     let target = null;
    //     let system = null;
    //     let distance = null;
    //     while(i < 100) {
    //         i++;
    //         starID = fn.rand(universe.stars.length);
    //         system = universe.getStar(starID);
    //         distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y);
    //         if (currentDistance === null) {
    //             currentDistance = distance;
    //         }
    //         if (system.empireID !== this.empireID) {
    //             if (distance < currentDistance) {
    //                 target = system;
    //                 currentDistance = distance;
    //             }
    //         }
    //     }
    //     return target;
    // }

    /**
     * Target star, if:
     * Target is not me
     * @param universe
     * @returns {null}
     */
    // botFindTarget(universe) {
    //     let target = null;
    //     let i = 0;
    //     while((target === null) && (i < (universe.bodies.length)*2)) {
    //         i++;
    //         let planetID = fn.rand(universe.stars.length);
    //         let system = universe.getStar(planetID);
    //         if (system.empireID !== this.empireID) {
    //             target = system;
    //         }
    //     }
    //     return target;
    // }

    /**
     *
     * @param universe
     * @param fleets
     * @param fleetIndexes
     * @param time
     */
    botLaunchFleet(universe, fleets, fleetIndexes, time) {
        fleetIndexes.forEach( (fleetID) => {
            if (fleets.fleet[fleetID].isHome()) {
                let target = this.botFindTargetClosestHomePlanet(universe, fleets.fleet[fleetID]);
                if (target !== null) {
                    fleets.fleet[fleetID].launchFleet(target.astroID, target, time);
                }
            }
        });
    }

}

export { Bot };
