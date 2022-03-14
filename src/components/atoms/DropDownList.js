import styles from "./styles/dropdown.module.scss"

export function DropDownList({options, getValue, ...props})
{
    if (!options) options = []

    const valueChange = event => {
        if (getValue) getValue(event.target.value)
    }

    return(
        <select className={styles.box} onChange={valueChange}>
        {
            options.map( (opt,i) => {
                return <option key={i}>{opt}</option>
            })
        }
        </select>
    )
}