import styles from "./slices.module.scss"

export default function GrayArea({trimBars, start, end})
{
    const flexAmount = start ? trimBars[0] : end ? (1 - trimBars[1]) : null;

    return (
        <div 
            className={styles.grayArea}
            style={{flex: flexAmount }}
        ></div>
    )
}