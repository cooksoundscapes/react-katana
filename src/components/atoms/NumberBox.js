import styles from "./styles/numberbox.module.scss"

export function NumberBox({children, min, max, defaultValue, getValue}) 
{
    const changeValue = event => {
        const value = parseInt(event.target.value);
        
        if (!isNaN(value) && getValue) getValue(value)
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
                defaultValue={defaultValue}
                onChange={changeValue}
            />
        </label>
    )
}