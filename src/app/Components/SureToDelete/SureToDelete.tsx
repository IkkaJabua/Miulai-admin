import axios from 'axios';
import Button from '../Button/Button';
import styles from './SureToDelete.module.scss';
import { useState, useEffect } from 'react';

type Props = {
    onDeleteClick?: () => void;
    onCancelClick?: () => void;
    id: number | string;
}

const SureToDelete = (props: Props) => {

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







