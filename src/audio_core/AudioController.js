
export default class AudioController
{
    constructor() {
        this.ctx = null;
        this.masterVol = null;
        this.trackPlayers = [];
        this.id_generator = 0;
    }

    startDSP() {
        if (this.ctx) return;
        this.ctx = new window.AudioContext || window.webkitAudioContext;
        this.masterVol = this.ctx.createGain(1);
        this.masterVol.connect(this.ctx.destination)
    }

    setMasterVol(value) {
        if (!this.ctx) this.startDSP();
        this.masterVol.gain.value = value
    }

    addBuffer(buffer) {
        const newid = this.id_generator++; 
        this.trackPlayers.push({
            id: newid,
            buffer: buffer,
            playhead: null
        })
        return newid;
    }
}