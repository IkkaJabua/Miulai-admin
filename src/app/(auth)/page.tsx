'use client';
import ArtistPopupData from '../Components/ArtistPopup/ArtistPopupData/ArtistPopupData';
import Menu from '../Components/Menu/Menu';
import PopupHeader from '../Components/PopupHeader/PopupHeader';
import styles from './page.module.scss';


export default function Home() {

    return(
        <main className={styles.main}>
            <PopupHeader userName={'dwadwadwadw'} />
            <ArtistPopupData email={'dwadawdawdwdaw'} registrationDate={'dawdawdawd'} createdPlaylists={0} userImage={''} />
        </main> 
    )
}