import Button from '../Button/Button';
import styles from './UserAddBtn.module.scss';


const UserAddBtn = () => {

    return(
        <Button title={'Add'} className={styles.btn} mode='fill' image={'/icon/user-add.svg'} />
    )
}


export default UserAddBtn;