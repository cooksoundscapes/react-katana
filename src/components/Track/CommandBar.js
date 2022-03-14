import { LabelBox, DropDownList, Toggle, NumberBox } from "../atoms"
import styles from "./bar.module.scss"

export default function CommandBar(props)
{
    return (
        <div className={styles.container}>
            <LabelBox>Name</LabelBox>
            <DropDownList 
                options={["Oneshot", "Looped", "Slices"]} 
            />
            <DropDownList 
                options={["Free", "Follow", "Lead"]} 
            />
            <Toggle>Snap to Beat</Toggle>
            <Toggle>Reverse</Toggle>
            <NumberBox defaultValue={props.slices}>Slices:</NumberBox>
            <NumberBox defaultValue={props.group}>Group:</NumberBox>
        </div>
    )
}