import { Vector } from './Vector.js';
import { Functions } from './Functions.js';

class Astro {
    constructor(name, orbit) {
        this.name = name || 'Planet '+Math.floor(Math.random() * 10000) + 1;
        this.empireID = 0;
        this.parent = null;
        this.orbit = {
            path : orbit, // 1-10 orbit paths
            distance : 0,
            speed : new Functions().rand(10)+1, // degrees
            initial : Math.floor(Math.random() * 360), // start angle for object, 0-359
        };
        this.vector = new Vector();
        this.type = null;
        this.radius = 5;

        this.orbit.distance = 10*((this.orbit.path+1)*2)
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

    move(time) {
        let newCoords = this.vector;
        if (this.parent !== null) {
            newCoords = this.vector.pointRotate(this.vector.x, this.vector.y - this.orbit.distance, (time * this.orbit.speed) + this.orbit.initial);
            newCoords.y = newCoords.y+this.orbit.distance;
        }
        return newCoords;
    }

    draw(canvas, time) {
        let coords = this.move(time);
        let color = (this.type === 'star') ? 'yellow' : 'green' ;
        canvas.drawCircle(coords.x, coords.y, this.radius, color );
    }
}

export { Astro };