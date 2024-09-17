import ArtistPopupBtn from '../ArtistPopup/ArtistPopupBtn/ArtistPopupBtn';
import ArtistPopupData from '../ArtistPopup/ArtistPopupData/ArtistPopupData';
import PlaylistTable from '../PlaylistTable/PlaylistTable';
import MusicTable from '../Table/Table';
import styles from './PlaylistEditPopup.module.scss';



const PlaylistEditPopup = () => {

    return(
        <div className={styles.container}>

            <ArtistPopupData 
            userImage={'/image/card-default-image.png'} 
            imageStyle={'normal'} 
            key1={'Playlist Name'} 
            key2={'Created'} 
            key3={'Number of Tracks'} 
            value1={'Playlist name 4'}  
            value2={'September 17, 2024 11:22'}  
            value3={'5'} />
            <ArtistPopupBtn onClick={() => console.log('clicked')} /> 
            <PlaylistTable />
        </div>  
    )
}

export default PlaylistEditPopup;