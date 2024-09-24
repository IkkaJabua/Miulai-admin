import axios from 'axios';
import styles from './NewTreck.module.scss';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    onClick: () => void;
}

interface FormData {
    name: string;
    file: FileList;
}

const NewTreck = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (value) => {
        const data = new FormData();
        data.append('name', value.name);
        data.append('file', value.file[0]);

        axios.post('https://interstellar-1-pdzj.onrender.com/music', data)
            .then((r) => {
                console.log(r);
            });

        console.log(value);
    };

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
            <div className={styles.twoFile}>
                <div>Upload Music file</div>
                <input className={styles.file} type="file" {...register('file', { required: true })} />
                {errors.file && <span>This field is required</span>}
            </div>
            <input type='submit' value={'Save'} className={styles.button} />
        </form>
    );
}

export default NewTreck;
