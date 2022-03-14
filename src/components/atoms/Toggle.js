import { useState } from "react"
import styles from "./styles/toggle.module.scss"

export function Toggle({getValue, ...props})
{
    const [value, setValue] = useState(false)

    const valueChange = () => {
        setValue(!value)
        if (getValue) getValue(!value)
    }

    return (
        <label className={styles.container} >
            <input type="checkbox" value={value} onChange={valueChange} />
            <span className={styles.interactive}>
                {props.children}
            </span>
        </label>
    )
}