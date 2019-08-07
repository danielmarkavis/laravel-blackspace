// import {Vector} from './Vector.js';
import {Empire} from './Empire.js';

class Empires {

    constructor() {
        this.maxEmpires = 2;
        this.empires = [];
    }

    createEmpires(universe, maxEmpires) {
        let totalEmpires = maxEmpires || this.maxEmpires;
        for (let e = 0; e < totalEmpires; e++) {
            let homePlanet = universe.getStar(e);
            this.createEmpire(e, homePlanet);
        }
    }

    createEmpire(id, homePlanet) {
        let empire = new Empire(id, homePlanet);
        this.empires.push(empire);
    }

    createFleets(universe, fleets) {
        this.empires.forEach((empire, key) => {
            universe.captureSystem(empire.homePlanet.astroID, key);
            empire.createFleet(fleets, empire.homePlanet);
        })
    }

    getEmpire(empireID) {
        return this.empires[empireID];
    }

    tick(universe, fleets, time) {
        this.empires.forEach((empire) => {
            empire.tick(universe, fleets, time);
        });
    }
}

export {Empires};
