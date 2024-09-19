import Button from '../Button/Button';
import styles from './SureToDelete.module.scss';

type Props = {
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
}

const SureToDelete = (props: Props) => {

    return (
        <div className={styles.container}>
            <p className={styles.text}>Are you sure you want to delete?</p>


            <div className={styles.wrapper}>
                <button className={styles.cancel} onClick={props.onCancelClick}>Cancel</button>
                <button className={styles.delete} onClick={props.onDeleteClick}>Delete</button>
            </div>

        </div>
    )
}

export default SureToDelete;