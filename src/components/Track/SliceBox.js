import styles from "./slices.module.scss"
import { useAudio } from "../../audio_core/AudioContext"
import { useEffect, useRef } from "react";
import { SpinLoader } from "../atoms"
import SliceArray from "./SliceArray";
import TrimBars from "./TrimBars";
import GrayArea from "./GrayArea";

export default function SliceBox({trackId, audioIsLoaded, sliceCount, sliceLabels})
{
    const {drawWave} = useAudio();
    const canvasRef = useRef();

    useEffect( function drawWaveForm() {
        if (audioIsLoaded) {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            drawWave(trackId, canvasRef.current)
        }
    }, [audioIsLoaded])

    return (
        <>
        <div className={styles.handlersArea}></div>
        <div className={styles.container}>
            { !audioIsLoaded ? <SpinLoader />  : null }

            <canvas ref={canvasRef} />
            
            <TrimBars trackId={trackId}>
                <GrayArea start/>
                <SliceArray 
                    audioIsLoaded={audioIsLoaded}
                    sliceCount={sliceCount} 
                    trackId={trackId}
                    sliceLabels={sliceLabels}
                />
                <GrayArea end/>
            </TrimBars>
        </div>
        </>
    )
}