'use client'
import { title } from 'process'
// import styles from './UserPlaylist.module.scss'
import Image from 'next/image'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import styles from './UserPlaylist.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { albumDataState, albumIDState, authorIdStates, cardDataStates } from '@/app/states'
import axios from 'axios'


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
    const [albumButton, setAlbumButton] = useState(false)
    const [albumData, setAlbumdata] = useRecoilState<any>(albumDataState)
    const [data, setData] = useState()
    console.log(albumData,'albumData')
    const [authorId, setAuthorId] = useRecoilState(authorIdStates)


    const [albumID, setAlbumID] = useRecoilState(albumIDState)


    const [image, setimage] = useRecoilState<any>(cardDataStates)
    

    const [active, setActive] = useState()

    const [coverImage, csetCoverImage] = useState<any>()




    // useEffect(() => {

    //     axios.get(`https://interstellar-1-pdzj.onrender.com/album/${albumID}`).
    //         then((r) => {
    //             setAlbumdata(r.data.albums)
    //             setimage(r.data)
    //         },).
    //         catch(error => {
    //             console.log('there is something error', error)
    //         })


    // }, [click])


    return (
        <>
            {
                albumData?.map((item: any) => (
                    <div className={styles.container} key={item.id}>
                        <div className={styles.hoveredImage} >
                            {/* <Image className={styles.cellImage} src={`./icon/cardImage.svg`} width={170} height={136} alt='image' /> */}
                            <img className={styles.cellImage} src={item.file?.url} width={170} height={136} alt='image' />

                            <div className={styles.buttons}>
                                <div onClick={() => {
                                    props.setAlbums(false)
                                    props.setActive(true)
                                    props.setAlbumButton(true)
                                    setAlbumID(item.id)
                                }} className={styles.cellEdit}>
                                    <img src={'/icon/penPlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                                <div className={styles.cellDelete}>
                                    <img src={'/icon/deletePlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.font}>{item.albumName}</div>
                    </div>
                ))
            }
        </>
    )
}

UserPlaylist.displayName = 'UserPlaylist';
export default UserPlaylist;