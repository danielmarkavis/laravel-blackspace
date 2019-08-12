import {Vector} from './Vector.js';
import {fn} from './Functions.js';

export class Astro {
    constructor(name, orbit) {
        this.name = name || 'Object ' + new Function.rand(10000) + 1;
        this.empireID = -1;//fn.rand(5)+1;//0;
        this.astroID = null;
        this.parent = null;
        this.orbit = {
            path: 0, // 1-10 orbit paths
            distance: 0,
            speed: 0, // degrees
            initial: fn.rand(360) + 1, // start angle for object, 0-359
        };
        this.vector = new Vector();
        this.type = null;
        this.radius = 5;
        this.orbitting = 0;
        this.nodes = [];

        if (orbit > 0) {
            this.orbit.distance = 7 * ((orbit + 1) * 2);
            this.orbit.speed = Math.floor(30 / orbit) + 1 + (fn.rand(3));
            if (fn.rand(100) === 1) {
                this.orbit.speed = -this.orbit.speed;
            }
        }
    }

    setAsStar() {
        this.type = 'star';
    }

    setAsPlanet() {
        this.type = 'planet';
    }

    setParent(parentID) {
        this.parent = parentID;
    }

    setOwner(empireID) {
        this.empireID = empireID;
    }

    damagePlanet(value) {
        this.hp -= value;
        return (this.hp <= 0);
    }
}
