import {Canvas} from '../src/Canvas.js';
import {Camera} from '../src/Camera.js';
import {Universe} from '../src/Universe.js';
import {Fleets} from '../src/Fleets.js';
import {Ticker} from '../src/Ticker.js';
import {Empires} from '../src/Empires.js';
import {Vector} from '../src/Vector.js';
import {fn} from '../src/Functions.js';
import {Options} from '../src/Options.js';

/**
 * Deals with create a new game.
 */
export class Game {
    constructor() {
    }

    newGame(callBack) {
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

        this.ticker = new Ticker(Options.interval, () => {
            this.tick();
        });
        this.setupCanvas();
        this.setupCamera();
        this.setupUniverse();
        this.setupFleets();
        this.setupEmpires();

        this.render();
        this.ticker.startTimer(Options.interval);
        callBack();
    }

    setupCanvas() {
        this.canvas = new Canvas();
        this.canvas.setup("my-canvas", {width: 1280, height: 720});
    }

    setupCamera() {
        this.camera = new Camera();
        this.camera.distanceScale = Options.distanceScale;
        this.camera.setZoom(Options.defaultZoom);
    }

    setupUniverse() {
        this.universe = new Universe(this.canvas.width, this.canvas.height, this.camera.distanceScale);
        this.universe.createBodies();
        this.camera.setVector(this.universe.center.x, this.universe.center.y);
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

    drawEmpires() {
        this.empires.draw(this.canvas, this.universe, this.fleets);
    }

    drawUI() {
        this.canvas.drawText(this.canvas.width - 50, 10, this.ticker.time, 'white');
    }

    render(forceRender) {
        if (this.canvas.canRender(this.ticker.time) || forceRender) {
            this.canvas.clear();
            this.drawFleetLines();
            this.drawUniverse();
            this.drawFleets();
            this.drawEmpires();
            this.drawUI();
            this.canvas.flip();
        }
    }

    tick(forceRender) {
        this.ticker.tick();
        this.fleets.tick(this.universe, this.empires, this.ticker);
        this.empires.tick(this.universe, this.fleets, this.ticker, () => {this.victory(this.empires.alive[0])} );
        this.render(forceRender || false);
    }

    victory(empireID) {
        this.ticker.victory('Victory! Emperor '+fn.getEmpireName(empireID)+' conquered the galaxy. All hail the new overlord!');
        this.render(true);
    }

    setInterval(value) {
        this.ticker.interval = value;
        this.ticker.killTimer();
        this.ticker.startTimer();
        this.play(true);
    }

    play($status) {
        if ($status) {
            this.ticker.play();
        } else {
            this.ticker.pause();
        }
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
        this.render(true);
    }

    centerPlanet() {
        let system = this.universe.getAstro(0);
        this.camera.vector = new Vector(system.vector.x, system.vector.y);
        this.render(true);
    }

    centerScreen() {
        this.camera.vector = new Vector(this.universe.center.x, this.universe.center.y);
        this.render(true);
    }

    createEmpire() {
        let id = this.empires.empires.length;
        let homePlanet = this.universe.getStar(id);
        if (this.empires.createEmpire(id, homePlanet)) {
            this.empires.getEmpire(id).createFleet(this.fleets, homePlanet);
            this.universe.captureSystem(homePlanet.astroID, id);
            this.empires.getEmpire(id).addSystem(this.universe, homePlanet.astroID);
        }
        this.render(true);
    }

    showEmpires() {
        console.log(this.empires);
    }

    showFleets() {
        console.log(this.fleets);
    }

    showAstros() {

    }

    showAstros() {

    }
}
