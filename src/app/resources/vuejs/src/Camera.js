import {Vector} from './Vector.js';
import {Options} from './Options.js';

export class Camera {

    constructor() {
        this.zoom = 1;
        this.vector = new Vector(0, 0);
        this.zoomStep = 2;
        this.moveStep = 10 * Options.distanceScale;
        this.color = 'blue';
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }

    setVector(x,y) {
        this.vector.setVector(x,y);
    }

    zoomIn() {
        if (this.zoom < Options.maxZoom) {
            this.zoom = this.zoom * this.zoomStep;
        }
    }

    zoomOut() {
        if (this.zoom > 1) {
            this.zoom = Math.floor(this.zoom / this.zoomStep);
        }
    }

    moveLeft() {
        this.vector.moveLeft(this.moveStep);
    }

    moveRight() {
        this.vector.moveRight(this.moveStep);
    }

    moveUp() {
        this.vector.moveUp(this.moveStep);
    }

    moveDown() {
        this.vector.moveDown(this.moveStep);
    }

    draw(canvas) {
        // canvas.drawLine(canvas.center.x, 0, canvas.center.x, canvas.center.y-20, 'grey');
        // canvas.drawLine(canvas.center.x, canvas.center.y+20, canvas.center.x, canvas.height, 'grey');
    }
}
