<template>
    <div>
        <canvas id="my-canvas"></canvas>
        <br>
        <div v-if="game">
            <button class="btn btn-primary" @click="game.newGame()">New</button>
            <button class="btn btn-primary" @click="toggle()">Play</button>
            <button class="btn btn-primary" @click="game.tick()">Tick: {{game.ticker.time}}</button>
<!--            <button @click="game.play(false)">Pause</button>-->
            <!--        <button @click="interval = 500">Slow</button>-->
            <!--        <button @click="interval = 100">Normal</button>-->
            <!--        <button @click="interval = 30">Fast >>></button>-->
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
