<template>
    <div>
        <canvas id="my-canvas"></canvas>
        <button @click="tick()">Tick</button>
        <button @click="paused = !paused">{{ (paused)?'Play':'Pause' }} </button>
    </div>
</template>

<script>
    import { Canvas } from '../src/Canvas.js';
    import { Universe } from '../src/Universe.js';

    export default {
        name: 'Overview',
        components: {
        },
        data() {
            return {
                canvas:null,
                distanceScale : 1,
                layers: [],
                time: 0,
                ticker: null,
                paused: true,
            }
        },
        mounted() {
            this.setupCanvas();

            this.layers['universe'] = new Universe(this.canvas.canvasWidth * this.distanceScale, this.canvas.canvasHeight * this.distanceScale);
            this.layers['universe'].createBodies();

            // this.layers['fleets'] = new Fleets(this.canvas.canvasWidth * this.distanceScale, this.canvas.canvasHeight * this.distanceScale);
            // this.layers['fleets'].createFleets();

            this.render();
            this.auto();
        },
        methods: {
            setupCanvas() {
                this.canvas = new Canvas("my-canvas");
                this.canvas.render();
            },
            tick() {
              this.time++;
              this.render();
            },
            auto() {
                this.ticker = setInterval(function(){
                    if (!this.paused) {
                        this.tick();
                    }
                }.bind(this), 100);
            },
            render() {
                this.canvas.clear();
                // this.layers['fleets'].drawFleetLines(this.canvas, this.time);
                this.layers['universe'].draw(this.canvas, this.time);
                // this.layers['fleets'].drawFleets(this.canvas, this.time);
            }
        }
    }
</script>
