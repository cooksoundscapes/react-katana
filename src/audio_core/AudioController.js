
export default class AudioController
{
    constructor() {
        this.ctx = null;
        this.masterVol = null;
        this.trackPlayers = [];
    }

    static id_generator = 0;
    static generateId() {
        return this.id_generator++
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

    addBuffer(buffer, id) {
        this.trackPlayers.push({
            id: id,
            buffer: buffer,
            playhead: null,
            gainCtrl: null
        })
    }
    playTrack(slice, trackInfo) {
        const track = this.trackPlayers.find( track => track.id === trackInfo.id); 

        if (track.playhead) track.playhead.stop();

        track.playhead = this.ctx.createBufferSource();
        track.playhead.buffer = track.buffer;

        track.gainCtrl = this.ctx.createGain(trackInfo.level);
        track.gainCtrl.connect(this.masterVol);
        
        track.playhead.playbackRate.value = trackInfo.speed;

        track.playhead.connect(track.gainCtrl);

        const startPoint = (slice/trackInfo.slices) * track.buffer.duration;

        let length;

        switch (trackInfo.playStyle) {
            case "oneshot":
                length = track.buffer.duration - (track.buffer.duration * (slice/trackInfo.slices));
                console.log(length)
                track.playhead.start(0, startPoint, length)
                break;
            case "looped":
                track.playhead.loop = true;
                track.playhead.start(0, startPoint);
                break;
            case "slices":
                length = track.buffer.duration * (1/trackInfo.slices)
                track.playhead.start(0, startPoint, length)
                break;
            default: 
                console.log("track", trackInfo.id, "playMode incorrect;")
                break;
        }
    }
}