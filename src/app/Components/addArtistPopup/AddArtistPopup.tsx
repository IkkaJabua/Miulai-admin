import styles from './AddArtistPopup.module.scss'
import Button from '../Button/Button'

import Image from 'next/image'




const AddArtistPopup = () => {



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
                            <div>{item.name}</div>
                            <div>
                                <Image src={'/icon/delete.svg'} width={24} height={24} alt='back' />

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
                                    <div className={styles.footerModeFont}>Albums</div>
                                    <div className={styles.footerModeFont}>Biography</div>
                                </div>
                                <div className={styles.buttonMain}>
                                    <Button mode={'fill'}
                                        title={'New Album'}
                                        className={'button'}
                                        image='/icon/plus.svg'
                                    />
                                </div>

                            </div>

                        </div>
                    </>
                ))
            }
        </div>

    )
}

export default AddArtistPopup