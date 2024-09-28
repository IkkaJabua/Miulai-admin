import styles from './addAlbum.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authorIdStates, clickState } from '@/app/states';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
    onClick?: () => void;
    onDelete?: () => void;
}

interface FormValues {
    albumName: string;
    releaseDate: string;
    file?: FileList;  // Ensure you're expecting the correct file type
}

const AddAlbum = (props: Props) => {
    const [authorId] = useRecoilState(authorIdStates);  // Removed setAuthorId since it's not used
    const [message, setMessage] = useState<string>('');
    const [click, setClick] = useRecoilState(clickState);
    const [coverFileName, setCoverFileName] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit = (values: FormValues) => {
        const data = new FormData();
        data.append('albumName', values.albumName);
        data.append('releaseDate', values.releaseDate);
        data.append('authorId', String(authorId)); // Convert authorId to string
        if (file) data.append('file', file);

        const token = Cookies.get('accessToken');
        axios.post(`https://interstellar-1-pdzj.onrender.com/album`, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setMessage('Album created successfully');
            setClick(!click);
        })
        .catch(() => {
            setMessage('The album could not be created');
        });
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        props.onDelete?.();
    };

    const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setCoverFileName(e.target.files[0].name);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.cursor} onClick={props.onClick}>
                    <Image src={'/icon/back.svg'} height={24} width={24} alt='back' />
                </div>
                <div>Add New Album</div>
                <div className={styles.cursor} onClick={handleDelete}>
                    <Image src={'/icon/delete.svg'} height={24} width={24} alt='delete' />
                </div>
            </div>
            <div className={styles.formBody}>
                <div className={styles.inputWrapper}>
                    <div>Album Cover Photo</div>
                    <div className={styles.wrapper}>
                        <label htmlFor="file-upload-file">
                            <Image src={'/icon/Screenshots.svg'} width={90} height={90} alt='screenshot' />
                            <span>{coverFileName || 'Choose file'}</span>
                        </label>
                        <input className={styles.photoInput} id='file-upload-file' type='file'
                            {...register('file', { required: true })}
                            onChange={fileChange}
                        />
                    </div>
                </div>
                <div className={styles.inputGap}>
                    <div className={styles.inputWrapper}>
                        <div>Album Name</div>
                        <input className={styles.inputName} type='text'
                            {...register('albumName', { required: true })}
                        />
                    </div>
                    <div>Album Release Date</div>
                    <input className={styles.date} type='text'
                        {...register('releaseDate', { required: true })}
                    />
                    <div>{message}</div>
                </div>
            </div>
            <button className={styles.buttonTwo}>Save</button>
        </form>
    );
};

export default AddAlbum;
