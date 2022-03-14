import styles from "./slices.module.scss"
import { useAudio } from "../../audio_core/AudioContext"
import { useEffect, useRef, useState } from "react";
import { SpinLoader } from "../atoms"

export default function SliceArray({sliceCount, trackId, audioIsLoaded})
{
    const {play, drawWave} = useAudio();
    const canvasRef = useRef();

    useEffect( () => {
        if (audioIsLoaded) {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            drawWave(trackId, canvasRef.current)
        }
    }, [audioIsLoaded])

    const generateSlices = () => {
        if (!sliceCount) sliceCount = 8;
        const sliceArray = [];

        for (let i = 0; i < sliceCount; i++) {
            sliceArray.push(
                <button 
                    key={i} 
                    className={styles.slice}
                    onClick={ () => play(i, trackId) }
                ></button>
            )
        }
        return sliceArray;
    }

    return (
        <div className={styles.container}>
            { !audioIsLoaded ? <SpinLoader /> : null }
            <canvas ref={canvasRef} />
            { generateSlices() }
        </div>
    )
}