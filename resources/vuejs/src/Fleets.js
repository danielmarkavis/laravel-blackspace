import {Fleet} from './Fleet.js';

export class Fleets {

    constructor() {
        this.fleet = [];
        this.totalFleets = 0; //This is a count, which ignores all nulls'
    }

    addFleet(astroID, x, y, empireID, rank) {
        this.totalFleets++;

        let fleet = new Fleet(astroID, x, y, empireID, rank || 1);

        let freeFleetID = this.findUnusedFleetSlot();

        if (freeFleetID !== false) {
            // console.log('Found free fleet slot');
            this.fleet[freeFleetID] = fleet;
            return freeFleetID;
        } else {
            this.fleet.push(fleet);
            return this.fleet.length - 1;
        }
    }

    removeFleet(fleetID) {
        this.totalFleets--;
        // console.log('Nulling fleet');
        this.fleet[fleetID] = null;
    }

    getFleet(fleetID) {
        return this.fleet[fleetID];
    }

    findUnusedFleetSlot(){
        let foundKey = null;
        if (this.fleet.length <= 0) {
            return false;
        }
        this.fleet.forEach((fleet, key) => {
            if (fleet === null) {
                // console.log('Found Slot: '+key);
                foundKey = key;
            }
        });
        if (foundKey !== null) {
            return foundKey;
        }
        return false;
    }

    tick(universe, empires, time) {
        this.fleet.forEach( (fleet) => {
            if (fleet) {
                fleet.tick(universe, empires, time);
            }
        });
    }

    draw(canvas, camera, time, section) {
        this.fleet.forEach((fleet) => {
            if (fleet) {
                if (section === 'fleets') {
                    fleet.draw(canvas, camera, time);
                } else {
                    fleet.drawLines(canvas, camera, time);
                }
            }
        })
    }
}
