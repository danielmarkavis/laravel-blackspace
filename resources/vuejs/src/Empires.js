// import {Vector} from './Vector.js';
import {Empire} from './Empire.js';

class Empires {

    constructor() {
        this.minEmpires = 2;
        this.maxEmpires = 7;
        this.empires = [];
    }

    createEmpires(universe, maxEmpires) {
        let totalEmpires = maxEmpires || this.minEmpires;
        if (totalEmpires > this.maxEmpires) {
            totalEmpires = this.maxEmpires;
        }
        for (let e = 0; e < totalEmpires; e++) {
            let homePlanet = universe.getStar(e);
            this.createEmpire(e, homePlanet);
        }
    }

    createEmpire(id, homePlanet) {
        if (this.empires.length > this.minEmpires) {
            this.minEmpires++;
        }
        if (this.minEmpires >= this.maxEmpires) {
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
            this.getEmpire(key).addSystem(empire.homePlanet.astroID);
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

    draw(canvas, universe) {
        this.empires.forEach((empire,key) => {
            empire.draw(canvas, universe, key);
        });
    }
}

export {Empires};
