import styles from "./slices.module.scss"

export default function GrayArea({trimBars, start, end})
{
    const flexAmount = start ? trimBars.start : end ? (1 - trimBars.end) : null;

    return (
        <div 
            className={styles.grayArea}
            style={{flex: flexAmount }}
        ></div>
    )
}