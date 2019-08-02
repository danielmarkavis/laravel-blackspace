<template>
    <div>
        <canvas id="my-canvas"></canvas>
        <br>
        <div v-if="game">
            <button @click="game.newGame()">New</button>
            <button @click="game.tick()">Tick: {{game.ticker.time}}</button>
            <button @click="game.play(true)">Play</button>
            <button @click="game.play(false)">Pause</button>
            <!--        <button @click="interval = 500">Slow</button>-->
            <!--        <button @click="interval = 100">Normal</button>-->
            <!--        <button @click="interval = 30">Fast >>></button>-->
            <button @click="game.move('in')">+</button>
            <button @click="game.move('out')">-</button>
            <button @click="game.move('left')">Left</button>
            <button @click="game.move('right')">Right</button>
            <button @click="game.move('up')">Up</button>
            <button @click="game.move('down')">Down</button>
            <button @click="game.centerPlanet()">Star 1</button>
            <button @click="game.centerScreen()">Center</button>
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
                game: null,
            }
        },
        mounted() {
            this.game = new Game();
        },
        methods: {
        },
        watch: {
        }
    }
</script>
