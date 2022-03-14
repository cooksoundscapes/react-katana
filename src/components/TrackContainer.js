import styles from "../styles/main.module.scss"
import Track from "./Track"

export function TrackContainer(props) {
    return (
        <main className={styles.mainBody} >
            <Track />
        </main>
    )
}