import {Vector} from './Vector.js';

class Camera {

    constructor() {
        this.zoom = 1;
        this.distanceScale = 10000;
        this.vector = new Vector(0, 0);
        this.zoomStep = 2;
        this.maxZoom = 10000;
        this.moveStep = 100 * this.distanceScale;
        this.color = 'blue';
    }

    setZoom(zoom) {
        this.zoom = zoom;
    }

    setVector(x,y) {
        this.vector.setVector(x,y);
    }

    zoomIn() {
        if (this.zoom < this.maxZoom) {
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
        // console.log(this.moveStep);
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

export {Camera};
