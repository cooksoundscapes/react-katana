import styles from "./styles/dropdown.module.scss"

export function DropDownList({options, getValue, setValue,})
{
    if (!options) options = []

    const valueChange = event => {
        if (getValue) getValue(event.target.value)
    }

    return(
        <select className={styles.box} onChange={valueChange} value={setValue}>
        {
            options.map( (opt,i) => {
                return <option key={i}>{opt}</option>
            })
        }
        </select>
    )
}