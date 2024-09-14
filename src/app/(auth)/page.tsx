'use client';
import ArtistPopup from '../Components/ArtistPopup/ArtistPopup';
import ArtistPopupBtn from '../Components/ArtistPopup/ArtistPopupBtn/ArtistPopupBtn';
import ArtistPopupData from '../Components/ArtistPopup/ArtistPopupData/ArtistPopupData';
import Menu from '../Components/Menu/Menu';
import PlaylistEditPopup from '../Components/PlaylistEditPopup/PlaylistEditPopup';
import PopupHeader from '../Components/PopupHeader/PopupHeader';
import styles from './page.module.scss';


export default function Home() {

    return(
        <main className={styles.main}>
          {/* <ArtistPopup /> */}
            <PlaylistEditPopup />
        </main> 
    )
}