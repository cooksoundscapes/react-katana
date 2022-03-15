import styles from "./slices.module.scss"
import { useAudio } from "../../audio_core/AudioContext"
import React from "react";

export default function SliceArray
({sliceCount, trackId, audioIsLoaded, sliceLabels, trimBars})
{
    if (!audioIsLoaded) return null;

    const {play} = useAudio();

    if (!sliceCount) sliceCount = 8;
    const sliceArray = [];

    for (let i = 0; i < sliceCount; i++) {
        sliceArray.push
        (
            <React.Fragment key={i} >
            <button 
                className={styles.slice}
                onClick={ () => play(i, trackId) } 
            >
                {sliceLabels ? sliceLabels[i] : null}
            </button>
            { i != (sliceCount - 1) ? 
                <span className={styles.divisor}></span> 
            : null}
            </React.Fragment>
        )
    }
    return (
        <div 
            className={styles.slicesArea}
            style={{ flex:  (trimBars[1] - trimBars[0]) }}
        >   
            {sliceArray}
        </div>
        )
}