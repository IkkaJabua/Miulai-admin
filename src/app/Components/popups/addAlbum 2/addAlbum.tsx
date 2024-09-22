import styles from './addAlbum.module.scss';
import Button from '../../Button/Button';
import { useForm } from "react-hook-form";
import axios from 'axios';

// Define the form values interface
interface FormValues {
    file: FileList;
    albumName: string;
    releaseDate: string;
}

const AddAlbum = () => {
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
                console.log('Album uploaded successfully:', response);
            })
            .catch((error) => {
                console.error('Error uploading album:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.inputWrapper}>
                <div>Album Cover Photo</div>
                <div className={styles.wrapper}>
                    <input
                        className={styles.photoInput}
                        type='file'
                        {...register('file', { required: true })} // Added validation
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
                            {...register('albumName', { required: true })} // Added validation
                        />
                    </div>
                </div>
                <div>Album Release Date</div>
                <input
                    className={styles.date}
                    type='text'
                    {...register('releaseDate', { required: true })} // Added validation
                />
                <div>
                    <Button
                        title={'New Album'}
                        className={styles.button}
                        image='/icon/plus-img.svg'
                    />
                </div>
            </div>
        </form>
    );
}

export default AddAlbum;
