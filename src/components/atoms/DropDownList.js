import styles from "./styles/dropdown.module.scss"

export function DropDownList({options, ...props})
{
    if (!options) options = []

    return(
        <select className={styles.box}>
        {
            options.map( (opt,i) => {
                return <option key={i}>{opt}</option>
            })
        }
        </select>
    )
}