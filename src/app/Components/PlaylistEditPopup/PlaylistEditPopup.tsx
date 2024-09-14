import ArtistPopupData from '../ArtistPopup/ArtistPopupData/ArtistPopupData';
import PopupHeader from '../PopupHeader/PopupHeader';
import styles from './PlaylistEditPopup.module.scss';



const PlaylistEditPopup = () => {

    return(
        <div className={styles.container}>
            <PopupHeader userName={'Dolores Chambers'} />
            
        </div>
    )
}

export default PlaylistEditPopup;