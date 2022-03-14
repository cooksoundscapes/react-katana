import CommandBar from "./CommandBar"
import SliceArray from "./SliceArray"
//import styles from "track.module.scss"

export default function(props) {
    return (
        <div>
            <CommandBar name={props.name} trackId={props.trackId}/>
            <SliceArray trackId={props.trackId}/>
        </div>
    )
}