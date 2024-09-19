'use client';


// import { Table } from 'antd';
import Tables from '../Components/Table/Table'
import Button from '../Components/Button/Button';
import Card from '../Components/Card/Card';

import ArtistPopup from '../Components/ArtistPopup/ArtistPopup';
import ArtistPopupBtn from '../Components/ArtistPopup/ArtistPopupBtn/ArtistPopupBtn';
import ArtistPopupData from '../Components/ArtistPopup/ArtistPopupData/ArtistPopupData';
import Menu from '../Components/Menu/Menu';
import UserTable from '../Components/UserTable/usertable';
import styles from './page.module.scss';
import Table from '../Components/Table/Table';
import PlaylistTable from '../Components/PlaylistTable/PlaylistTable';
import PlaylistEditPopup from '../Components/PlaylistEditPopup/PlaylistEditPopup';
import Header from '../Components/Header/Header';
import TotalUser from '../Components/TotalUser/TotalUser';
import UserAddBtn from '../Components/UserAddBtn/UserAddBtn';
import UserDeleteBtn from '../Components/UserDeleteBtn/UserDeleteBtn';
import UserBlockBtn from '../Components/UserBlockBtn/UserBlockBtn';
import NewPassword from '../Components/NewPassword/NewPassword';
import SureToDelete from '../Components/SureToDelete/SureToDelete';




export default function Home() {

    return (
        <main className={styles.main}>       
            <Header />
            <div className={styles.user}>
                <h1 className={styles.h1}>User Managment</h1>
                <TotalUser totalUser={'211'} />
            </div>
            <div className={styles.buttons}>
                <UserAddBtn />
                <UserBlockBtn />
                <UserDeleteBtn />
            </div>
            <UserTable />
        </main>
    )
}