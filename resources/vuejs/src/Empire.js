import {Vector} from './Vector.js';
import {Fleet} from './Fleet.js';
import {fn} from './Functions.js';

class Empire {

    constructor(empireID, name) {
        this.name = name || 'Empire '+fn.rand(10000)+1;
        this.empireID = empireID;
        this.astroOwned = [];
    }

    createFleet(fleets, target) {
        let fleet = new Fleet(target.x, target.y, this.empireID);
        fleets.push(fleet);
    }

    update() {
    }
}

export {Empire};
