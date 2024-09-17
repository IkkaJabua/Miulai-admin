import styles from './ArtistPopup.module.scss';
import Image from 'next/image';
import ArtistPopupData from './ArtistPopupData/ArtistPopupData';
import ArtistPopupBtn from './ArtistPopupBtn/ArtistPopupBtn';
import ArtPopupCards from './ArtPopupCards/ArtPopupCards';
import { useState } from 'react';
import PlaylistTable from '../PlaylistTable/PlaylistTable';

interface Props {
    name: string;
    closeModal?: () => void;  // Accept closeModal function
}

const ArtistPopup = (props: Props) => {
    const [isPlaylistEdit, setPlaylistEdit] = useState(false)


    console.log('Props', props)
    return (
        <div className={styles.sss}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <div onClick={() => setPlaylistEdit(false)} className={styles.img}>
                        <Image src={'/icon/marcxniv-isari.svg'} alt='image' width={20} height={20} />
                    </div>

                    <span className={styles.font}>
                        {props.name}
                    </span>

                    <div className={styles.img} onClick={props.closeModal}>
                        <Image src={'/icon/x-gatishva.svg'} alt='close' width={20} height={20} />
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <ArtistPopupData
                        key1={!isPlaylistEdit ? 'Email' : 'Playlist Name'}
                        value1={'dolores.chambers@example.com'}
                        key2={'Registration Date'}
                        value2={'September 17, 2024 11:22'}
                        key3={'Playlists Created'}
                        value3={'4'}
                        userImage={'/image/userTestImage.png'}
                        imageStyle={'round'}
                    />
                    <ArtistPopupBtn />
                </div>
                {!isPlaylistEdit ?
                    <ArtPopupCards onEdit={() => { setPlaylistEdit(true) }} /> :
                    <PlaylistTable />
                }
            </div>
        </div>
    );
};

export default ArtistPopup;
