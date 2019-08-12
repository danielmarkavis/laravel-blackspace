<template>
    <div>
<!--        <div class="loading" v-if="loading"></div>-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center pt-5">
                    <canvas id="my-canvas" style="background:black"></canvas>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-1 text-center">
                    <button class="btn btn-primary" @click="newGame()">New</button>
                </div>
                <div v-if="game" class="col-3 game mb-3">
                    <button class="btn btn-primary" @click="toggle()"><span v-if="playing"><i
                        class="fas fa-stop"></i></span> <span v-show="!playing"><i class="fas fa-play"></i></span>
                    </button>
                    <button class="btn btn-primary" @click="game.tick({'forceRender':true})">Tick:
                        {{game.ticker.time}}
                    </button>
                    <!--            <button @click="game.play(false)">Pause</button>-->
                    <button class="btn btn-primary" @click="game.setInterval(100)"><i class="fas fa-chevron-right"></i>
                    </button>
                    <button class="btn btn-primary" @click="game.setInterval(50)"><i class="fas fa-chevron-right"></i><i
                        class="fas fa-chevron-right"></i></button>
                    <button class="btn btn-primary" @click="game.setInterval(1)"><i class="fas fa-chevron-right"></i><i
                        class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i></button>
                </div>
                <div v-if="game" class="col-3 game mb-3">
                    <button class="btn btn-primary" @click="game.move('in')"><i class="fas fa-plus"></i></button>
                    <button class="btn btn-primary" @click="game.move('out')"><i class="fas fa-minus"></i></button>
                    <button class="btn btn-primary" @click="game.move('left')"><i class="fas fa-chevron-left"></i></button>
                    <button class="btn btn-primary" @click="game.move('right')"><i class="fas fa-chevron-right"></i></button>
                    <button class="btn btn-primary" @click="game.move('up')"><i class="fas fa-chevron-up"></i></button>
                    <button class="btn btn-primary" @click="game.move('down')"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div v-if="game" class="col-3 game mb-3">
                    <button class="btn btn-primary" @click="game.centerPlanet()">Star 1</button>
                    <button class="btn btn-primary" @click="game.centerScreen()">Center</button>
                    <button class="btn btn-primary" @click="game.render()">Force Render</button>
                    <button class="btn btn-primary" @click="game.createEmpire()">New Empire</button>
                    <button class="btn btn-primary" @click="game.showEmpires()">Show Empires</button>
                    <button class="btn btn-primary" @click="game.showFleets()">Show Fleets</button>
                </div>
                <!--        <p v-if="camera">Zoom: {{camera.zoom}}</p>-->
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
                loading: false,
                playing: false,
                game: null,
            }
        },
        mounted() {
            this.newGame();
        },
        methods: {
            toggle() {
                this.playing = !this.playing;
                this.game.play(this.playing);
            },
            newGame() {
                this.loading = true;
                this.playing = false;
                if (this.game !== null) {
                    this.game.play(this.playing);
                }
                this.game = new Game();
                this.game.newGame(() => {
                    this.loading = false;
                });
            }
        },
        watch: {}
    }
</script>

<style lang="scss">
    .loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
    }
</style>
