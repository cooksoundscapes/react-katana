import styles from "./slices.module.scss"

export default function SliceArray({sliceCount ,...props})
{
    const generateSlices = () => {
        if (!sliceCount) sliceCount = 8;
        const sliceArray = [];

        for (let i = 0; i < sliceCount; i++) {
            sliceArray.push(
                <button key={i} className={styles.slice}>{i}</button>
            )
        }
        return sliceArray;
    }

    return (
        <div className={styles.container}>
            { generateSlices() }
        </div>
    )
}