import styles from './addNewArtistPopup.module.scss'
import Button from '../Button/Button'
import type { ReactNode } from 'react'

type Props=  {
    children: ReactNode
}

const AddNewArtistPopup = (props: Props) => {


    return(
        <div className={styles.container}>
            <div className={styles.font}>Add New Artist</div>
            {props.children}
            <Button title={'Save'} className={styles.button} />

        </div>
    )
}

export default AddNewArtistPopup