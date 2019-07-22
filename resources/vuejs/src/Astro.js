import {Vector} from './Vector.js';
import {Functions} from './Functions.js';

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
        if (new Functions().rand(100)===1) {
            this.orbit.speed = Math.floor(30 / this.orbit.path) + 1 + (new Functions().rand(3));
        } else {
            this.orbit.speed = -(Math.floor(30 / this.orbit.path) + 1 + (new Functions().rand(3)));
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

    move(time) {
        let newCoords = this.vector;
        if (this.parent !== null) {
            newCoords = this.vector.pointRotate(this.vector.x, this.vector.y - this.orbit.distance, (time * this.orbit.speed) + this.orbit.initial);
            newCoords.y = newCoords.y + this.orbit.distance;
        }
        return newCoords;
    }

    draw(canvas, camera, time) {
        let coords = this.move(time);
        let color = (this.type === 'star') ? 'yellow' : 'green';

        let astroCoords = new Vector(coords.x, coords.y);
        let canvasCoords = astroCoords.fitToScreen(canvas, camera);

        if ((camera.zoom > (2*camera.distanceScale) && this.type === 'planet') || this.type === 'star')  {
            // canvas.drawCircle(newCoords.x, newCoords.y, this.orbit.distance*(camera.zoom/10), 'transparent', 'grey' );

            canvas.drawCircle(canvasCoords.x-canvas.center.x, canvasCoords.y-canvas.center.y, this.radius*(camera.zoom/10), color);
        }
    }}

export {Astro};