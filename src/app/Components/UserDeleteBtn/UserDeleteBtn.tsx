import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './UserDeleteBtn.module.scss';

type Props = {
    onDeleteClick?: () => void;
    id?: number;
}

const UserDeleteBtn = (props: Props) => {

    const [users, setUsers] = useState([])
    const fetching = () => {
        axios.get('https://interstellar-1-pdzj.onrender.com/user')
            .then((result) => {
                setUsers(result.data)

            })
    }
    useEffect(fetching, [])


    const userDelete = async (values: any) => {
        axios.delete(`https://interstellar-1-pdzj.onrender.com/user/${props.id}`)
            .then(r => {
                fetching()
            })
        props.onDeleteClick?.()

    }

    return(
        <Button onClick={userDelete} title={'Delete'} className={styles.button} image={'/icon/trash.svg'} mode='unset' />
    )
}


export default UserDeleteBtn;