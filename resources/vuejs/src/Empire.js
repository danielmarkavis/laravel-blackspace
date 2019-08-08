import {Bot} from './Bot.js';
import {fn} from './Functions.js';

class Empire {

    constructor(empireID, homePlanet, name) {
        this.name = name || 'Empire ' + fn.rand(10000) + 1;
        this.empireID = empireID;
        this.astroOwned = {};
        this.fleets = [];
        this.maxFleets = 20;
        this.homePlanet = homePlanet;
        this.bot = new Bot(empireID,homePlanet);
        this.currentTargets = [];
    }

    createFleet(fleets, target) {
        let fleetID = fleets.addFleet(target.astroID, target.vector.x, target.vector.y, this.empireID);
        this.fleets.push(fleetID);
    }

    xpCheck(universe, fleets, fleet) {
        if (fleet.xp >= fleet.maxXP) {
            fleet.xp = 0;
            if (fleet.rank < fleet.maxRank) {
                fleet.rank++;
            }

            if (this.fleets.length <= this.maxFleets) {
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
            targets.push(fleetID);
        });

        return targets;
    }

    checkHomePlanet(universe) {
        if (this.homePlanet.empireID !== this.empireID) {
            let newHomePlanetID = fn.rand(this.astroOwned.length-1);
            console.log(newHomePlanetID);
            console.log(this.astroOwned);
            console.log(this.astroOwned[newHomePlanetID]);
            this.homePlanet = universe.getAstro(this.astroOwned[newHomePlanetID]);
            console.log(this.homePlanet);
            console.log(this.name+' has moved home planet');
        }
    }

    addSystem(systemID) {
        this.astroOwned['s'+systemID] = true;
    }

    removeSystem(systemID) {
        delete this.astroOwned['s'+systemID];
    }

    tick(universe, fleets, time) {
        // this.checkHomePlanet(universe);

        this.currentTargets = this.getCurrentTargets();
        this.fleets.forEach( (fleetID) => {
            if (fn.rand(100) < 15) {
                let launched = this.bot.botLaunchFleet(universe, fleets, fleets.fleet[fleetID], fleetID, this.currentTargets, time);
                if (launched) {
                    this.currentTargets = this.getCurrentTargets();
                }
            }
            this.xpCheck(universe, fleets, fleets.fleet[fleetID]);
            this.battleCheck(universe, fleets, fleets.fleet[fleetID]);
        });
    }

    draw(canvas, universe, offset) {
        let length = Object.keys(this.astroOwned).length / universe.bodies.length;
        canvas.fillRect(5, 5+(offset*10), 600 * length, 5, fn.getEmpireColor(this.empireID));
    }
}

export {Empire};
