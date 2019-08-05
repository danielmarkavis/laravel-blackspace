import {Canvas} from '../src/Canvas.js';
import {Camera} from '../src/Camera.js';
import {Universe} from '../src/Universe.js';
import {Fleets} from '../src/Fleets.js';
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
        if (this.ticker != null) {
            this.ticker.killTimer();
        }

        this.canvas = null;
        this.camera = null;
        this.ticker = null;
        this.universe = [];
        this.fleets = [];
        this.empires = [];
        this.paused = true;
        this.options = {
            'distanceScale': 1000,
            'zoom': 1,
            'interval': 1,
        };

        this.ticker = new Ticker(this.options.interval, () => {
            this.tick();
        });
        this.setupCanvas();
        this.setupCamera();
        this.setupUniverse();
        this.setupFleets();
        this.setupEmpires();

        this.render();
        this.ticker.startTimer(this.options.interval);
    }

    setupCanvas() {
        this.canvas = new Canvas("my-canvas", {width: 1280, height: 720});
        this.canvas.render();
    }

    setupCamera() {
        this.camera = new Camera();
        this.camera.distanceScale = this.options.distanceScale;
        this.camera.setZoom(this.options.zoom);
        this.camera.draw(this.canvas);
    }

    setupUniverse() {
        this.universe = new Universe(this.canvas.width, this.canvas.height, this.camera.distanceScale);
        this.universe.createBodies();
        this.camera.setVector(this.universe.center.x, this.universe.center.y);
        // this.centerPlanet();
    }

    setupFleets() {
        this.fleets = new Fleets();
    }

    setupEmpires() {
        this.empires = new Empires();
        this.empires.createEmpires(this.universe);
        this.empires.createFleets(this.universe, this.fleets);
    }

    drawUniverse() {
        this.universe.draw(this.canvas, this.camera, this.ticker.time);
    }

    drawFleetLines() {
        this.fleets.draw(this.canvas, this.camera, this.ticker.time, 'lines');
    }

    drawFleets() {
        this.fleets.draw(this.canvas, this.camera, this.ticker.time, 'fleets');
    }

    drawCamera() {
        this.camera.draw(this.canvas);
    }

    tick() {
        this.ticker.tick();
        this.fleets.tick(this.universe, this.ticker.time);
        this.empires.tick(this.universe, this.fleets, this.ticker.time);
        this.render();
    }


    play($status) {
        if ($status) {
            this.ticker.play();
        } else {
            this.ticker.pause();
        }
    }

    render() {
        this.canvas.clear();
        this.drawCamera();
        this.drawFleetLines();
        this.drawUniverse();
        this.drawFleets();
    }

    move(direction) {
        switch (direction) {
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
        this.camera.vector = new Vector(system.vector.x, system.vector.y);
        this.render();
    }

    centerScreen() {
        this.camera.vector = new Vector(this.universe.center.x, this.universe.center.y);
        this.render();
    }

    testFleetLaunch() {
        let target = this.universe.getStar(1);
        this.fleets.fleet[0].launchFleet(target.astroID, target, this.ticker.time);
        this.render();
    }
}

export {Game};
