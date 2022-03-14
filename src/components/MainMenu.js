import styles from "../styles/menu.module.scss"
import { Button, FileButton } from "./atoms"
import { VolumeSlider, Transport } from "."
import { useDispatch } from "react-redux"
import { startDSP, addTrack } from "../audio_core/redux_store"
import { useTracks } from "../audio_core/idb_store"

export function MainMenu(props) 
{
    const dispatch = useDispatch();

    const setFiles = files => 
    {
        dispatch(startDSP());

        files.forEach( file => {
            console.log(file)
            const fileInfo = {
                name: file.name,
                tempo: findTempo(file)
            }
            console.log(fileInfo)
            dispatch( addTrack(fileInfo) );
        });
    }

    return (
        <section className={styles.menuBody}>
            <FileButton fileList={setFiles}>Open local file</FileButton>
            <Button>Record Now</Button>
            <VolumeSlider label="Master" />
            <Transport />
        </section>
    )
}