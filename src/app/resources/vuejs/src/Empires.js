import {Empire} from './Empire.js';
import {Options} from './Options.js';

export class Empires {

    constructor() {
        this.empires = [];
        this.alive = [];
    }

    createEmpires(universe) {
        for (let e = 0; e < Options.minEmpires; e++) {
            let homePlanet = universe.getStar(e);
            this.createEmpire(e, homePlanet);
        }
    }

    createEmpire(id, homePlanet) {
        if (Options.minEmpires > Options.maxEmpires) {
            console.log('Max Empires Reached!');
            return false;
        }

        let empire = new Empire(id, homePlanet);
        this.empires.push(empire);
        return true;
    }

    createFleets(universe, fleets) {
        this.empires.forEach((empire, key) => {
            universe.captureSystem(empire.homePlanet.astroID, key);
            this.getEmpire(key).addSystem(universe, empire.homePlanet.astroID);
            empire.createFleet(fleets, empire.homePlanet);
        })
    }

    getEmpire(empireID) {
        return this.empires[empireID];
    }

    tick(universe, fleets, ticker, callBack) {
        this.alive = [];
        this.empires.forEach((empire, key) => {
            if (empire.tick(universe, fleets, ticker)) {
                this.alive.push(key);
            }
        });
        if (this.alive.length === 1) {
            callBack();
        }
    }

    draw(canvas, universe, fleets) {
        this.empires.forEach((empire,key) => {
            empire.draw(canvas, universe, fleets, key);
        });
    }
}
