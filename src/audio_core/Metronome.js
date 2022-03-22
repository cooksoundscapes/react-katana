export default class Metronome
{
    constructor() {
        this.ctx = null;
        this.seconds = null;

        this.tempo = 500;
        this.division = 1;

        this.ticks = 0;
        this.frames = 0;
        this.playing = false;
        this._sound = null;

        this.barLength = 4;
        this.barRatio = 1; //lower number, divided by 4

        this.actionsPerFrame = [];
        this.actionsPerTick = [];
    }

    set sound(generator) {
        this._sound = generator;
    }

    activate(audioctx) {
        if (this.ctx) return;
        this.ctx = audioctx;
        this.seconds = audioctx.currentTime;
        this.start();
    }

    getTime() {
        return this.ctx.currentTime - this.seconds;
    }

    start() {
        if (this.playing) return;

        this.playing = true;

        this.seconds = this.ctx.currentTime;

        cancelAnimationFrame(this.frames)
        this.frames = requestAnimationFrame(() => this.#next())
    }

    #next() {
        this.actionsPerFrame.forEach(action => action());

        if ( (this.ctx.currentTime - this.seconds) >= (this.tempo/1000) ) {
            this.seconds = this.ctx.currentTime;
            this.actionsPerTick.forEach(action => action());    
        }
        this.frames = requestAnimationFrame(() => this.#next())
    }

    stop() {
        cancelAnimationFrame(this.frames)
    }
}