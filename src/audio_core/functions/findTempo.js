
export function findTempo(duration)
{
    let tempo = duration * 1000;
    while (tempo > 800) {      // caps on 75 bpm
        tempo = tempo / 2;
    }
    return tempo;
}