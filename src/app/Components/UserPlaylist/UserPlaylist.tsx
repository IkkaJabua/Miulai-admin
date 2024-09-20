'use client'
import { title } from 'process'
// import styles from './UserPlaylist.module.scss'
import Image from 'next/image'
import { useState, type Dispatch, type SetStateAction } from 'react'
import styles from './UserPlaylist.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { cardDataStates } from '@/app/states'


interface Props {
    setActive: Dispatch<SetStateAction<boolean>>;
    setAlbums: Dispatch<SetStateAction<boolean>>;
    setAlbumButton: Dispatch<SetStateAction<boolean>>;
    image?: string;
    title?: string;
    id?: number;
    category?: string;


}


const UserPlaylist = (props: Props) => {
    const router = useRouter()
    const [playlistData, setPlaylistData] = useRecoilState<Props>(cardDataStates)
    const [albumButton, setAlbumButton] = useState(false)


    const [active, setActive] = useState()

    // const playListData = [
    //     {
    //         title: 'Playlist name 1',
    //         icon: 'albumicon1.svg',
    //         id: 1,
    //     }, {
    //         title: 'Playlist name 2',
    //         icon: 'albumicon2.svg',
    //         id: 2,
    //     }, {
    //         title: 'Playlist name 3',
    //         icon: 'albumicon3.svg',
    //         id: 3,
    //     }, {
    //         title: 'Playlist name 4',
    //         icon: 'albumicon4.svg',
    //         id: 4,
    //     },
        //     {
        //         title: 'Playlist name 5',
        //         icon: 'albumicon5.svg',
        //         id: 5
        //     }
    // ]


    return (
        // <>
        //     {
        //         playlistData.map((item) =>
                    <div className={styles.container} key={playlistData.id}
                    >
                        <div className={styles.hoveredImage} >
                            {/* <Image className={styles.cellImage} src={`./icon/cardImage.svg`} width={170} height={136} alt='image' /> */}
                            <img className={styles.cellImage} src={playlistData.image} width={170} height={136} alt='image' />

                            <div className={styles.buttons}>
                                <div onClick={() => {
                                    props.setAlbums(false)
                                    props.setActive(true)
                                    props.setAlbumButton(true)
                                }} className={styles.cellEdit}>
                                    <img src={'/icon/penPlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                                <div className={styles.cellDelete}>
                                    <img src={'/icon/deletePlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.font}>{playlistData.id}</div>
                    </div>
//                 )
//             }
//         </>
    )
}

UserPlaylist.displayName = 'UserPlaylist';
export default UserPlaylist;