import {Vector} from './Vector.js';
import {Empire} from './Empire.js';

class Empires {

    constructor() {
        this.maxEmpires = 10;
        this.empires = [];
    }

    createEmpires(maxEmpires) {
        let totalEmpires = maxEmpires || this.maxEmpires;
        for (let e = 1; e <= totalEmpires; e++) {
            this.createEmpire(e);
        }
    }

    createEmpire(id){
        let empire = new Empire(id);
        this.empires.push(empire);
    }

    startSystems(universe) {
        this.empires.forEach((empire) => {
            empire.createFleet(fleets, new Vector(0,0));
        })
    }

    createFleets(fleets) {
        this.empires.forEach((empire) => {
            empire.createFleet(fleets, new Vector(0,0));
        })
    }
}

export {Empires};
