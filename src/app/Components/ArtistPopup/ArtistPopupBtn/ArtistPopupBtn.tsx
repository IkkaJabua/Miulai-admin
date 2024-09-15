import Button from '../../Button/Button';
import styles from './ArtistPopupBtn.module.scss';
import Image from 'next/image';

type Props = {
    onClick?: () => void;
}

const ArtistPopupBtn = (props: Props) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Playlists</h2>
            <Button
                title={'New Playlist'}
                image={'/icon/plus-img.svg'}
                mode='fill'
                className={styles.button}
                onClick={props.onClick} />
        </div>
    )
}

export default ArtistPopupBtn;