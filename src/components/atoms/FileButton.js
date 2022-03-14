import styles from "./styles/filebutton.module.scss"

export function FileButton({fileList, ...props})
{
    const setFiles = event => {
        const list = [...event.target.files];
        fileList(list)
    }

    return (
        <label className={styles.container} onChange={setFiles}>
            {props.children}
            <input type='file' accept='.wav, .mpeg' multiple />
		</label>
    )
}