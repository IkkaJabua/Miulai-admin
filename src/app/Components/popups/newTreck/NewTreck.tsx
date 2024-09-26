import axios from 'axios'
import styles from './NewTreck.module.scss'
import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from 'react'
import { albumIDState } from '@/app/states'
import { useRecoilState } from 'recoil'




interface Props {
    onClick: () => void;
}

interface FormData {
    name: string;
    file: FileList;
}

const NewTreck = (props: Props) => {

    const [track, setTrack] = useState<boolean>()
    const [albumID, setAlbumID] = useRecoilState<any>(albumIDState)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (value: any) => {
        const data = new FormData()
        data.append('name', value.name)
        // data.append('artistName', value.artistName)
        data.append('file', value.file[0])
        data.append('albumId', albumID)


        axios.post(`https://interstellar-1-pdzj.onrender.com/music`, data).
        then((r) => {
            
            
        })


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.font}>Add New track</div>
                <Image onClick={props.onClick} src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
            </div>
            <div className={styles.gap}>
                <div>Track Names</div>
                <input className={styles.name} type="text" {...register('name', { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            {/* <div className={styles.gap}>
                <div>Artist Name</div>
                <input className={styles.name} type="text"  {...register('artistName')} />
            </div> */}
            <div className={styles.twoFile}>
                <div>Upload Music file</div>
                <label htmlFor="upload-file">
                    <Image  src={'/icon/Upload.svg'} width={24} height={24} alt='upload' />
                </label>
                <input id={'upload-file'} className={styles.file} type="file"  {...register('file')}/>
            </div>
            <input type='submit' value={'Save'} className={styles.button} />
        </form>
    );
}

export default NewTreck;
