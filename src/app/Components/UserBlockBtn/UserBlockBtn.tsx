import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './UserBlockBtn.module.scss';
import Image from 'next/image';
import axios from 'axios';


// type Props = {
//     id?: number;
//     onBlockClick?: () => void;
// }

// const [users, setUsers] = useState([])
//     const fetching = (props: Props) => {
//         axios.get('https://interstellar-1-pdzj.onrender.com/user')
//             .then((result) => {
//                 setUsers(result.data)

//             })
//     }
//     // useEffect(fetching, [])


//     const userBlock = async (values: any) => {
//         axios.delete(`https://interstellar-1-pdzj.onrender.com/user/${props.id}`)
//             .then(r => {
//                 fetching()
//             })

//     }



const UserBlockBtn = () => {
    

    return (
        <Button title={'Block'}  className={styles.button} image={'/icon/klite.svg'} mode='unset' />
    )
}


export default UserBlockBtn;