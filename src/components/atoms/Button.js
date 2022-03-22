import styles from "./styles/button.module.scss"

export function Button(props) {
    return (
        <button className={styles.container} onClick={props.onClick} >
            {props.children}
        </button>
    )
}

