import {Vector} from './Vector.js';
import {Functions} from './Functions.js';
import {playerCamera} from './Camera.js';
import {screenCanvas} from './Canvas.js';

class Astro {
    constructor(name, orbit) {
        this.name = name || 'Object ' + new Function.rand(10000) + 1;
        this.empireID = 0;
        this.parent = null;
        this.orbit = {
            path: orbit, // 1-10 orbit paths
            distance: 0,
            speed: 1, // degrees
            initial: new Functions().rand(360) + 1, // start angle for object, 0-359
        };
        this.vector = new Vector();
        this.type = null;
        this.radius = 5;

        this.orbit.distance = 7 * ((this.orbit.path + 1) * 2);
        this.orbit.speed = Math.floor(30 / this.orbit.path) + 1 + (new Functions().rand(3));
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
            newCoords.y = newCoords.y + this.orbit.distance;
        }
        return newCoords;
    }

    draw(canvas, time) {
        let coords = this.move(time);
        let color = (this.type === 'star') ? 'yellow' : 'green';
        // console.log(screenCanvas.resolution);
        let newCoords = this.vector.fitToScreen(playerCamera.crosshair, playerCamera.distanceScale, playerCamera.zoom, screenCanvas.resolution);
        // console.log(newCoords);
        // console.log(playerCamera);
        canvas.drawCircle(coords.x, coords.y, this.radius, color);
        canvas.drawCircle(newCoords.x, newCoords.y, this.radius, color);
    }
}

export {Astro};