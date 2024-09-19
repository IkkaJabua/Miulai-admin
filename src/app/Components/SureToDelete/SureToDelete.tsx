import axios from 'axios';
import Button from '../Button/Button';
import styles from './SureToDelete.module.scss';

type Props = {
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
    id?: number;
}

const SureToDelete = (props: Props) => {

    const userDelete = async (values: any) => {
       await axios.delete(`https://interstellar-1-pdzj.onrender.com/user/${props.id}`)
        .then(() => {
            alert('User has deleted')
        })
        props.onDeleteClick?.()
    }

    return (
        <div className={styles.container}>
            <p className={styles.text}>Are you sure you want to delete?</p>


            <div className={styles.wrapper}>
                <button className={styles.cancel} onClick={props.onCancelClick}>Cancel</button>
                <button className={styles.delete} onClick={userDelete}>Delete</button>
            </div>

        </div>
    )
}

export default SureToDelete;