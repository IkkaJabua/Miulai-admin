'use client';
import styles from './page.module.scss';
import Header from '../Components/Header/Header';
import TotalUser from '../Components/TotalUser/TotalUser';
import UserAddBtn from '../Components/UserAddBtn/UserAddBtn';
import UserDeleteBtn from '../Components/UserDeleteBtn/UserDeleteBtn';
import UserBlockBtn from '../Components/UserBlockBtn/UserBlockBtn';
import Usertable from '../Components/userTable/usertable';

export default function Home() {
    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.user}>
                <h1 className={styles.h1}>User Management</h1>
                <TotalUser totalUser={'211'} />
            </div>
            <div className={styles.buttons}>
                <UserAddBtn />
                <UserBlockBtn />
                <UserDeleteBtn />
            </div>
            <Usertable />
        </main>
    );
}
