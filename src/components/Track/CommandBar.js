import { LabelBox, DropDownList, Toggle, NumberBox } from "../atoms"
import styles from "./bar.module.scss"
import { useAudio } from "../../audio_core/AudioContext"

export default function CommandBar({trackId, syncMode, playStyle, name})
{
    const {setParam} = useAudio();

    const KBRowOptions = ["none", "QWERT...", "ASDF...", "ZXCV..."];

    const selectKBRow = (value) => {
        const ind = KBRowOptions.findIndex( opt => opt === value);
        setParam(trackId, "keyboardRow", ind - 1)
    }

    return (
        <div className={styles.container}>
            <LabelBox>{name}</LabelBox>
            <DropDownList 
                options={["Oneshot", "Looped", "Slices"]} 
                getValue={value => setParam(trackId, "playStyle", value) }
                setValue={playStyle}
            />
            <DropDownList 
                options={["Free", "Follow", "Lead"]}
                getValue={value => setParam(trackId, "syncMode", value) }
                setValue={syncMode}
            />
            <Toggle getValue={value => setParam(trackId, "beatSnap", value) } >
                Snap to Beat
            </Toggle>
            <Toggle getValue={value => setParam(trackId, "reverse", value) } >
                Reverse
            </Toggle>
            <NumberBox 
                min={1}
                max={64}
                defaultValue={8}
                getValue={value => setParam(trackId, "slices", value) } >
                Slices:
            </NumberBox>
            <NumberBox 
                min={0}
                defaultValue={trackId}
                getValue={value => setParam(trackId, "group", value) } >
                Group:
            </NumberBox>
            <DropDownList 
                options={KBRowOptions}
                getValue={selectKBRow}
            />
        </div>
    )
}