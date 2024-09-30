import { useForm } from 'react-hook-form';
import styles from './NewPassword.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';


type Password = {
    newPassword: string;
    confirmPassword: string;
    id: number;
}

type Props = {
    closeModal?: () => void;
    id: number | undefined;
}

const NewPassword = (props: Props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Password>();

    const newPassword = watch('newPassword');
    const confirmPassword = watch('confirmPassword');
    const accessToken = Cookies.get('accessToken')

    const onPassswordClick = async (values: Password) => { // Use Password type here
        if (newPassword === confirmPassword) {
            await axios.patch(`https://interstellar-1-pdzj.onrender.com/user/${props.id}`, {
                password: values.newPassword
            }, {
                headers: {
                Authorization: `Bearer ${accessToken}`
                }
            });
            props.closeModal?.();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>New Password</h1>
                <span className={styles.x} onClick={props.closeModal}>x</span>
            </div>
            <form className={styles.forms} onSubmit={handleSubmit(onPassswordClick)}>
                <div className={styles.wrapper}>
                    <span>Create New Password</span>
                    <input type="password" className={styles.input} {...register('newPassword', {
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'Minimum length of password should be 8 characters.'
                        }
                    })} />
                    {errors.newPassword && <span className={styles.errorMessage}>{errors.newPassword.message}</span>}
                </div>
                <div className={styles.wrapper}>
                    <span>Confirm New Password</span>
                    <input type="password" className={styles.input} {...register('confirmPassword', {
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'Minimum length of password should be 8 characters.'
                        }
                    })} />
                    {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>}
                </div>
                <input type="submit" value={'Save'} className={styles.btn} />
            </form>
        </div>
    );
}

export default NewPassword;
