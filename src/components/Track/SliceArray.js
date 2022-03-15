import styles from "./slices.module.scss"
import { useAudio } from "../../audio_core/AudioContext"
import React, { useEffect, useRef, useState } from "react";
import { BarHandler, SpinLoader } from "../atoms"

export default function SliceArray({sliceCount, trackId, audioIsLoaded, sliceLabels})
{
    const {play, drawWave} = useAudio();
    const canvasRef = useRef();
    const [barsPosition, setBars] = useState([0, 1])

    useEffect( function drawWaveForm() {
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
                <React.Fragment key={i} >
                <button 
                    className={styles.slice}
                    onClick={ () => play(i, trackId) } >
                        {sliceLabels ? sliceLabels[i] : null}
                </button>
                { i != (sliceCount - 1) ? 
                    <span className={styles.divisor}></span> 
                : null}
                </React.Fragment>

            )
        }
        return sliceArray;
    }

    return (
        <>
        <div className={styles.handlersArea}></div>
        <div className={styles.container}>
            { !audioIsLoaded ? <SpinLoader />  : null }

            <canvas ref={canvasRef} />

            <BarHandler 
                max={barsPosition[1]}
                getValue={v => setBars(prev => [v, prev[1]])} 
                side="left"
            />

            { audioIsLoaded ? generateSlices() : null }

            <BarHandler 
                min={barsPosition[0]} 
                getValue={v => setBars(prev => [prev[0], v])} 
                startingPosition={1}
                side="right" 
            />
        </div>
        </>
    )
}