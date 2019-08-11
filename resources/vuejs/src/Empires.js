import {Empire} from './Empire.js';
import {Options} from './Options.js';

export class Empires {

    constructor() {
        this.empires = [];
    }

    createEmpires(universe, maxEmpires) {
        let totalEmpires = maxEmpires || Options.minEmpires;
        if (totalEmpires > Options.maxEmpires) {
            totalEmpires = Options.maxEmpires;
        }
        for (let e = 0; e < totalEmpires; e++) {
            let homePlanet = universe.getStar(e);
            this.createEmpire(e, homePlanet);
        }
    }

    createEmpire(id, homePlanet) {
        if (this.empires.length > Options.minEmpires) {
            Options.minEmpires++;
        }
        if (Options.minEmpires >= Options.maxEmpires) {
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
        let alive = 0;
        this.empires.forEach((empire) => {
            if (empire.tick(universe, fleets, ticker)) {
                alive++;
            }
        });
        if (alive === 1) {
            callBack();
        }
    }

    draw(canvas, universe, fleets) {
        this.empires.forEach((empire,key) => {
            empire.draw(canvas, universe, fleets, key);
        });
    }
}
