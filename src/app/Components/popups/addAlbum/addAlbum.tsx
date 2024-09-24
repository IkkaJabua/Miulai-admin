import styles from './addAlbum.module.scss';
import Button from '../../Button/Button';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import ArtistForm from '../artistForm/artistForm';

interface Props {
    onClick?: () => void;
    onDelete?: () => void;
}

interface FormValues {
    file: FileList; // Change to the correct type for file input
    albumName: string;
    releaseDate: string;
}

const AddAlbum = (props: Props) => {
    const [artistForm, setArtistForm] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm<FormValues>(); // Specify the form values type

    const onSubmit = (values: FormValues) => {
        const data = new FormData();
        data.append('file', values.file[0]);
        data.append('albumName', values.albumName);
        data.append('releaseDate', values.releaseDate);

        axios.post('https://interstellar-1-pdzj.onrender.com/album', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error uploading album:', error);
            });
    };

    if (artistForm) {
        return <ArtistForm />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.cursor} onClick={props.onClick}>
                    <div onClick={() => setArtistForm(true)}>
                        <Image src={'/icon/back.svg'} height={24} width={24} alt='back' />
                    </div>
                </div>
                <div>Add New Album</div>
                <div className={styles.cursor} onClick={props.onDelete}>
                    <Image src={'/icon/delete.svg'} height={24} width={24} alt='delete' />
                </div>
            </div>
            <div className={styles.formBody}>
                <div className={styles.inputWrapper}>
                    <div>Album Cover Photo</div>
                    <div className={styles.wrapper}>
                        <input 
                            className={styles.photoInput} 
                            type='file' 
                            {...register('file')} 
                        />
                    </div>
                </div>
                <div className={styles.inputGap}>
                    <div className={styles.inputWrapper}>
                        <div>Album Name</div>
                        <div>
                            <input 
                                className={styles.inputName} 
                                type='text' 
                                {...register('albumName')} 
                            />
                        </div>
                    </div>
                    <div>Album Release Date</div>
                    <input 
                        className={styles.date} 
                        type='text' 
                        {...register('releaseDate')} 
                    />
                </div>
            </div>
            <Button title={'Save'} className={styles.buttonTwo} />
        </form>
    );
};

export default AddAlbum;
