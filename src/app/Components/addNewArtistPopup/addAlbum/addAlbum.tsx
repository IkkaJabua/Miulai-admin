import styles from './addAlbum.module.scss'
import Button from '../../Button/Button'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'




const AddAlbum = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()


    const onSubmit = (values: any) => {

        const data: any = new FormData()
        data.append('file', values.file[0])
        data.append('albumName', values.albumName)
        data.append('releaseDate', values.releaseDate)



        axios.post('https://interstellar-1-pdzj.onrender.com/album', data).
            then((r) => {
                console.log(r)
            })

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.inputWrapper}>
                <div>
                    Album Cover Photo
                </div>
                <div className={styles.wrapper}>
                    <input className={styles.photoInput} type='file'
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
                <div>Album Release Date</div>

                <input className={styles.date} type='text'
                    {...register('releaseDate')}

                />

                <div>

                    <div>
                        <Button title={'New Album'} className={styles.button} image='/icon/plus-img.svg' />
                    </div>
                </div>
            </div>
        </form>
    )
}


export default AddAlbum