import axios from 'axios'
import styles from './NewTreck.module.scss'
import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from 'react'
import { albumDataState, albumNameState, artistNAmeState, clikcState, newTrackRrecoState } from '@/app/states'
import { useRecoilState } from 'recoil'
import Cookies from 'js-cookie'





interface Props {
    onClick: () => void;
}

interface FormData {
    name: string;
    file: FileList;
}

const NewTreck = (props: Props) => {

    const [track, setTrack] = useState<boolean>()
    const [albumID, setAlbumID] = useRecoilState<any>(albumDataState)
    const [clickck, setClickck] = useRecoilState(clikcState)
    
    const [newTrackRreco, setNewTrackRreco] = useRecoilState(newTrackRrecoState)
    const [albumNameTwo, setAlbumNameTwo] = useRecoilState<any>(albumNameState)
    const [artistName, setArtistName] = useRecoilState<any>(artistNAmeState)
    const [albumNameNew, setAlbumNameNew] = useState<any>()
    const [artistNameNew, setArtistNameNew] = useState<any>()
    const [albumCover, setAlbumcover] = useState<any>()
    const token = Cookies.get('accessToken');






    useEffect(() => {

        axios.get(`https://interstellar-1-pdzj.onrender.com/album/${albumNameTwo}`).
            then((r) => {
                // setAlbumName(r.data.albumName)
                setAlbumNameNew(r.data.albumName)
                setArtistNameNew(r.data.artistName)
                setAlbumcover(r.data.file?.url)
                

            })

    }, [])



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (value: any) => {
        const data = new FormData()
        data.append('name', value.name)
        data.append('albumName', albumNameNew)
        // data.append('artistName', value.artistName)
        data.append('albumCover', albumCover)
        data.append('file', value.file[0])
        data.append('albumId', albumID)
        data.append('artistName', artistNameNew)






        axios.post(`https://interstellar-1-pdzj.onrender.com/music`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).
            then((r) => {
                setNewTrackRreco(false)
                setClickck(!clickck)
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
                    <Image src={'/icon/Upload.svg'} width={24} height={24} alt='upload' />
                </label>
                <input id={'upload-file'} className={styles.file} type="file"  {...register('file')} />
            </div>
            <input type='submit' value={'Save'} className={styles.button} />
        </form>
    );
}

export default NewTreck;
