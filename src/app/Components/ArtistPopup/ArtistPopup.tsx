import PopupHeader from '../PopupHeader/PopupHeader';
import styles from './ArtistPopup.module.scss';
import Image from 'next/image';
import ArtistPopupData from './ArtistPopupData/ArtistPopupData';
import ArtistPopupBtn from './ArtistPopupBtn/ArtistPopupBtn';
import ArtPopupCards from './ArtPopupCards/ArtPopupCards';
import { useState } from 'react';
import PlaylistEditPopup from '../PlaylistEditPopup/PlaylistEditPopup';




const ArtistPopup = () => {

    return (
        <div className={styles.container}>
            <PopupHeader userName={'Dolores Chambers'} />
            <div className={styles.wrapper}>
                <ArtistPopupData
                    key1={'Email'}
                    value1={'dolores.chambers@example.com'}
                    key2={'Registration Date'}
                    value2={'September 17, 2024 11:22'}
                    key3={'Playlists Created'}
                    value3={'4'}
                    userImage={'/image/userTestImage.png'}
                    imageStyle={'round'} />
                <ArtistPopupBtn />
            </div>
            <ArtPopupCards />
        </div>
    )
}


export default ArtistPopup;

