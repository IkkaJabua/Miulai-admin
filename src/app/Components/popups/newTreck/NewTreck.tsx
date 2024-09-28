import axios from 'axios';
import styles from './NewTreck.module.scss';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState } from 'recoil';
import { albumIDState, clickState } from '@/app/states';
import Cookies from 'js-cookie';

interface Props {
    onClick: () => void;
}

interface FormData {
    name: string;
    file: FileList;
}

const NewTreck = (props: Props) => {
    const [albumID] = useRecoilState(albumIDState); // No need to specify type here
    const [clickck, setClickck] = useRecoilState(clickState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (value) => {
        const data = new FormData();
        data.append('name', value.name);
        data.append('file', value.file[0]);

        // Ensure albumID is a string
        data.append('albumId', albumID !== null && albumID !== '' ? albumID.toString() : ''); // Convert to string

        const token = Cookies.get('accessToken');

        axios.post(`https://interstellar-1-pdzj.onrender.com/music`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            setClickck(!clickck); // This will trigger any reactivity needed
        })
        .catch((error) => {
            console.error('Error submitting the form:', error);
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
            <div className={styles.twoFile}>
                <div>Upload Music file</div>
                <label htmlFor="upload-file">
                    <Image src={'/icon/Upload.svg'} width={24} height={24} alt='upload' />
                </label>
                <input id='upload-file' className={styles.file} type="file" {...register('file', { required: true })} />
                {errors.file && <span>This field is required</span>}
            </div>
            <input type='submit' value='Save' className={styles.button} />
        </form>
    );
};

export default NewTreck;
