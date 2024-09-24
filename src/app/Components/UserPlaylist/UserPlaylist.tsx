'use client';
import Image from 'next/image';
import { type Dispatch, type SetStateAction } from 'react';
import styles from './UserPlaylist.module.scss';

interface Props {
    setActive: Dispatch<SetStateAction<boolean>>;
    setAlbums: Dispatch<SetStateAction<boolean>>;
}

const UserPlaylist = (props: Props) => {
    const playListData = [
        {
            title: 'Playlist name 1',
            icon: 'albumicon1.svg',
            id: 1,
        },
        {
            title: 'Playlist name 2',
            icon: 'albumicon2.svg',
            id: 2,
        },
        {
            title: 'Playlist name 3',
            icon: 'albumicon3.svg',
            id: 3,
        },
        {
            title: 'Playlist name 4',
            icon: 'albumicon4.svg',
            id: 4,
        },
        // Add more playlists as needed
    ];

    return (
        <>
            {playListData.map((item) => (
                <div className={styles.container} key={item.id}>
                    <div className={styles.hoveredImage}>
                        <Image
                            className={styles.cellImage}
                            src={`./icon/cardImage.svg`}
                            width={170}
                            height={136}
                            alt='image'
                        />
                        <div className={styles.buttons}>
                            <div
                                onClick={() => {
                                    props.setAlbums(false);
                                    props.setActive(true);
                                }}
                                className={styles.cellEdit}
                            >
                                <Image
                                    src={'/icon/penPlaylist.svg'}
                                    width={24}
                                    height={24}
                                    alt={'edit button'}
                                />
                            </div>
                            <div className={styles.cellDelete}>
                                <Image
                                    src={'/icon/deletePlaylist.svg'}
                                    width={24}
                                    height={24}
                                    alt={'delete button'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.font}>{item.title}</div>
                </div>
            ))}
        </>
    );
};

UserPlaylist.displayName = 'UserPlaylist';
export default UserPlaylist;
