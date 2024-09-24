import axios from 'axios';
import Button from '../Button/Button';
import styles from './SureToDeleteSong.module.scss';

type Props = {
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
    id: number | string;
}

const SureToDelete = (props: Props) => {

    const SongDelete = async (values: any) => {
       await axios.delete(`http://10.10.50.238:3000/music/${props.id}`)
       
       
        .then(() => {
            alert('Song has deleted')
        })
        props.onDeleteClick?.()
    }

    return (
        <div className={styles.container}>
            <p className={styles.text}>Are you sure you want to delete?</p>


            <div className={styles.wrapper}>
                <button className={styles.cancel} onClick={props.onCancelClick}>Cancel</button>
                <button className={styles.delete} onClick={SongDelete}>Delete</button>
            </div>

        </div>
    )
}

export default SureToDelete;