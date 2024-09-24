import styles from './artistForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../Button/Button';
import Image from 'next/image';
import { useState } from 'react';
import AddAlbum from '../addAlbum/addAlbum';

interface Props {
    onClick?: () => void;
}

// Define the interface for form values
interface FormValues {
    artistName: string;
    biography: string;
    artistPhoto: FileList;
}

const ArtistForm = (props: Props) => {
    const [addAlbum, setAddAlbum] = useState(false);

    // Use the FormValues interface in useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    if (addAlbum) {
        return <AddAlbum />;
    }

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        console.log(values);
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.header}>
                <div>
                    {/* <Image src={'/icon/back.svg'} width={24} height={24} alt='back' /> */}
                </div>
                <div>Add New Artist</div>
                <div className={styles.cursor} onClick={props.onClick}>
                    <Image src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.formBody}>
                    <div className={styles.inputGap}>
                        <div>Artist Name</div>
                        <input
                            className={styles.nameInput}
                            type='text'
                            {...register('artistName', { required: true })} // Register the input
                        />
                        {errors.artistName && <span>This field is required</span>} {/* Error message */}
                    </div>
                    <div className={styles.inputGap}>
                        <div>Biography</div>
                        <input
                            className={styles.biographyInput}
                            type='text'
                            {...register('biography', { required: true })} // Register the input
                        />
                        {errors.biography && <span>This field is required</span>} {/* Error message */}
                    </div>
                </div>
                <div className={styles.formBody}>
                    <div>
                        <div>Artist Photo</div>
                        <div className={styles.photoFile}>
                            <input
                                className={styles.photoInput}
                                type='file'
                                {...register('artistPhoto')} // Register the input
                            />
                        </div>
                    </div>
                    <Button onClick={() => setAddAlbum(true)} mode='fill' title={'New Album'} image='/icon/plus.svg' className={styles.button} />
                </div>
            </div>
            <Button type='submit' title={'Save'} className={styles.buttonTwo} />
        </form>
    );
};

export default ArtistForm;
