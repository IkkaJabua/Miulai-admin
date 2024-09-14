'use client';

// import { Table } from 'antd';
import Tables from '../Components/Table/Table'
import Button from '../Components/Button/Button';
import Card from '../Components/Card/Card';
import styles from './page.module.scss';


export default function Home() {

    return(
        <main className={styles.main}>
            <Tables />
         
        </main>
    )
}