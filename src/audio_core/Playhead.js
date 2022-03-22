import { findTempo } from "./functions";

export default class Playhead 
{
    constructor(audioctx, id, buffer, tempo, destination, getMasterTempo) {
        this.id = id;
        this.buffer = buffer;
        this.playhead = null;
        this.gainCtrl = audioctx.createGain(1);
        this.gainCtrl.connect(destination);
        this.isPlaying = false;
        this.stopTimer = 0;
        this.tempo = tempo;
        this._trimStart = 0;
        this._trimEnd = 1;
        this._sync = false;
        //arrow function
        this.getMasterTempo = getMasterTempo;
    }

    #getRealLength() {
        return this.buffer.duration * (this._trimEnd - this._trimStart);
    }

    #getStartPoint(realLength, startPoint) {
        return (this.buffer.duration * this._trimStart) + (realLength * startPoint);
    }

    #updateTempo() {
        const newLength = this.#getRealLength();
        this.tempo = findTempo(newLength);
        if(this.playhead)
            this.#setSpeed();
    }

    #setSpeed() {
        //should decide where masterTempo will come;
        if(this._sync)
            this.playhead.playbackRate.value = this.tempo / this.getMasterTempo();
        else this.playhead.playbackRate.value = 1;
    }

    set trimStart(value) {
        this._trimStart = value;

        this.#updateTempo();

        if (this.playhead) 
            this.playhead.loopStart = value * this.buffer.duration;
    }

    set trimEnd(value) {
        this._trimEnd = value;

        this.#updateTempo();

        if (this.playhead) 
            this.playhead.loopEnd = value * this.buffer.duration;
    }
    
    set sync(value) {
        this._sync = value;
        if (this.playhead)
            this.#setSpeed();
    }

    setLoop(value) {
        if (this.playhead)
            this.playhead.loop = value;
    }

    stop() {
        if (this.playhead) this.playhead.stop();
        clearTimeout(this.stopTimer)
    }

    prepare(audioctx) {
        this.stop();

        this.playhead = audioctx.createBufferSource();
        this.playhead.buffer = this.buffer;
        this.playhead.connect(this.gainCtrl);

        this.#setSpeed();
    }

    playLooped(startSlice) {
        const realLength = this.#getRealLength();
        const startPoint = this.#getStartPoint(realLength, startSlice);

        this.playhead.loop = true;
        this.playhead.loopStart = this._trimStart * this.buffer.duration;
        this.playhead.loopEnd = this._trimEnd * this.buffer.duration;

        this.playhead.start(0, startPoint);
        this.isPlaying = true;
    }

    playOnce(startSlice, sliceSize = null) {
        const realLength = this.#getRealLength();
        const startPoint = this.#getStartPoint(realLength, startSlice);

        let totalLength;
        if (sliceSize === null)
            totalLength = realLength - (realLength * startSlice);
        else
            totalLength = realLength * sliceSize;   

        this.playhead.start(0, startPoint, totalLength);

        this.stopTimer = setTimeout( () => this.isPlaying = false, totalLength);
        this.isPlaying = true;
    }
}