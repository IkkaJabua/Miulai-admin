import styles from './Card.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import CardItems from '../CardItems/CardItems';

interface Props {
    header: string;
    image: string;
    subtitle?: string;
    title: string;
    imageStyle: 'normal' | 'round';
    id: number;
}

const Card = (props: Props) => {
    const radius = [styles.image];
    if (props.imageStyle === 'round') radius.push(styles.imageRounded)



    return (
        <div className={styles.wrapper}>
            <h3 className={styles.heading}>{props.header}</h3>
            <div className={styles.container}>
                <Image src={props.image} alt='image' width={190} height={162} className={radius.join(' ').trim()} />

                <div className={styles.union}>
                    <CardItems />
                </div>
                
                <span>{props.subtitle}</span>
                <h4>{props.title}</h4>
            </div>
        </div>
    )
}

export default Card;

