// import {Vector} from './Vector.js';
import {Fleet} from './Fleet.js';

class Fleets {

    constructor() {
        this.fleet = [];
    }

    addFleet(astroID, x, y, empireID) {
        let fleet = new Fleet(astroID, x, y, empireID);
        this.fleet.push(fleet);
        return this.fleet.length - 1;
    }

    tick(universe, time) {
        this.fleet.forEach((fleet) => {
            fleet.tick(universe, time);
        });
    }

    draw(canvas, camera, time, section) {
        this.fleet.forEach((fleet) => {
            if (section === 'fleets') {
                fleet.draw(canvas, camera, time);
            } else {
                fleet.drawLines(canvas, camera, time);
            }
        })
    }
}

export {Fleets};
