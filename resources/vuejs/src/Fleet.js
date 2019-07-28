import {Vector} from './Vector.js';

class Fleet {

    /**
     *
     * @param x
     * @param y
     * @param empireID
     */
    constructor(x, y, empireID) {
        this.vector = new Vector(x, y);
        this.target = new Vector(x, y);
        this.owner = empireID;
        this.speed = 1;
        this.xp = 0;
        this.launchDate = 0;
    }

    hasArrived() {
        if (this.target === this.vector) {
            return true;
        }
        if (this.getDistance() <= 0) {
            this.target = this.vector;
            return true;
        }
        return false;
    }

    getDistance() {
        return this.vector.getDistance(this.target.x, this.target.y);
    }

    fleetETA(time) {
        if (this.target === this.vector) {
            return 0;
        }

    }

    setTarget(x, y) {
        this.target.setVector(x, y);
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     *
     * @param target Vector
     * @param time Integer
     */
    launchFleet(target, time) {
        this.setTarget(target.x, target.y);
        this.launchDate = time;
    }

    draw(canvas) {
        canvas.drawCircle(this.vector.x, this.vector.y, 2, this.color);
    }
}

export {Fleet};