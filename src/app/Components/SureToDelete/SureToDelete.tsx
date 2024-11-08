import axios from 'axios';
import styles from './SureToDelete.module.scss';

type Props = {
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
    onUserDeleted?: () => void;
    id: number | undefined;
}

const SureToDelete = (props: Props) => {


    const userDelete = async () => {
        axios.delete(`http://49.12.148.222:30469/user/${props.id}`)
        .then(() => {
            props.onDeleteClick?.()
            props.onCancelClick?.()
        })
        
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







