'use client';

import Card from '../Components/Card/Card';
import styles from './page.module.scss';


export default function Home() {

    return(
        <main className={styles.main}>
            <Card header={''} image={'/image/card-default-image.png'} title={'dawda'} imageStyle={'normal'} />
        </main>
    )
}