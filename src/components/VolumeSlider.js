import styles from "../styles/volslider.module.scss"
import { useState } from "react"

function rmsTodB(rms) {
    return 20 * Math.log10(rms);
}

export function VolumeSlider({label, getVolume}) 
{
    const [level, setLevel] = useState(100);

    const setValues = ({target}) => {
        let rmsLevel = target.value;
        if (getVolume) getVolume(Math.pow(rmsLevel/100, 3));
        setLevel(rmsLevel);
    }

    return (
        <label className={styles.container} >
            <p>{label}</p>
            <input 
                className={styles.slider}
                onChange={setValues}
                type="range" 
                min="0" max="100" 
                step="0.1" 
                value={level}
            />
            <div className={styles.hashMarks}>
                {[0, 20, 40, 60, 80, 100].map( (n, i) => {
                    return (<span key={i}>
                    {isFinite(rmsTodB(n)) ?
                        Math.round(rmsTodB(Math.pow(n/100, 3)))
                    :"-dB"}  
                    </span>)
                })}
            </div>
        </label>
    )   
}