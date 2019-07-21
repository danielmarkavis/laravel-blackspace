import {Vector} from './Vector.js';
import { screenCanvas } from './Canvas.js';

class Camera {

    constructor(x, y, zoom) {
        this.zoom = zoom;
        this.distanceScale = 1;
        this.crosshair = new Vector(x, y);
        this.zoomStep = 1;
        this.moveStep = 10;
        this.color = 'blue';
    }

    zoomIn() {
        if (this.zoom < 100) {
            this.zoom++;
        }
    }

    zoomOut() {
        if (this.zoom > 1) {
            this.zoom--;
        }
    }

    moveLeft() {
        this.crosshair.moveLeft(this.moveStep);
    }
    moveRight(){
        this.crosshair.moveRight(this.moveStep);
    }
    moveUp(){
        this.crosshair.moveUp(this.moveStep);
    }
    moveDown(){
        this.crosshair.moveDown(this.moveStep);
    }
    draw() {
        screenCanvas.drawCircle(this.crosshair.x, this.crosshair.y, 2, this.color );
    }
}

let playerCamera = new Camera(800, 800, 1);

export {Camera, playerCamera};