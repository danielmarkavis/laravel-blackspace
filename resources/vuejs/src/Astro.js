import {Vector} from './Vector.js';
import {fn} from './Functions.js';

class Astro {
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

        if (this.type === 'star') {
            canvas.drawCircle(canvasCoords.x, canvasCoords.y, fn.max(this.radius * (camera.zoom / 10), this.radius+2), 'yellow');
            canvas.drawCircle(canvasCoords.x, canvasCoords.y, fn.max(this.radius+5 * (camera.zoom / 10), this.radius+5), 'transparent', fn.getEmpireColor(this.empireID));
        }
        if ((camera.zoom > 1000 && this.type === 'planet')) {
            // canvas.drawCircle(coords.x, coords.y, this.orbit.distance*(camera.zoom/10), 'transparent', 'grey' );
            canvas.drawCircle(canvasCoords.x, canvasCoords.y, fn.max(this.radius * (camera.zoom / 10), this.radius), 'green');
        }
    }
}

export {Astro};
