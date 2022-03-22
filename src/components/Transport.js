import styles from "../styles/transport.module.scss"
import PlayIcon from "../assets/play-icon.svg"
import PauseIcon from "../assets/pause-icon.svg"
import StopIcon from "../assets/stop-icon.svg"

export function Transport(props) 
{
    return (
        <div className={styles.container}>
            <button> <PlayIcon  /> </button>
            <span></span>
            <button> <PauseIcon /> </button>
            <span></span>
            <button> <StopIcon  /> </button>
        </div>
    )
}