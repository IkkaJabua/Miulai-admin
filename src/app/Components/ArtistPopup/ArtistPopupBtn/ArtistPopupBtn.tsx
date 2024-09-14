import Button from '../../Button/Button';
import styles from './ArtistPopupBtn.module.scss';
import Image from 'next/image';



const ArtistPopupBtn = () => {

    return(
        <div className={styles.container}>
            <h2 className={styles.header}>Playlists</h2>
            <Button title={'New Playlist'} image={'/icon/plus-img.svg'} mode='fill' className={styles.button} />
        </div>
    )
}

export default ArtistPopupBtn;