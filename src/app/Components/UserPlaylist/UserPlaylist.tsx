'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './UserPlaylist.module.scss';
import { useRecoilState } from 'recoil';
import { albumDataState, albumIDState } from '@/app/states';
import Image from 'next/image';

interface Album {
    id: number;
    albumName: string;
    file?: { url: string };
}

interface Props {
    setActive: Dispatch<SetStateAction<boolean>>;
    setAlbums: Dispatch<SetStateAction<boolean>>;
    setAlbumButton: Dispatch<SetStateAction<boolean>>;
}

const UserPlaylist: React.FC<Props> = (props) => {
    const [albumData] = useRecoilState(albumDataState);
    const [, setAlbumID] = useRecoilState(albumIDState); // No need for type annotation here

    // Map AlbumData to Album, renaming `title` to `albumName`
    const mappedAlbumData: Album[] = albumData.map((data) => ({
        id: data.id,
        albumName: data.title, 
        file: data.file
    }));

    return (
        <>
            {mappedAlbumData?.map((item) => (
                <div className={styles.container} key={item.id}>
                    <div className={styles.hoveredImage}>
                        <Image
                            className={styles.cellImage}
                            src={item.file?.url || '/placeholder.png'}
                            width={170}
                            height={136}
                            alt={item.albumName}
                        />
                        <div className={styles.buttons}>
                            <div
                                onClick={() => {
                                    props.setAlbums(false);
                                    props.setActive(true);
                                    props.setAlbumButton(true);
                                    setAlbumID(item.id); // Set albumID to the selected album's id
                                }}
                                className={styles.cellEdit}
                            >
                                <Image src={'/icon/penPlaylist.svg'} width={24} height={24} alt={'edit button'} />
                            </div>
                            <div className={styles.cellDelete}>
                                <Image src={'/icon/deletePlaylist.svg'} width={24} height={24} alt={'delete button'} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.font}>{item.albumName}</div>
                </div>
            ))}
        </>
    );
};

UserPlaylist.displayName = 'UserPlaylist';
export default UserPlaylist;
