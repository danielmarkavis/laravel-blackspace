import {fn} from "./Functions";

export class Bot {
    constructor(empireID, homePlanet) {
        this.empireID = empireID;
        this.homePlanet = homePlanet;
    }

    /**
     *
     * @param empireTargets
     * @param astroID
     * @returns {boolean}
     */
    botHasTargeted(fleets, empireTargets, astroID) {
        let target = {'found': false, 'arrival': null};
        empireTargets.forEach((fleetID) => {
            if (fleets.getFleet(fleetID).target === astroID) {
                target = {'found': true, 'arrival': fleets.getFleet(fleetID).getArrivalTime()};
            }
        });
        return target;
    }

    /**
     *
     * @param universe
     * @param fleets
     * @param fleet
     * @param empireTargets
     * @returns {null}
     */
    botFindTarget(universe, fleets, fleet, empireTargets) {
        let target = null;
        let i = 0;
        let currentDistance = null;
        let starID = null;
        let system = null;
        let distance = null;
        while (i < Math.floor(universe.bodies.length / 3)) {
            i++;
            starID = fn.rand(universe.stars.length);
            system = universe.getStar(starID);
            switch (fleet.path) {
                case 1:
                    distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y);
                    break;
                case 2:
                    distance = fleet.locationVector.getDistance(system.vector.x, system.vector.y) + this.homePlanet.vector.getDistance(system.vector.x, system.vector.y);
                    break;
                case 3:
                    distance = this.homePlanet.vector.getDistance(system.vector.x, system.vector.y);
                    break;
            }
            if (distance === 0 || system.empireID === this.empireID) { // Ignore planet currently orbiting.
                continue;
            }
            if (currentDistance === null) {
                currentDistance = distance;
            }
            if (distance <= currentDistance) {
                let fleetArrival = fleet.getArrivalTime(fleet.locationVector.getDistance(system.vector.x, system.vector.y));
                let tar = this.botHasTargeted(fleets, empireTargets, system.astroID)
                if (!tar.found) {
                    currentDistance = distance;
                    target = system;
                }
                // if (tar.arrival !== null && tar.arrival && fleetArrival && fleetArrival < tar.arrival) {
                //     console.log('FA: '+fleetArrival+', TA: '+tar.arrival);
                //     currentDistance = distance;
                //     target = system;
                // }
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
    botLaunchFleet(universe, fleets, fleet, fleetID, empireTargets, time) {
        if (fleet.isHome()) {
            let target = this.botFindTarget(universe, fleets, fleet, empireTargets);
            if (target !== null) {
                fleet.launchFleet(target, time);
                return true;
            }
        }
        return false;
    }

}
