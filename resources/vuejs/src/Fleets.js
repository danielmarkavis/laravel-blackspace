import {Vector} from './Vector.js';
import {Fleet} from './Fleet.js';

class Fleets {

    /**
     *
     */
    constructor() {
        this.fleets = [];
    }

    addFleet(x,y,empireID) {
        let fleet = new Fleet(x,y,empireID);
        this.fleets.push(fleet);
    }

    draw(canvas, camera, time) {
        this.fleets.forEach((fleet) => {
            fleet.draw(canvas, camera, time);
        })
    }
}

export {Fleets};
