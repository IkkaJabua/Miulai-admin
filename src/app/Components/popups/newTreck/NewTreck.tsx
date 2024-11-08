import axios from 'axios';
import styles from './NewTreck.module.scss';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { albumNameState, authorIdStates, clikcState, newTrackRrecoState } from '@/app/states';
import { useRecoilState } from 'recoil';
import { Spin } from 'antd'; // Importing Ant Design Spin component
import Cookies from 'js-cookie';

interface Props {
    onClick: () => void;
}

interface FormData {
    name: string;
    file: FileList;
}

const NewTreck: React.FC<Props> = (props) => {
    const [clickck, setClickck] = useRecoilState<boolean>(clikcState);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setNewTrackRreco] = useRecoilState<boolean>(newTrackRrecoState); // Assuming this is a boolean state
    const [albumNameTwo] = useRecoilState(albumNameState);
    const [albumNameNew, setAlbumNameNew] = useState<string | undefined>();
    const [artistNameNew, setArtistNameNew] = useState<string | undefined>();
    const [albumCover, setAlbumCover] = useState<string | undefined>();
    const [authorId] = useRecoilState<number>(authorIdStates);

    const token: string | undefined = Cookies.get('accessToken');

    useEffect(() => {
        if (albumNameTwo) {
            axios.get(`http://49.12.148.222:30469/album/${albumNameTwo}`)
                .then((response) => {
                    setAlbumNameNew(response.data.albumName);
                    setArtistNameNew(response.data.artistName);
                    setAlbumCover(response.data.file?.url);
                })
                .catch((error) => {
                    console.error('Error fetching album data:', error);
                });
        }
    }, [albumNameTwo]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (value: FormData) => {
        const data = new FormData();
        data.append('name', value.name);
        data.append('authorId', String(authorId));
        data.append('albumName', albumNameNew || ''); // Provide a fallback
        data.append('albumCover', albumCover || ''); // Provide a fallback
        data.append('file', value.file[0]);
        data.append('albumId', albumNameTwo || ''); // Provide a fallback
        data.append('artistName', artistNameNew || ''); // Provide a fallback

        setLoading(true); // Start loading

        axios.post(`http://49.12.148.222:30469/music`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                setNewTrackRreco(false);
                setClickck(!clickck);
            })
            .catch((error) => {
                console.error('Error submitting track:', error);
            })
            .finally(() => {
                setLoading(false); 
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.font}>Add New Track</div>
                <Image onClick={props.onClick} src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
            </div>
            <div className={styles.gap}>
                <div>Track Name</div>
                <input className={styles.name} type="text" {...register('name', { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            {/* Uncomment if you want to use Artist Name */}
            {/* <div className={styles.gap}>
                <div>Artist Name</div>
                <input className={styles.name} type="text" {...register('artistName')} />
            </div> */}
            <div className={styles.twoFile}>
                <div>Upload Music file</div>
                <label htmlFor="upload-file">
                    <Image src={'/icon/Upload.svg'} width={24} height={24} alt='upload' />
                </label>
                <input id={'upload-file'} className={styles.file} type="file" {...register('file', { required: true })} />
            </div>
            {loading ? (
                <div className={styles.loading}>
                    <Spin tip="Submitting..." size="default" />
                </div>
            ) : (
                <input type='submit' value={'Save'} className={styles.button} />
            )}
        </form>
    );
}

export default NewTreck;





