// import { Button } from 'antd'
import styles from './artistForm.module.scss'
import { useForm, SubmitHandler } from "react-hook-form"
import Button from '../../Button/Button'






const ArtistForm = () => {



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()


    const onSubmit = (values: any) => {


    }


    return (

        <form className={styles.container}>
            <div className={styles.formBody}>
                <div >
                    <div>Artist Name </div>
                    <input className={styles.nameInput} type='text' />

                </div>
                <div >
                    <div>Biography</div>
                    <input className={styles.biographyInput} type='text' />

                </div>
            </div>
            <div className={styles.formBody}>
                <div className={styles.formBody}>
                    <div>Artist Photo</div>
                    <div className={styles.wrapper}>
                        <input className={styles.photoInput} type='file'  />
                    </div>

                </div>
                <div >
                    <div>
                        <Button title={'New Album'} className={styles.button}  image='/icon/plus-img.svg'  />
                    </div>

                </div>
            </div>
        </form>
    )
}

export default ArtistForm