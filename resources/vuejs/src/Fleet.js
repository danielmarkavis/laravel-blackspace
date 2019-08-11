import {fn} from './Functions.js';
import {Vector} from './Vector.js';
import {Options} from "./Options";

export class Fleet {

    /**
     * @param astroID
     * @param x
     * @param y
     * @param empireID
     */
    constructor(astroID, x, y, empireID, rank) {
        this.locationVector = new Vector(x, y);
        this.startVector = new Vector(x, y);
        this.endVector = new Vector(x, y);
        this.location = astroID; // index for the astro array
        this.target = astroID; // index for the astro array
        this.empireID = empireID;
        this.speed = 1000 + fn.rand(1000);
        this.xp = 0;
        this.hp = 100 * rank;
        this.rank = rank || 1;
        this.launchDate = 0;
        this.travelTime = 0;
        this.path = fn.rand(2)+1;
        this.color = 'white';
    }

    isHome() {
        return (this.location === this.target);
    }

    hasArrived(time) {
        return (this.getTimeToTarget(time) <= 0);
    }

    getDistance() {
        return this.locationVector.getDistance(this.endVector.x, this.endVector.y);
    }

    getArrivalTime() {
        let distance = this.getDistance();
        return Math.ceil(distance / (this.speed * this.rank)); // Get tick of arrival.
    }

    getTimeToTarget(time) {
        return (this.launchDate + this.travelTime) - time;
    }

    setTarget(target) {
        this.target = target.astroID;
        this.endVector.setVector(target.vector.x, target.vector.y);
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    move(coords, time) {
        if (this.isHome()) {
            return coords;
        }
        let percentComplete = (time - this.launchDate) / this.travelTime;
        let relativeVector = new Vector(this.startVector.x - this.endVector.x, this.startVector.y - this.endVector.y);

        relativeVector.x = Math.round(relativeVector.x * percentComplete);
        relativeVector.y = Math.round(relativeVector.y * percentComplete);
        // console.log(relativeVector);
        return new Vector(this.startVector.x - relativeVector.x, this.startVector.y - relativeVector.y);
    }

    tick(universe, empires, time) {
        if (this.hasArrived(time) && !this.isHome()) {
            this.setArrived();
            let system = universe.getAstro(this.location);
            if (system.empireID !== -1 && system.empireID !== this.empireID) {
                this.addXP(500);
                this.damageFleet(5);
            } else {
                this.addXP(100);
            }
            if (system.empireID !== -1) {
                empires.getEmpire(system.empireID).removeSystem(universe, system.astroID);
            }
            universe.captureSystem(system.astroID, this.empireID);

            empires.getEmpire(this.empireID).addSystem(universe, system.astroID);
        }
    }


    resetFleet(fleets, homePlanet) {
        this.locationVector = new Vector(homePlanet.vector.x, homePlanet.vector.y);
        this.startVector = new Vector(homePlanet.vector.x, homePlanet.vector.y);
        this.endVector = new Vector(homePlanet.vector.x, homePlanet.vector.y);
        this.location = homePlanet.astroID; // index for the astro array
        this.target = homePlanet.astroID; // index for the astro array
        this.rank = 1;
        this.xp = 0;
        this.hp = 100;
        this.path = fn.rand(2)+1;
    }

    /**
     * @param astroID
     * @param target
     * @param time
     */
    launchFleet(target, time) {
        this.setTarget(target);
        this.launchDate = time;
        this.travelTime = this.getArrivalTime();
        // console.log('Fleet has been launched to target: '+this.travelTime+' weeks');
    }

    setArrived() {
        // console.log('Fleet has arrived at target');
        this.locationVector = new Vector(this.endVector.x,this.endVector.y);
        this.startVector = new Vector(this.endVector.x,this.endVector.y);
        this.location = this.target;

    }

    addXP(xp) {
        this.xp += xp;
        if (this.xp > Options.maxXP) {
            this.xp = Options.maxXP;
        }
    }

    damageFleet(damage) {
        this.hp -= damage;
        if (this.hp < 0) { this.hp = 0; }
    }

    draw(canvas, camera, time) {
        let coords = this.move(this.locationVector, time);
        let astroCoords = new Vector(coords.x, coords.y);
        let canvasCoords = astroCoords.fitToScreen(canvas, camera);
        let offset = 0;
        if (this.isHome()) {
            offset = 10;
        }
        // canvas.fillRect(Math.round(canvasCoords.x-2)+offset, Math.round(canvasCoords.y-2)+offset, 5, 5, fn.getEmpireColor(this.empireID));
        canvas.drawTriangle(Math.round(canvasCoords.x)+offset, Math.round(canvasCoords.y)+offset, fn.getEmpireColor(this.empireID));
    }

    drawLines(canvas, camera) {
        if (this.hasArrived()) {
            return;
        }
        let fromCoords = new Vector(this.startVector.x, this.startVector.y);
        let toCoords = new Vector(this.endVector.x, this.endVector.y);
        let fromCanvasCoords = fromCoords.fitToScreen(canvas, camera);
        let toCanvasCoords = toCoords.fitToScreen(canvas, camera);
        canvas.drawLine(
            Math.round(fromCanvasCoords.x),
            Math.round(fromCanvasCoords.y),
            Math.round(toCanvasCoords.x),
            Math.round(toCanvasCoords.y),
            fn.getEmpireColor(this.empireID)
        );
    }

}
