import { findTempo, findSyncRatio } from "./functions"
import Playhead from "./Playhead";

export default class AudioController
{
    constructor() {
        this.ctx = null;
        this.masterVol = null;
        this.trackPlayers = [];
        this.metronome = null;
        this.liveControllers = [
            "trimStart", 
            "trimEnd", 
            "playStyle",
            "level",
            "syncMode"
        ];
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

    set tempo(value) {
        this.metronome.tempo = value;
    }

    setMasterVol(value) {
        if (!this.ctx) this.startDSP();
        this.masterVol.gain.value = value
    }

    addBuffer(buffer, id, tempo) {
        this.trackPlayers.push( new Playhead(
            this.ctx, 
            id, 
            buffer, 
            tempo, 
            this.masterVol,
            () => this.metronome.tempo
        ));
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

        switch (param) {
            case "trimStart":
                track.trimStart = value;
                break;

            case "trimEnd":
                track.trimEnd = value;
                break;

            case "playStyle":
                track.setLoop(value);
                break;

            case "level":
                track.gainCtrl.gain.value = value;
                break;

            case "syncMode":
                track.sync = (value === "Follow");
                break;
        }
    }

    playTrack(slice, trackInfo) {
        const track = this.trackPlayers.find( track => track.id === trackInfo.id); 
        if (!track) { 
            console.log("track not found"); 
            return; 
        }
        const startSlice =(slice/trackInfo.slices);
        const sliceSize = (1/trackInfo.slices);

        track.prepare(this.ctx);

        switch (trackInfo.playStyle) {
            case "Oneshot":
                track.playOnce(startSlice);
                break;
            case "Looped":
                track.playLooped(startSlice);
                break;
            case "Slices":
                track.playOnce(startSlice, sliceSize);
        }
    }
}