import {Bot} from './Bot.js';
import {fn} from './Functions.js';
import {Options} from './Options.js';

export class Empire {

    constructor(empireID, homePlanet, name) {
        this.name = name || 'Empire ' + fn.rand(10000) + 1;
        this.empireID = empireID;
        this.astroOwned = {};
        this.astroCount = 0;
        this.fleets = [];
        this.homePlanet = homePlanet;
        this.bot = new Bot(empireID, homePlanet);
        this.currentTargets = [];
        this.credits = Options.startCredits;
        this.alive = true;
    }

    createFleet(fleets, target, rank) {
        let fleetID = fleets.addFleet(target.astroID, target.vector.x, target.vector.y, this.empireID, rank || 1);
        this.fleets.push(fleetID);
    }

    buyFleet(universe, fleets) {
        if (this.credits >= Options.fleetCost) {
            if (this.fleets.length < Options.maxFleets || Options.maxFleets === -1) {
                if (this.homePlanet.empireID === this.empireID) {
                    let rank = Math.floor(this.credits / Options.fleetCost);
                    if (rank > Options.maxRank) {
                        rank = Options.maxRank;
                    }
                    this.credits -= (Options.fleetCost * rank);
                    this.createFleet(fleets, this.homePlanet, rank);
                }
                else {
                    let rank = 1;
                    this.credits -= (Options.fleetCost * rank);
                    this.createFleet(fleets, this.homePlanet, rank);
                }
            }
        }
    }

    killFleet(fleets, fleetID) {
        fleets.removeFleet(fleetID);
        this.removeFleet(fleetID);
    }

    removeFleet(currentFleetID) {
        this.fleets.forEach((fleetID,key)=> {
            if (fleetID === currentFleetID) {
                this.fleets.splice(key, 1); // Remove fleet id from empires fleet indices
            }
        });
    }

    getCurrentTargets(fleets) {
        let targets = [];
        this.fleets.forEach( (fleetID) => {
            targets.push(fleetID);
        });

        return targets;
    }

    checkHomePlanet(universe) {
        if (this.homePlanet.empireID !== this.empireID) {
            let newHomePlanetID = fn.rand(this.astroOwned.length-1);
            this.homePlanet = universe.getAstro(this.astroOwned[newHomePlanetID]);
        }
    }

    addSystem(universe, systemID) {
        this.astroOwned['s'+systemID] = true;
        this.astroCount += universe.getAstro(systemID).nodes.length + 1;
    }

    removeSystem(universe,systemID) {
        delete this.astroOwned['s'+systemID];
        this.astroCount -= universe.getAstro(systemID).nodes.length + 1;
    }

    getAstrosOwnedCount() {
        return Object.keys(this.astroOwned).length;
    }

    tick(universe, fleets, ticker) {
        // this.checkHomePlanet(universe);

        if (!this.alive || (this.fleets.length === 0 && this.getAstrosOwnedCount() <= 0)) {
            if (this.alive) {
                let date = fn.weeksToDate(ticker.time);
                console.log('Emperor '+fn.getEmpireName(this.empireID)+' abdicated, they ruled for '+date.years+'y '+date.weeks+'w');
            }
            this.alive = false;
            return this.alive;
        }

        this.currentTargets = this.getCurrentTargets(fleets);

        this.fleets.forEach( (fleetID) => {
            if (fn.rand(100) < 15) {
                let launched = this.bot.botLaunchFleet(universe, fleets, fleets.fleet[fleetID], fleetID, this.currentTargets, ticker.time);
                if (launched) {
                    this.currentTargets = this.getCurrentTargets(fleets);
                }
            }
        });
        this.buyFleet(universe, fleets); // Buy a fleet if enough resources.

        this.credits += this.astroCount;
        return this.alive;
    }

    draw(canvas, universe, fleets, offset) {
        let bodyLength = this.getAstrosOwnedCount() / universe.bodies.length;
        // let fleetLength = fleets.totalFleets / fleets.fleet.length;
        let fleetLength = this.fleets.length / fleets.totalFleets;
        canvas.fillRect(105, 5+(offset*12), 600 * bodyLength, 5, fn.getEmpireColor(this.empireID));
        canvas.fillRect(105, 10+(offset*12), 600 * fleetLength, 2, 'white');
        canvas.drawText(5, 15+(offset*12), this.credits, fn.getEmpireColor(this.empireID));
        // canvas.drawText(5, 15+(offset*12), this.astroCount);
    }
}
