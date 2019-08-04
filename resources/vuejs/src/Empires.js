// import {Vector} from './Vector.js';
import {Empire} from './Empire.js';

class Empires {

    constructor() {
        this.maxEmpires = 5;
        this.empires = [];
    }

    createEmpires(maxEmpires) {
        let totalEmpires = maxEmpires || this.maxEmpires;
        for (let e = 0; e < totalEmpires; e++) {
            this.createEmpire(e);
        }
    }

    createEmpire(id) {
        let empire = new Empire(id);
        this.empires.push(empire);
    }

    createFleets(universe, fleets) {
        this.empires.forEach((empire, key) => {
            let system = universe.getStar(key);
            // console.log(system);
            universe.captureSystem(system.astroID, key);
            empire.createFleet(fleets, key, system.vector);
        })
    }

    tick(universe, fleets, time) {
        this.empires.forEach((empire, key) => {
            empire.tick(universe, fleets, time);
        });
    }
}

export {Empires};
