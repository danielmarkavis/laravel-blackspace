<template>
    <div>
        <canvas id="my-canvas"></canvas>
        <br>
        <button @click="tick()">Tick: {{time}}</button>
        <button @click="paused = !paused">{{ (paused)?'Play':'Pause' }}</button>
        <button @click="interval = 500">Slow</button>
        <button @click="interval = 100">Normal</button>
        <button @click="interval = 30">Fast >>></button>
        <button @click="zoomIn">+</button>
        <button @click="zoomOut">-</button>
        <button @click="moveLeft"><<<</button>
        <button @click="moveUp">^</button>
        <button @click="moveDown">\/</button>
        <button @click="moveRight">>>></button>
        <button @click="centerPlanet">Star 1</button>
        <button @click="centerScreen">Center</button>
        <p v-if="camera">Zoom: {{camera.zoom}}</p>
    </div>
</template>

<script>
    import {Canvas} from '../src/Canvas.js';
    import {Camera} from '../src/Camera.js';
    import {Universe} from '../src/Universe.js';

    let time = 0;

    export default {
        name: 'Overview',
        components: {},
        data() {
            return {
                canvas: null,
                camera: null,
                universe: [],
                fleets: [],
                time: 0,
                ticker: null,
                paused: true,
                interval: 100,
            }
        },
        mounted() {
            this.setupCanvas();
            this.setupCamera();
            this.setupUniverse();

            this.render();
            this.auto();
        },
        methods: {
            setupCanvas() {
                this.canvas = new Canvas("my-canvas", {width: 1280, height: 720});
                this.canvas.render();
            },
            setupCamera() {
                this.camera = new Camera();
                this.camera.distanceScale = 10000;
                this.camera.draw(this.canvas);
            },
            setupUniverse() {
                this.universe = new Universe(this.canvas.width, this.canvas.height, this.camera.distanceScale);
                this.universe.createBodies();
                this.camera.setVector(this.universe.center.x,this.universe.center.y);
            },
            setupFleets() {
                this.fleets = new Fleets(new Vector(), this.distanceScale);
                this.fleets.createFleets();
            },
            drawUniverse() {
                this.universe.draw(this.canvas, this.camera, this.time);
            },
            drawFleets() {
                this.fleets.draw(this.canvas, this.camera, this.time);
            },
            drawCamera() {
                this.camera.draw(this.canvas);
            },
            tick() {
                this.time++;
                this.render();
            },
            auto() {
                this.ticker = setInterval(function () {
                    if (!this.paused) {
                        this.tick();
                    }
                }.bind(this), this.interval);
            },
            render() {
                this.canvas.clear();
                this.drawCamera();
                // this.layers['fleets'].drawFleetLines(this.canvas, this.time);
                this.drawUniverse();
                // this.layers['fleets'].drawFleets(this.canvas, this.time);
            },
            zoomIn() {
                this.camera.zoomIn();
                this.render();
            },
            zoomOut() {
                this.camera.zoomOut();
                this.render();
            },
            moveLeft() {
                this.camera.moveLeft();
                this.render();
            },
            moveRight() {
                this.camera.moveRight();
                this.render();
            },
            moveUp() {
                this.camera.moveUp();
                this.render();
            },
            moveDown() {
                this.camera.moveDown();
                this.render();
            },
            centerPlanet() {
                let system = this.universe.getAstro(0);
                this.camera.vector = system.vector;
                this.render();
            },
            centerScreen() {
                this.camera.vector = this.universe.center;
                this.render();
            }
        },
        watch: {
            'interval': function () {
                clearInterval(this.ticker);
                this.auto();
            },
        }
    }
</script>
