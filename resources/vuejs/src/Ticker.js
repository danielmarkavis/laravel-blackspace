class Ticker {

    constructor(interval, callBack) {
        this.time = 0;
        this.timer = null;
        this.paused = true;
        this.interval = interval || 100; //100ms
        this.callBack = callBack;
    }

    setInterval() {
    }

    startTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function () {
            if (!this.paused) {
                this.callBack();
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
