import { LabelBox, DropDownList, Toggle, NumberBox } from "../atoms"
import styles from "./bar.module.scss"
import { useDispatch } from "react-redux"
import { changeTrack } from "../../audio_core/redux_store"

export default function CommandBar({trackId, ...props})
{
    const dispatch = useDispatch();

    const updateStore = (param, value) => {
        dispatch( 
            changeTrack({id: trackId, [param]: value}) 
        )
    }

    return (
        <div className={styles.container}>
            <LabelBox>{props.name}</LabelBox>
            <DropDownList 
                options={["Oneshot", "Looped", "Slices"]} 
                getValue={value => updateStore("playStyle", value) }
            />
            <DropDownList 
                options={["Free", "Follow", "Lead"]}
                getValue={value => updateStore("syncMode", value) }
            />
            <Toggle getValue={value => updateStore("beatSnap", value) } >
                Snap to Beat
            </Toggle>
            <Toggle getValue={value => updateStore("reverse", value) } >
                Reverse
            </Toggle>
            <NumberBox 
                defaultValue={8}
                getValue={value => updateStore("slices", value) } >
                Slices:
            </NumberBox>
            <NumberBox 
                defaultValue={trackId}
                getValue={value => updateStore("group", value) } >
                Group:
            </NumberBox>
        </div>
    )
}