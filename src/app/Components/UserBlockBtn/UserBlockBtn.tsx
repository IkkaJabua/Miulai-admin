import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './UserBlockBtn.module.scss';
import Image from 'next/image';
import axios from 'axios';


const UserBlockBtn = () => {
    

    return (
        <Button title={'Block'} className={styles.button} image={'/icon/klite.svg'} mode='unset' />
    )
}


export default UserBlockBtn;