export default class Metronome
{
    constructor() {
        this.ctx = null;
        this.seconds = null;

        this._tempo = 500;
        this._division = 1;

        this.ticks = 0;
        this.frames = 0;
        this.playing = false;

        this.barLength = 4;
        this.barRatio = 1; //lower number, divided by 4
    }

    activate(audioctx) {
        this.ctx = audioctx;
        this.seconds = audioctx.currentTime;
    }

    set tempo(value) {
        this._tempo = value;
    }

    set division(value) {
        this._division = value;
    }

    getTime() {
        return this.ctx.currentTime - this.seconds;
    }

    start() {
        if (this.playing) return;

        this.playing = true;

        this.seconds = this.ctx.currentTime;

        cancelAnimationFrame(this.frames)
        this.frames = requestAnimationFrame(() => this.tick())
    }

    tick() {
        if ( (this.ctx.currentTime - this.seconds) >= (this._tempo/1000) ) {
            this.seconds = this.ctx.currentTime;
            console.log("click")
        }
        this.frames = requestAnimationFrame(() => this.tick())
    }

    stop() {
        cancelAnimationFrame(this.frames)
    }
}