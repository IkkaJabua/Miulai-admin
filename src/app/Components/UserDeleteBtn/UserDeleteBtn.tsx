import Button from '../Button/Button';
import styles from './UserDeleteBtn.module.scss';


const UserDeleteBtn = () => {

    return(
        <Button title={'Delete'} className={styles.button} image={'/icon/trash.svg'} mode='unset' />
    )
}


export default UserDeleteBtn;