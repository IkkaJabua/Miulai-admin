import styles from './artistForm.module.scss';
import { useForm, SubmitHandler } from "react-hook-form";
import Button from '../../Button/Button';

// Define a type for your form data
interface FormData {
    artistName: string;
    biography: string;
    artistPhoto: FileList;
}

const ArtistForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>(); // Use the FormData type here

    // Use the onSubmit function to handle form submission
    const onSubmit: SubmitHandler<FormData> = (values) => {
        console.log(values);
        // Here you can handle the form submission, e.g., send values to an API
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}> {/* Attach handleSubmit */}
            <div className={styles.formBody}>
                <div>
                    <div>Artist Name</div>
                    <input
                        className={styles.nameInput}
                        type='text'
                        {...register('artistName', { required: true })} // Register the input
                    />
                    {errors.artistName && <span>This field is required</span>} {/* Error message */}
                </div>
                <div>
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
                    <div className={styles.wrapper}>
                        <input
                            className={styles.photoInput}
                            type='file'
                            {...register('artistPhoto', { required: true })} // Register the input
                        />
                        {errors.artistPhoto && <span>This field is required</span>} {/* Error message */}
                    </div>
                </div>
                <div>
                    <Button type='submit' title={'New Album'} className={styles.button} image='/icon/plus-img.svg' />
                </div>
            </div>
        </form>
    );
};

export default ArtistForm;
