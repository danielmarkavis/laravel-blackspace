import {Canvas} from '../src/Canvas.js';
import {Camera} from '../src/Camera.js';
import {Universe} from '../src/Universe.js';
import {Ticker} from '../src/Ticker.js';
import {Empires} from '../src/Empires.js';
import {Vector} from '../src/Vector.js';

/**
 * Deals with create a new game.
 */
class Game {
    constructor() {
        this.newGame();
    }

    newGame() {
        this.canvas = null;
        this.camera = null;
        this.ticker = null;
        this.universe = [];
        this.fleets = [];
        this.empires = [];
        this.paused = true;
        this.interval = 100;

        this.ticker = new Ticker();
        this.setupCanvas();
        this.setupCamera();
        this.setupUniverse();
        this.setupEmpires();

        this.render();
        this.ticker.startTimer(this.interval);
    }

    setupCanvas() {
        this.canvas = new Canvas("my-canvas", {width: 1280, height: 720});
        this.canvas.render();
    }

    setupCamera() {
        this.camera = new Camera();
        this.camera.distanceScale = 10000;
        this.camera.setZoom(16000);
        this.camera.draw(this.canvas);
    }

    setupUniverse() {
        this.universe = new Universe(this.canvas.width, this.canvas.height, this.camera.distanceScale);
        this.universe.createBodies();
        this.camera.setVector(this.universe.center.x,this.universe.center.y);
        this.centerPlanet();
    }

    setupEmpires() {
        this.empires = new Empires();
        this.empires.createEmpires();
        this.empires.createFleets(this.fleets);
    }

    drawUniverse() {
        this.universe.draw(this.canvas, this.camera, this.ticker.time);
    }

    drawFleets() {
        this.fleets.draw(this.canvas, this.camera, this.ticker.time);
    }

    drawCamera() {
        this.camera.draw(this.canvas);
    }

    tick() {
        this.ticker.tick();
        this.render();
    }

    pauseGame() {
        this.ticker.pause();
    }

    render() {
        this.canvas.clear();
        this.drawCamera();
        this.drawUniverse();
    }

    move(direction) {
        switch(direction) {
            case 'left':
                this.camera.moveLeft();
                break;
            case 'right':
                this.camera.moveRight();
                break;
            case 'up':
                this.camera.moveUp();
                break;
            case 'down':
                this.camera.moveDown();
                break;
            case 'in':
                this.camera.zoomIn();
                break;
            case 'out':
                this.camera.zoomOut();
                break;
        }
        this.render();
    }

    centerPlanet() {
        let system = this.universe.getAstro(0);
        this.camera.vector = new Vector( system.vector.x, system.vector.y );
        this.render();
    }

    centerScreen() {
        this.camera.vector = new Vector( this.universe.center.x, this.universe.center.y );
        this.render();
    }
}

export {Game};
