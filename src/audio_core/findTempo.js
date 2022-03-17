import bpm_or_ms from "./bpm_or_ms"

export default function findTempo(duration)
{
    let tempo = duration * 1000;
    while (tempo > 800) {      // caps on 75 bpm
        tempo = tempo / 2;
    }
    return tempo;
}