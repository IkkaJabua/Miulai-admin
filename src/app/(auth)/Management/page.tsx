'use client'
import Header from '@/app/Components/Header/Header'
import styles from './page.module.scss'
import Table from '@/app/Components/Table/Table'
import Button from '@/app/Components/Button/Button'
import Image from 'next/image'
import { useState } from 'react'
import ArtistPopup from '@/app/Components/ArtistPopup/ArtistPopup'
import AddArtistPopup from '@/app/Components/addArtistPopup/AddArtistPopup'
import AddNewArtistPopup from '../../Components/addNewArtistPopup/addNewArtistPopup'
import ArtistForm from '@/app/Components/addNewArtistPopup/artistForm/artistForm'
import AddAlbum from '@/app/Components/addNewArtistPopup/addAlbum/addAlbum'




const Managment = () => {
    const [active, setActive] = useState(true)


    const [popupActive, setPopupActive] = useState(0)

    // const onForward = () => {

    //     setPopupActive(popupActive + 1)
    // }

    // const onBackward = () => {

    //     setPopupActive(popupActive - 1)

    // }

    // if (popupActive === 0) {
    //     return <ArtistForm />
    // } else if (popupActive === 1) {
    //     return <AddAlbum />

    // }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.font}>
                Content  Management
            </div>
            <div className={styles.containerButtons}>
                <div>
                    <Button title={'Add'}
                        mode='fill'
                        className={styles.button}
                        onClick={() => setActive(!active)}
                        image='/icon/user-add.svg'
                    />
                </div>
                <div className={styles.export}>
                    <Image src={'/icon/export.svg'} height={24} width={24} alt='export' />
                </div>
            </div>
            <Table />
            {
                active &&
                <div className={styles.popup}>
                    <AddNewArtistPopup >
                        <ArtistForm />
                            {/* <AddAlbum /> */}

                    </AddNewArtistPopup>



                </div>
            }

        </div>

    )
}
export default Managment