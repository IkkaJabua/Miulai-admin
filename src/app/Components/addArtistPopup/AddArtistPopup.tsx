import styles from './AddArtistPopup.module.scss'
import Button from '../Button/Button'
import Image from 'next/image'
import Card from '../Card/Card'
import UserPlaylist from '../UserPlaylist/UserPlaylist'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import Tables from '../PlaylistTable/PlaylistTable'
import NewTreck from '../popups/newTreck/NewTreck'
import AddAlbum from '../popups/addAlbum/addAlbum'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { authorIdStates, cardDataStates } from '@/app/states'

type Props = {
    setActive: Dispatch<SetStateAction<boolean>>;
    secondOnDelete?: () => void,
    onClick?: () => void
}

interface album {
    title: string;
    img: string;
    id: number

}

const AddArtistPopup = (props: Props) => {
    const [albums, setAlbums] = useState(true)
    const [biography, setBiography] = useState(false)
    const [active, setActive] = useState(false)
    const [newTrack, setNewTrack] = useState(false)
    const [createAlbum, setCreateAlbum] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [albumButton, setAlbumButton] = useState(false)
    const [playlistData, setPlaylistData] = useRecoilState(cardDataStates)
    const [authorId, setAuthorId] = useRecoilState(authorIdStates)
    const [albumData, setAlbumData] = useState()

    const [authorData, setAuthorData] = useState<any>()


    useEffect(() => {

        axios.get(`https://interstellar-1-pdzj.onrender.com/author/${authorId}`).
            then((r) => {
                setAuthorData(r.data)

                // console.log('aq mere albomshi chavwer , recoil albomis cvladshi informacias iqiT waviReb da davmapav amis mixedviiiiiT')
                
                // aq rac weria heshi am heshze gavushveb albomis damatgebas aidit da chavamateb aqedan,
                // am aids recoil rame cvladshi chaviwer da albomshi wavigeb 

            },).
            catch(error => {
                console.log('there is something error', error)
            })


    }, [])

    if (deleted) {
        return
    }

    if (createAlbum) {
        return <div className={styles.container}>
            <AddAlbum onClick={() => setCreateAlbum(false)} onDelete={() => setDeleted(true)} />
        </div>
    }


    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <div onClick={() => {
                    setActive(false)
                    setAlbums(true)
                    setBiography(false)
                    setAlbumButton(false)
                }}>
                    <img src={'/icon/back.svg'} width={24} height={24} alt='back' />
                </div>
                <div className={styles.font}>{authorData?.firstName} {authorData?.lastName}</div>
                <div>
                    <img onClick={props.onClick} src={'/icon/delete.svg'} width={24} height={24} alt='back' />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.bodyTexture}>
                    <img src={authorData?.files[0]?.url} width={267} height={152} alt='artist name' />
                </div>
                <div className={styles.bodyTextureTwo}>
                    <div className={styles.artistInformation}>
                        <div className={styles.text}>tolat album</div>
                        <div>I Hear You</div>
                    </div>
                    <div className={styles.artistInformation}>
                        <div className={styles.text}>release date</div>
                        <div>  January 15, 2015</div>
                    </div>
                    <div className={styles.artistInformation}>
                        <div className={styles.text}> songs</div>
                        <div>5</div>
                    </div>
                </div>
            </div>
            {
                newTrack &&
                <div className={styles.newTreck}>
                    <NewTreck onClick={() => setNewTrack(false)} />
                </div>
            }
            <div className={styles.footer}>
                <div className={styles.foterHeader}>
                    <div className={styles.footerMode}>
                        {
                            !active &&
                            <div onClick={() => {
                                setAlbums(true)
                                setBiography(false)
                                setAlbumButton(false)

                            }} className={albums ? styles.activefooterModeFont : styles.footerModeFont}>
                                Albums
                            </div>
                        }
                        {
                            !active &&
                            <>
                                <div onClick={() => {
                                    setAlbums(false)
                                    setBiography(true)
                                    setAlbumButton(false)

                                }}
                                    className={biography ? styles.activefooterModeFont : styles.footerModeFont}>
                                    Biography
                                </div>
                            </>
                        }
                        {
                            active &&
                            <div>
                                Album Tracks
                            </div>
                        }
                    </div>
                    <div className={styles.buttonMain}>
                        {
                            albums &&
                            <Button mode={'fill'}
                                onClick={() => setCreateAlbum(true)}
                                title={'New Album'}
                                className={'button'}
                                image='/icon/plus.svg'
                            />
                        }
                        {
                            albumButton &&
                            <Button
                                onClick={() => setNewTrack(!newTrack)}
                                mode={'fill'}
                                title={'New Track'}
                                className={'button'}
                                image='/icon/plus.svg'
                            />
                        }
                        {
                            biography &&
                            <Button
                                // onClick={() => setNewTrack(!newTrack)}
                                title={'Edit'}
                                className={styles.biographyButton}
                                image='/icon/pen.svg'
                            />
                        }

                    </div>
                </div>
                <div className={styles.footerPLaylist}>
                    {
                        albums &&
                        <UserPlaylist setAlbumButton={setAlbumButton} setAlbums={setAlbums} setActive={setActive} />

                    }
                    {
                        biography &&
                        <div>
                            {authorData?.biography}
                        </div>
                    }
                    {
                        active && <Tables />

                    }
                </div>
            </div>
        </div >

    )
}

export default AddArtistPopup


