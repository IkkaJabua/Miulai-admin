import { useEffect, useState } from 'react';
import styles from './ArtistPopupData.module.scss';
import Image from 'next/image';
import axios from 'axios';


type Props = {
    key1: string;
    value1: string;
    key2: string;
    value2: string;
    key3: string;
    value3: string
    userImage: string;
    imageStyle: 'round' | 'normal'; 
    id: number;
}

const ArtistPopupData = (props: Props) => {
    

    const classes = [];
    if(props.imageStyle === 'round') classes.push(styles.round)
    else classes.push(styles.normal)

    return (
        <div className={styles.container}>
            <div> 
                {/* // <Image src={props.userImage} alt='image' width={152} height={152} className={styles.image} /> */}
                <Image src={props.userImage} alt='image' width={152} height={152} className={styles.image} />
            </div>
            <div className={styles.dataWrapper}>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>{props.key1}:</span>
                    <span className={styles.data}>{props.value1}</span>
                </div>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>{props.key2}:</span>
                    <span className={styles.data}>{props.value2}</span>
                </div>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>{props.key3}:</span>
                    <span className={styles.data}>{props.value3}</span>
                </div>
            </div>
        </div>
    )
}

export default ArtistPopupData;