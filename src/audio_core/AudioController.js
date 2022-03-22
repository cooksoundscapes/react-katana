
export default class AudioController
{
    constructor() {
        this.ctx = null;
        this.masterVol = null;
        this.trackPlayers = [];
        this.metronome = null;
        this._tempo = 500;
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
            gainCtrl: null,
            isPlaying: false,
            stopTimer: 0
        })
    }
    getBufferById(id) {
        const buffObj = this.trackPlayers.find( trk => trk.id === id);
        if (buffObj) return buffObj.buffer;
    }

    changeLive(id, param, value) 
    {
        //this method should be called at param change, by the state manager;
        const track = this.trackPlayers.find( track => track.id === id); 
        if (!track) { console.log("track not found") ; return }
        if (!track.playhead) { console.log("track never played") ; return }

        switch (param) {
            case "trimStart":
                track.playhead.loopStart = value * track.buffer.duration;
                break;
            case "trimEnd":
                track.playhead.loopEnd = value * track.buffer.duration;
                break;
            case "playStyle":
                track.playhead.loop = (value == "Looped");
                break;
        }
    }

    playTrack(slice, trackInfo) {
        const track = this.trackPlayers.find( track => track.id === trackInfo.id); 

        if (!track) { console.log("track not found") ; return }
        
        if (track.playhead) track.playhead.stop();
        clearTimeout(track.stopTimer)

        track.playhead = this.ctx.createBufferSource();
        track.playhead.buffer = track.buffer;

        track.gainCtrl = this.ctx.createGain(trackInfo.level);
        track.gainCtrl.connect(this.masterVol);
        
        if (trackInfo.syncMode === "Follow") {
            const speed = trackInfo.tempo / this.tempo;
            track.playhead.playbackRate.value = speed;
        }

        track.playhead.connect(track.gainCtrl);

        const sliceRatio =(slice/trackInfo.slices);

        const duration = track.buffer.duration * (trackInfo.trimEnd - trackInfo.trimStart)
        
        const startPoint = (track.buffer.duration * trackInfo.trimStart) + (duration * sliceRatio);
        let length;

        track.isPlaying = true;

        switch (trackInfo.playStyle) {
            case "Oneshot":
                length = duration - (duration * sliceRatio);
                track.playhead.start(0, startPoint, length)
                break;
            case "Looped":
                track.playhead.loop = true;
                track.playhead.loopStart = trackInfo.trimStart * track.buffer.duration;
                track.playhead.loopEnd = trackInfo.trimEnd * track.buffer.duration;
                track.playhead.start(0, startPoint);
                break;
            case "Slices":
                length = duration * (1/trackInfo.slices)
                track.playhead.start(0, startPoint, length)
                break;
            default: 
                console.log("track", trackInfo.id, "playMode incorrect;")
                break;
        }
        if (trackInfo.playStyle !== "Looped")
            track.stopTimer = setTimeout( () => track.isPlaying = false, length);
    }
}