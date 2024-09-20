import styles from './addAlbum.module.scss'
import Button from '../../Button/Button'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import ArtistForm from '../artistForm/artistForm'

interface Props {
    onClick?: () => void,
    onDelete?: () => void,
    secondOnDelete?: () => void
}
const AddAlbum = (props: Props) => {
    const [artistForm, setArtistForm] = useState(false)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()

    if (artistForm) {
        return <ArtistForm />
    }


    const onSubmit = (values: any) => {

        const data: any = new FormData()
        data.append('file', values.file[0])
        data.append('albumName', values.albumName)
        data.append('artistName', values.artistName)
        data.append('releaseDate', values.releaseDate)



        axios.post('https://interstellar-1-pdzj.onrender.com/album', data).
            then((r) => {
                console.log(r)
            })

    }




    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.cursor}
                    onClick={props.onClick}>
                    <div onClick={() => setArtistForm(true)}>
                        <Image src={'/icon/back.svg'} height={24} width={24} alt='pen' />
                    </div>
                </div>
                <div>Add New Album</div>
                <div className={styles.cursor} onClick={props.onDelete}>
                    <Image src={'/icon/delete.svg'} height={24} width={24} alt='pen' />
                </div>

            </div>
            <div className={styles.formBody}>
                <div className={styles.inputWrapper}>
                    <div>
                        Album Cover Photo
                    </div>
                    <div className={styles.wrapper}>
                        <label htmlFor="file-upload-file">
                            <Image src={'/icon/Screenshots.svg'} width={90} height={90} alt='screenshot' />
                        </label>
                        <input className={styles.photoInput} id='file-upload-file' type='file'
                            {...register('file')}
                        />
                    </div>
                </div>
                <div className={styles.inputGap}>
                    <div className={styles.inputWrapper}>
                        <div>Album Name </div>
                        <div>
                            <input className={styles.inputName} type='text'
                                {...register('albumName')}
                            />
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <div>Artist Name</div>
                        <div>
                            <input className={styles.inputName} type='text'
                                {...register('artistName')}
                            />
                        </div>
                    </div>
                    <div>Album Release Date</div>

                    <input className={styles.date} type='text'
                        {...register('releaseDate')}

                    />
                </div>

            </div>
            <Button title={'Save'} className={styles.buttonTwo} />
        </form>
    )
}


export default AddAlbum