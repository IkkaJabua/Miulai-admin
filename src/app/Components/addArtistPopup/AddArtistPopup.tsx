import styles from './AddArtistPopup.module.scss'
import Button from '../Button/Button'
import Image from 'next/image'
import Card from '../Card/Card'
import UserPlaylist from '../UserPlaylist/UserPlaylist'
import { useState, type Dispatch, type SetStateAction } from 'react'

type Props = {
    setActive: Dispatch<SetStateAction<boolean>>;
}


const AddArtistPopup = (props:Props) => {
    const [albums, setAlbums] = useState(true)
    const [biography, setBiography] = useState(false)


    const AddArtistPopupData = [

        {
            image: 'popupImage.svg',
            name: 'Peggy Gou',
            TotalStreams: '267,400',
            TotalAlbums: '4',
            TotalSongs: '67',
            Biography: 'Peggy Gou (born July 3, 1991) is a South Korean DJ and producer based in Berlin. O',
            id: 1
        }
    ]



    return (
        <div className={styles.container}>
            {
                AddArtistPopupData.map(item => (
                    <>
                        <div className={styles.header}>
                            <div>
                                <Image src={'/icon/back.svg'} width={24} height={24} alt='back' />
                            </div>
                            <div className={styles.font}>{item.name}</div>
                            <div>
                                <Image onClick={() =>props.setActive(false)}  src={'/icon/delete.svg'} width={24} height={24} alt='back' />

                            </div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.bodyTexture}>
                                <Image src={`/image/${item.image}`} width={267} height={152} alt='artist name' />
                            </div>
                            <div className={styles.bodyTextureTwo}>
                                <div className={styles.artistInformation}>
                                    <div className={styles.text}>Total Streams</div>
                                    <div>{item.TotalStreams}</div>
                                </div>
                                <div className={styles.artistInformation}>
                                    <div className={styles.text}>Total Albums</div>
                                    <div>{item.TotalAlbums}</div>
                                </div>
                                <div className={styles.artistInformation}>
                                    <div className={styles.text}>Total Songs</div>
                                    <div>{item.TotalSongs}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.foterHeader}>
                                <div className={styles.footerMode}>
                                    <div onClick={() => {
                                        setAlbums(true)
                                        setBiography(false)

                                    }} className={albums ? styles.activefooterModeFont : styles.footerModeFont}>Albums</div>
                                    <div onClick={() => {
                                        setAlbums(false)
                                        setBiography(true)
                                    }}
                                        className={biography ? styles.activefooterModeFont : styles.footerModeFont}>
                                        Biography
                                    </div>
                                </div>
                                <div className={styles.buttonMain}>
                                    <Button mode={'fill'}
                                        title={'New Album'}
                                        className={'button'}
                                        image='/icon/plus.svg'
                                    />
                                </div>

                            </div>
                            <div className={styles.footerPLaylist}>
                                {
                                    albums ? <UserPlaylist /> : <div>{item.Biography}</div>
                                }

                            </div>

                        </div >
                    </>
                ))
            }
        </div >

    )
}

export default AddArtistPopup