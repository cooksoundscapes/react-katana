export function readAudioFile(file, audioctx)
{
    return new Promise( (resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            const arrayBuffer = reader.result;
            audioctx.decodeAudioData(arrayBuffer).then(
                audioBuffer => resolve(audioBuffer) 
            ), err => {
                reject(err)
            }
        }
    })
}