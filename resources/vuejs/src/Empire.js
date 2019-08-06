import {Bot} from './Bot.js';
import {fn} from './Functions.js';

class Empire {

    constructor(empireID, homePlanet, name) {
        this.name = name || 'Empire ' + fn.rand(10000) + 1;
        this.empireID = empireID;
        this.astroOwned = [];
        this.fleets = [];
        this.maxFleets = 50;
        this.homePlanet = homePlanet;
        this.bot = new Bot(empireID,homePlanet);
    }

    createFleet(fleets, target) {
        let fleetID = fleets.addFleet(target.astroID, target.vector.x, target.vector.y, this.empireID);
        this.fleets.push(fleetID);
    }

    update() {
    }

    xpCheck(universe, fleets, fleet) {
        if (fleet.xp >= fleet.maxXP) {
            fleet.xp = 0;
            if (fleet.rank < fleet.maxRank) {
                fleet.rank++;
            }

            if (this.fleets.length <= this.maxFleets) {
                this.createFleet(fleets, this.homePlanet);
                if (this.homePlanet.empireID === this.empireID) {
                    this.createFleet(fleets, this.homePlanet);
                } else {
                    let system = universe.getAstro(fleet.location);
                    this.createFleet(fleets, system);
                }
            }
        }
    }

    battleCheck(universe, fleets, fleet) {
        if (fleet.hp <= 0) {
            fleet.resetFleet(fleets, this.homePlanet);
        }
    }

    getCurrentTargets() {
        let targets = [];
        this.fleets.forEach( (fleetID) => {
            targets.push();
        });
        return targets;
    }

    tick(universe, fleets, time) {
        let currentTargets = this.getCurrentTargets();
        this.fleets.forEach( (fleetID) => {
            if (fn.rand(100) < 15) {
                this.bot.botLaunchFleet(universe, fleets, fleets.fleet[fleetID], currentTargets, time);
            }
            this.xpCheck(universe, fleets, fleets.fleet[fleetID]);
            this.battleCheck(universe, fleets, fleets.fleet[fleetID]);
        });
    }
}

export {Empire};
