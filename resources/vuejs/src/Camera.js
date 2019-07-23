import {Vector} from './Vector.js';

class Camera {

    constructor(x, y, zoom) {
        this.zoom = zoom;
        this.distanceScale = 100;
        this.crosshair = new Vector(x, y);
        this.zoomStep = 2;
        this.maxZoom = 2000;
        this.moveStep = 100; // TODO: This needs to be relative to the zoom and universe scale
        this.color = 'blue';
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
        this.crosshair.moveLeft(this.moveStep);
    }

    moveRight() {
        this.crosshair.moveRight(this.moveStep);
    }

    moveUp() {
        this.crosshair.moveUp(this.moveStep);
    }

    moveDown() {
        this.crosshair.moveDown(this.moveStep);
    }

    draw(canvas) {
        canvas.drawLine(canvas.center.x, 0, canvas.center.x, canvas.center.y-20, 'grey');

        canvas.drawLine(canvas.center.x, canvas.center.y+20, canvas.center.x, canvas.height, 'grey');
        // canvas.drawCircle(canvas.center.x, canvas.center.y, 2, this.color);
    }
}

export {Camera};