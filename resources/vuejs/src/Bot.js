import {fn} from "./Functions";

class Bot {
    constructor(empireID, homePlanet) {
        this.empireID = empireID;
        this.homePlanet = homePlanet;
    }

    /**
     *
     * @param universe
     * @param fleets
     * @param fleet
     * @param empireFleets
     * @returns {null}
     */
    botFindTargetClosestHomePlanet(universe, fleets, fleet, empireFleets) {
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
    botFindTargetClosestFleet(universe, fleet, empireFleets) {
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
            distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y);
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
     * @param fleet
     * @param time
     */
    botLaunchFleet(universe, fleets, fleet, empireFleets, time) {
        if (fleet.isHome()) {
            let target = null;
            switch(fleet.path) {
                case 1:
                    target = this.botFindTargetClosestHomePlanet(universe, fleets, fleet, empireFleets);
                    break;
                case 2:
                    target = this.botFindTargetClosestFleet(universe, fleets, fleet, empireFleets);
                    break;
            }
            if (target !== null) {
                fleet.launchFleet(target.astroID, target, time);
            }
        }
    }

}

export { Bot };
