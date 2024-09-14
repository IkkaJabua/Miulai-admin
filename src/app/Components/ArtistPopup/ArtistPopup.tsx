import PopupHeader from '../PopupHeader/PopupHeader';
import styles from './ArtistPopup.module.scss';
import Image from 'next/image';
import ArtistPopupData from './ArtistPopupData/ArtistPopupData';
import ArtistPopupBtn from './ArtistPopupBtn/ArtistPopupBtn';
import ArtPopupCards from './ArtPopupCards/ArtPopupCards';


const ArtistPopup = () => {

    return (
        <div className={styles.container}>
            <PopupHeader userName={'Dolores Chambers'} />
            <div className={styles.wrapper}>
                <ArtistPopupData email={'dolores.chambers@example.com'}
                registrationDate={'September 17, 2024 11:22'}
                createdPlaylists={4} userImage={'/icon/testUserImage.png'} 
                imageStyle={'round'} />
                <ArtistPopupBtn />
            </div>
            <ArtPopupCards />
        </div>
    )
}


export default ArtistPopup;