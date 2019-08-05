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

    createFleet(fleets, astroID, target) {
        let fleetID = fleets.addFleet(astroID, target.x, target.y, this.empireID);
        this.fleets.push(fleetID);
    }

    update() {
    }

    xpCheck(universe, fleets, time) {
        this.fleets.forEach( (fleetID) => {
            if (fleets.fleet[fleetID].xp > 1000) {
                fleets.fleet[fleetID].xp = 0;
                if (fleets.fleet[fleetID].rank < fleets.fleet[fleetID].maxRank) {
                    fleets.fleet[fleetID].rank++;
                }

                // fleets.fleet[fleetID].speed += 1000;
                if (this.fleets.length <= this.maxFleets) {
                    this.createFleet(fleets, this.homePlanet.astroID, this.homePlanet.vector);
                }
            }
        });
    }

    tick(universe, fleets, time) {
        this.bot.botLaunchFleet(universe, fleets, this.fleets, time);
        this.xpCheck(universe, fleets, time);
    }
}

export {Empire};
