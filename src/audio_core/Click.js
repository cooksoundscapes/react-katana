export default class Click
{
    constructor(destination) {
        this.tone = audioctx.createOscillator();
        this.tone.start();
        this.envelope = audioctx.createGain();
        this.envelope.gain.value = 0;
        this.tone.connect(this.envelope);
        this.envelope.connect(destination);
        this.clickLevel = .2;
    }
    play(freq) {
        this.tone.frequency.value = freq;
        this.envelope.gain.setValueAtTime(this.clickLevel, 0); //raise to clickLevel at 0 delay
        this.envelope.gain.setTargetAtTime(0, .05, .05);
    }
    adjustLevel(value) {
        this.clickLevel = Math.max(0, Math.min(1, value))
    }
}