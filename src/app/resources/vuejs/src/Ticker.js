export class Ticker {

    constructor(interval, callBack) {
        this.time = 0;
        this.timer = null;
        this.playing = false;
        this.interval = interval || 100; //100ms
        this.callBack = callBack;
    }

    setInterval() {
    }

    startTimer() {
        if (this.timer !== null) {
            this.killTimer();
        }
        this.timer = setInterval(function () {
            if (this.playing) {
                this.callBack();
            }
        }.bind(this), this.interval);
    }

    killTimer() {
        clearInterval(this.timer);
        this.playing = false;
    }
    pause() {
        this.playing = false;
    }
    play() {
        this.playing = true;
    }
    victory(message) {
        this.playing = false;
        console.log(message);
    }

    tick() {
        this.time++;
    }
}
