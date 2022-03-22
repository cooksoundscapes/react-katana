import styles from "./styles/labelbox.module.scss"

export function LabelBox(props)
{
    return (
        <label className={styles.box}>
            {props.children}
        </label>
    )
}