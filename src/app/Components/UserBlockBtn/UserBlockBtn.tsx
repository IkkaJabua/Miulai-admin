import Button from '../Button/Button';
import styles from './UserBlockBtn.module.scss';


const UserBlockBtn = () => {

    return(
        <Button title={'Delete'} className={styles.button} image={'/icon/klite.svg'} mode='unset' />
    )
}


export default UserBlockBtn;