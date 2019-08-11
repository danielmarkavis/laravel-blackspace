import {fn} from "./Functions";

export class Bot {
    constructor(empireID, homePlanet) {
        this.empireID = empireID;
        this.homePlanet = homePlanet;
    }

    /**
     *
     * @param fleets
     * @param empireFleets
     * @param astroID
     * @returns {boolean}
     */
    botCheckForNoAssignedFleets(fleets, empireFleets, astroID) {
        empireFleets.forEach( (fleetID) => {
            if (fleets.fleet[fleetID].target === astroID) {
                return true;
            }
        });
        return false;
    }

    /**
     *
     * @param universe
     * @param fleets
     * @param fleet
     * @param empireFleets
     * @returns {null}
     */
    botFindTarget(universe, fleets, fleet, empireFleets) {
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
            switch(fleet.path) {
                case 1:
                    distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y);
                    break;
                case 2:
                    distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y) + this.homePlanet.vector.getDistance(system.vector.x, system.vector.y);
                    break;
            }

            if (distance === 0) { // Ignore planet currently orbiting.
                continue;
            }
            if (currentDistance === null) {
                currentDistance = distance;
            }
            if (distance < currentDistance) {
                if (system.empireID !== this.empireID) {
                    // if (!this.botCheckForNoAssignedFleets(fleets, empireFleets, system.astroID)) {
                        currentDistance = distance;
                        target = system;
                    // }
                }
            }
        }
        return target;
    }

    /**
     *
     * @param universe
     * @param fleets
     * @param fleet
     * @param fleetID
     * @param empireFleets
     * @param time
     * @returns {boolean}
     */
    botLaunchFleet(universe, fleets, fleet, fleetID, empireFleets, time) {
        if (fleet.isHome()) {
            let target = this.botFindTarget(universe, fleets, fleet, empireFleets);
            if (target !== null) {
                fleet.launchFleet(target, time);
                return true;
            }
        }
        return false;
    }

}
