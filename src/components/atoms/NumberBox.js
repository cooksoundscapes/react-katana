import styles from "./styles/numberbox.module.scss"

export function NumberBox({children, min, max, getValue}) 
{
    const changeValue = event => {
        if (getValue) getValue(event.target.value)
    }

    return (
        <label className={styles.label}>
            {children}  
            {" "}
            <input 
                type="number"  
                className={styles.box} 
                min={min}
                max={max}
                onChange={changeValue}
            />
        </label>
        
    )
}