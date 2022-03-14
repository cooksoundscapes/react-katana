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

    const KBRowOptions = ["none", "QWERT...", "ASDF...", "ZXCV..."];

    const selectKBRow = (value) => {
        const ind = KBRowOptions.findIndex( opt => opt === value);
        updateStore("keyboardRow", ind - 1)
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
                min={1}
                max={64}
                defaultValue={8}
                getValue={value => updateStore("slices", value) } >
                Slices:
            </NumberBox>
            <NumberBox 
                min={0}
                defaultValue={trackId}
                getValue={value => updateStore("group", value) } >
                Group:
            </NumberBox>
            <DropDownList 
                options={KBRowOptions}
                getValue={selectKBRow}
            />
        </div>
    )
}