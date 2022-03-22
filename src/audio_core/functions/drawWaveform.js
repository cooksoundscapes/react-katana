
export function drawWaveform(audio, canvas)
{
    const audioData = audio.getChannelData(0);
    const width = canvas.width;
	const height = canvas.height;
	const ctx = canvas.getContext('2d');
	const x_jump = width/Math.max(1,audioData.length);

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    let gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0,'#6841C3');
        gradient.addColorStop(1,'#ff6d00');
    ctx.strokeStyle = gradient;

	ctx.moveTo(0,height/2);
	for (let i = 0; i < audioData.length; i++) {
		ctx.lineTo(i*x_jump,
		(audioData[i]*-1+1)*(height*.5));
	}
	ctx.stroke();
}