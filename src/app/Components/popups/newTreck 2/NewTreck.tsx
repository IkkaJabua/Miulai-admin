import styles from './NewTreck.module.scss'






const NewTreck = () => {



    return (

        <div className={styles.container}>
            <div>
                <div>Track Names</div>
                <input className={styles.name} type="text" />
            </div>
            <div className={styles.twoFile}>
                <div>Upload Music file</div>
                <input className={styles.file}  type="file" />
            </div>

        </div>
    )

}

export default NewTreck