<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center pt-5">
                    <canvas id="my-canvas"></canvas>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div v-if="game">
                        <button class="btn btn-primary" @click="game.newGame()">New</button>
                        <button class="btn btn-primary" @click="toggle()"> <span v-if="playing"><i class="fas fa-stop"></i></span> <span v-show="!playing"><i class="fas fa-play"></i></span></button>
                        <button class="btn btn-primary" @click="game.tick({'forceRender':true})">Tick: {{game.ticker.time}}</button>
                        <!--            <button @click="game.play(false)">Pause</button>-->
                        <button class="btn btn-primary" @click="game.setInterval(100)"><i class="fas fa-chevron-right"></i></button>
                        <button class="btn btn-primary" @click="game.setInterval(50)"><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i></button>
                        <button class="btn btn-primary" @click="game.setInterval(1)"><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i></button>
                        <button class="btn btn-primary" @click="game.move('in')">+</button>
                        <button class="btn btn-primary" @click="game.move('out')">-</button>
                        <button class="btn btn-primary" @click="game.move('left')">Left</button>
                        <button class="btn btn-primary" @click="game.move('right')">Right</button>
                        <button class="btn btn-primary" @click="game.move('up')">Up</button>
                        <button class="btn btn-primary" @click="game.move('down')">Down</button>
                        <button class="btn btn-primary" @click="game.centerPlanet()">Star 1</button>
                        <button class="btn btn-primary" @click="game.centerScreen()">Center</button>
                        <button class="btn btn-primary" @click="game.testFleetLaunch()">Launch</button>
                        <button class="btn btn-primary" @click="game.render()">Force Render</button>
                        <!--        <p v-if="camera">Zoom: {{camera.zoom}}</p>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Game} from '../src/Game.js';

    export default {
        name: 'Overview',
        components: {},
        data() {
            return {
                playing: false,
                game: null,
            }
        },
        mounted() {
            this.game = new Game();
        },
        methods: {
            toggle(){
                this.playing = !this.playing;
                this.game.play(this.playing);
            }
        },
        watch: {}
    }
</script>
