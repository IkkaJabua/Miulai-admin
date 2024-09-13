'use client';
import UserPopup from '../Components/UserPopup/UserPopup';
import styles from './page.module.scss';


export default function Home() {

    return(
        <main className={styles.main}>
            <UserPopup userName={'dwdwa'} userGmail={'dwadwdwa'} />
        </main>
    )
}