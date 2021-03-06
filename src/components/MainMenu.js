import styles from "../styles/menu.module.scss"
import { Button, FileButton } from "./atoms"
import { VolumeSlider, Transport } from "."
import { useAudio } from "../audio_core/AudioContext"

export function MainMenu(props) 
{
    const { createTrack, setMasterVolume } = useAudio();

    const setFiles = files => {
        files.forEach( file => createTrack(file) );
    }

    return (
        <aside className={styles.menuBody}>
            <FileButton fileList={setFiles}>Open local file</FileButton>
            <Button>Record Now</Button>
            <VolumeSlider label="Master" getVolume={setMasterVolume} />
            <Transport />
        </aside>
    )
}