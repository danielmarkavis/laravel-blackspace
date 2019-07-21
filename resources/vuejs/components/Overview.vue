<template>
    <div>
        <canvas id="my-canvas"></canvas>
        <br>
        <button @click="tick()">Tick</button>
        <button @click="paused = !paused">{{ (paused)?'Play':'Pause' }}</button>
        <button @click="interval = 500">Slow</button>
        <button @click="interval = 100">Normal</button>
        <button @click="interval = 5">Fast >>></button>
        <button @click="zoomIn">+</button>
        <button @click="zoomOut">-</button>
        <button @click="moveLeft"><<<</button>
    </div>
</template>

<script>
    import {Canvas} from '../src/Canvas.js';
    import {Universe} from '../src/Universe.js';
    import {playerCamera} from '../src/Camera.js';

    let time = 0;

    export default {
        name: 'Overview',
        components: {},
        data() {
            return {
                canvas: null,
                layers: [],
                time: 0,
                ticker: null,
                paused: true,
                interval: 100,
            }
        },
        mounted() {
            this.setupCanvas();

            this.layers['universe'] = new Universe((this.canvas.resolution.width * this.distanceScale), (this.canvas.resolution.height * this.distanceScale));
            this.layers['universe'].createBodies();

            // this.layers['fleets'] = new Fleets(this.canvas.canvasWidth * this.distanceScale, this.canvas.canvasHeight * this.distanceScale);
            // this.layers['fleets'].createFleets();

            this.render();
            this.auto();
        },
        methods: {
            setupCanvas() {
                this.canvas = new Canvas("my-canvas", {width: 1280, height: 720});
                this.canvas.render();
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
                // this.layers['fleets'].drawFleetLines(this.canvas, this.time);
                this.layers['universe'].draw(this.canvas, this.time);
                // this.layers['fleets'].drawFleets(this.canvas, this.time);
                console.log(playerCamera);
                playerCamera.draw();
            },
            zoomIn() {
                playerCamera.zoomIn();
                this.render();
            },
            zoomOut() {
                playerCamera.zoomOut();
                this.render();
            },
            moveLeft() {
                playerCamera.moveLeft();
                this.render();
            },

        },
        watch: {
            'interval': function () {
                clearInterval(this.ticker);
                this.auto();
            },
        }
    }
</script>
