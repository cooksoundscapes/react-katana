import styles from "../styles/main.module.scss"
import Track from "./Track"
import { useSelector } from "react-redux"
import { KeyboardSequencer } from "."
 
export function TrackContainer(props) 
{
    const trackList = useSelector(state => state.tracks)

    return (
        <main className={styles.mainBody} >
            <KeyboardSequencer/>
        {
            trackList.map( (track, i) => (
                <Track key={i} trackInfo={track} />
            ))
        }
        </main>
    )
}