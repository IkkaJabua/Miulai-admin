'use client'
import { title } from 'process'
// import styles from './UserPlaylist.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import  styles from './UserPlaylist.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const UserPlaylist = () => {
    const router = useRouter()

    const playListData = [
        {
            title: 'Playlist name 1',
            icon: 'albumicon1.svg',
            id: 1,
        }, {
            title: 'Playlist name 2',
            icon: 'albumicon2.svg',
            id: 2,
        }, {
            title: 'Playlist name 3',
            icon: 'albumicon3.svg',
            id: 3,
        }, {
            title: 'Playlist name 4',
            icon: 'albumicon4.svg',
            id: 4,
        }, 
    //     {
    //         title: 'Playlist name 5',
    //         icon: 'albumicon5.svg',
    //         id: 5
    //     }
    ]


    return (
        <>
            {
                playListData.map((item) =>
                    <div className={styles.container} key={item.id} onClick={() => router.push(`playlists/${item.id}`)}
                    >
                        <div className={styles.hoveredImage} >
                            <Image className={styles.cellImage} src={`./icon/cardImage.svg`} width={170} height={136} alt='image' />
                            <div className={styles.buttons}>
                                <div className={styles.cellEdit}>
                                    <Image src={'/icon/penPlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                                <div className={styles.cellDelete}>
                                    <Image src={'/icon/deletePlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.font}>{item.title}</div>
                    </div>
                )
            }
        </>
    )
}

UserPlaylist.displayName = 'UserPlaylist';
export default UserPlaylist;