import styles from './AddArtistPopup.module.scss';
import Button from '../Button/Button';
import Image from 'next/image';
import UserPlaylist from '../UserPlaylist/UserPlaylist';
import { useState, type Dispatch, type SetStateAction } from 'react';
import Tables from '../PlaylistTable/PlaylistTable';
import NewTreck from '../popups/newTreck/NewTreck';
import AddAlbum from '../popups/addAlbum/addAlbum';

type Props = {
    setActive: Dispatch<SetStateAction<boolean>>;
    key1: string;
    key2: string;
    key3: string;
    value1: string;
    value2: string;
    value3: string;
    image: string;
    onClick: () => void;
};

const AddArtistPopup = (props: Props) => {
    const [albums, setAlbums] = useState(true);
    const [biography, setBiography] = useState(false);
    const [active, setActive] = useState(false);
    const [newTrack, setNewTrack] = useState(false);
    const [createAlbum, setCreateAlbum] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const AddArtistPopupData = [
        {
            image: 'popupImage.svg',
            name: 'Peggy Gou',
            TotalStreams: '267,400',
            TotalAlbums: '4',
            TotalSongs: '67',
            Biography: 'Peggy Gou (born July 3, 1991) is a South Korean DJ and producer based in Berlin. O',
            id: 1,
        },
    ];

    if (deleted) {
        return null; // Return null to not render anything
    }

    if (createAlbum) {
        return (
            <div className={styles.container}>
                <AddAlbum onClick={() => setCreateAlbum(false)} onDelete={() => setDeleted(true)} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {AddArtistPopupData.map((item) => (
                <div key={item.id}>
                    <div className={styles.header}>
                        <div onClick={() => {
                            setActive(false);
                            setAlbums(true);
                            setBiography(false);
                        }}>
                            <Image src={'/icon/back.svg'} width={24} height={24} alt='back' />
                        </div>
                        <div className={styles.font}>{item.name}</div>
                        <div>
                            <Image onClick={props.onClick} src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.bodyTexture}>
                            <Image src={`/image/${props.image}`} width={267} height={152} alt='artist name' />
                        </div>
                        <div className={styles.bodyTextureTwo}>
                            <div className={styles.artistInformation}>
                                <div className={styles.text}>{props.key1}</div>
                                <div>{props.value1}</div>
                            </div>
                            <div className={styles.artistInformation}>
                                <div className={styles.text}>{props.key2}</div>
                                <div>{props.value2}</div>
                            </div>
                            <div className={styles.artistInformation}>
                                <div className={styles.text}>{props.key3}</div>
                                <div>{props.value3}</div>
                            </div>
                        </div>
                    </div>
                    {newTrack && (
                        <div className={styles.newTreck}>
                            <NewTreck onClick={() => setNewTrack(false)} />
                        </div>
                    )}
                    <div className={styles.footer}>
                        <div className={styles.foterHeader}>
                            <div className={styles.footerMode}>
                                {!active && (
                                    <div onClick={() => {
                                        setAlbums(true);
                                        setBiography(false);
                                    }} className={albums ? styles.activefooterModeFont : styles.footerModeFont}>
                                        Albums
                                    </div>
                                )}
                                {!active && (
                                    <div onClick={() => {
                                        setAlbums(false);
                                        setBiography(true);
                                    }} className={biography ? styles.activefooterModeFont : styles.footerModeFont}>
                                        Biography
                                    </div>
                                )}
                                {active && <div>Album Tracks</div>}
                            </div>
                            <div className={styles.buttonMain}>
                                {albums ? (
                                    <Button
                                        mode={'fill'}
                                        onClick={() => setCreateAlbum(true)}
                                        title={'New Album'}
                                        className={'button'}
                                        image='/icon/plus.svg'
                                    />
                                ) : (
                                    <Button
                                        onClick={() => setNewTrack(!newTrack)}
                                        mode={'fill'}
                                        title={'New Track'}
                                        className={'button'}
                                        image='/icon/plus.svg'
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.footerPLaylist}>
                            {albums && <UserPlaylist setAlbums={setAlbums} setActive={setActive} />}
                            {biography && (
                                <div>
                                    A biography, or simply bio, is a detailed description of a person&apos;s life. It involves more than just basic facts like education, work, relationships, and death.
                                </div>
                            )}
                            {active && <Tables />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddArtistPopup;
