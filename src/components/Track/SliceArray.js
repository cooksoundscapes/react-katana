import styles from "./slices.module.scss"
import { useAudio } from "../../audio_core/AudioContext"

export default function SliceArray({sliceCount , trackId, ...props})
{
    const {play} = useAudio();

    const generateSlices = () => {
        if (!sliceCount) sliceCount = 8;
        const sliceArray = [];

        for (let i = 0; i < sliceCount; i++) {
            sliceArray.push(
                <button 
                    key={i} 
                    className={styles.slice}
                    onClick={() => play(i, trackId)}
                >{i}</button>
            )
        }
        return sliceArray;
    }

    return (
        <div className={styles.container}>
            { generateSlices() }
        </div>
    )
}