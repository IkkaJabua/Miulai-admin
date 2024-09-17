import styles from './addAlbum.module.scss'
import Button from '../../Button/Button'



const AddAlbum = () => {


    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <div>
                    Album  Cover  Photo
                </div>
                <div className={styles.wrapper}>
                    <input className={styles.photoInput} type='file' />
                </div>
            </div>
            <div className={styles.inputGap}>
                <div className={styles.inputWrapper}>
                    <div>Album Name </div>
                    <div>
                        <input className={styles.inputName} type='text' />
                    </div>
                </div>
                <input className={styles.date} type='text' />

                <div>

                    <div>
                        <Button title={'New Album'} className={styles.button} image='/icon/plus-img.svg' />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddAlbum