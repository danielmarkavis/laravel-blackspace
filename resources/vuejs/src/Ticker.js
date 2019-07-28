class Ticker {

    constructor(interval) {
        this.time = 0;
        this.timer = null;
        this.paused = true;
        this.interval = interval || 100; //100ms
    }

    setInterval() {

    }

    startTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function () {
            if (!this.paused) {
                this.tick();
            }
        }.bind(this), this.interval);
    }

    pause() {
        this.paused = true;
    }
    play() {
        this.paused = false
    }

    tick() {
        this.time++;
    }
}

export {Ticker};
