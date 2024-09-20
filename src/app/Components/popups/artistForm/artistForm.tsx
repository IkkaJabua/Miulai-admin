// import { Button } from 'antd'
import styles from './artistForm.module.scss'
import { useForm, SubmitHandler } from "react-hook-form"
import Button from '../../Button/Button'
import Image from 'next/image'
import { useState } from 'react'
import AddAlbum from '../addAlbum/addAlbum'

interface Props {
    onClick?: () => void
}




const ArtistForm = (props: Props) => {
    const [deleted, setDeleted] = useState(false)
    const [addAlbum , setAddAlbum] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()
    if (deleted) {
        return 

    }

    if (addAlbum) {
        return <AddAlbum onDelete={() => setDeleted(true)} />
    }


    const onSubmit = (values: any) => {
        console.log(values)


    }


    return (

        <form className={styles.container}>
            <div className={styles.header}>
                <div>
                    {/* <Image src={'/icon/back.svg'} width={24} height={24} alt='back' /> */}
                </div>
                <div>
                    Add New Artist
                </div>
                <div className={styles.cursor} onClick={props.onClick}>
                    <Image src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.formBody}>
                    <div className={styles.inputGap}>
                        <div>Artist Name </div>
                        <input className={styles.nameInput} type='text' />

                    </div>
                    <div className={styles.inputGap}>
                        <div>Biography</div>
                        <input className={styles.biographyInput} type='text' />
                    </div>
                </div>
                <div className={styles.formBody}>
                    <div className={styles.formBody}>
                        <div>Artist Photo</div>
                        <div className={styles.photoFile}>
                            <input className={styles.photoInput} id='file-upload-file' type='file' />
                            <label htmlFor="file-upload-file">
                                <Image src={'/icon/Screenshots.svg'} width={90} height={90}  alt='screenshot'/>
                            </label>
                        </div>
                    </div>
                    <Button onClick={() => setAddAlbum(true)}  title={'New Album'} image='/icon/plus.svg' className={styles.button} />
                </div>
            </div>
            <Button title={'Save'} className={styles.buttonTwo}   />
        </form>
    )
}

export default ArtistForm