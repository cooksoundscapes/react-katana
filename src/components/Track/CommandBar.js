import { LabelBox, DropDownList, Toggle, NumberBox } from "../atoms"
import styles from "./bar.module.scss"

export default function CommandBar(props)
{
    return (
        <div className={styles.container}>
            <LabelBox>{props.name}</LabelBox>
            <DropDownList 
                options={["Oneshot", "Looped", "Slices"]} 
            />
            <DropDownList 
                options={["Free", "Follow", "Lead"]} 
            />
            <Toggle>Snap to Beat</Toggle>
            <Toggle>Reverse</Toggle>
            <NumberBox defaultValue={8}>Slices:</NumberBox>
            <NumberBox defaultValue={props.trackId}>Group:</NumberBox>
        </div>
    )
}