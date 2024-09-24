'use client';
import styles from './page.module.scss';
import Image from 'next/image';
// Removed unused Link import
import Button from '../Components/Button/Button';
import { useForm } from 'react-hook-form'
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';
import { useRouter } from 'next/navigation';
import { setCookie } from '../cookies';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


type SignIn = {
    email: string;
    password: string;
    remember?: boolean; // Optional if not used
}

const Login = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<SignIn>();
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = (values: any) => {
        console.log(values, 'zd2');

        axios.post('https://interstellar-1-pdzj.onrender.com/auth', values)
            .then(r => {
                // setCookie('token', r.data.accesToken, 60)
                Cookies.set('accessToken', r.data.accessToken, { expires: 3600 }); /*ექსფაიერ როცა უწერია ტიკენი ინახება, რეფრეშზეც და იუზერი არ იშლება */
                if(r.data.role === 'admin') {
                    router.push('/')
                }
            }).catch(error => {
                console.error('Login failed:', error.response?.data || error.message);
            });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <div className={styles.logoWrapper}>
                        <Image src={'/icon/logo.svg'} alt='image' width={97} height={83} className={styles.logo} />
                    </div>
                    <h1 className={styles.header}>
                        <p className={styles.white}>
                            <span>Where</span>
                            <span>Harmony</span>
                        </p>
                        <p className={styles.gradients}>
                            <span>Meets</span>
                            <span>Melody</span>
                        </p>
                    </h1>
                    <p className={styles.subtitle}>
                        The Future Of Music Streaming
                    </p>
                    <span className={styles.signInTitle}>
                        Sign In
                    </span>

                    <form onSubmit={handleSubmit(onLogin)} className={styles.formsWrapper}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                placeholder='Email'
                                className={styles.input}
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Entered value does not match email format",
                                    },
                                })}
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                            <div className={styles.passwordWrapper}>
                                <input type={showPassword ? 'text' : 'password'}

                                    placeholder='Password'
                                    className={styles.inputPassword}
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Minimum length of password should be 8 characters'
                                        }
                                    })}
                                />
                                <Image
                                    onClick={togglePasswordVisibility}
                                    src={showPassword ? '/icon/show-password.svg' : '/icon/hide-showPass.svg'}
                                    alt='image'
                                    width={16}
                                    height={16}
                                    className={styles.passwordImg}
                                />
                            </div>
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>
                        {/* <div className={styles.checkboxWrapper}>
                            <div className={styles.checkboxContainer}>
                                <input type="checkbox" {...register('remember')} />
                                <span className={styles.remember}>Remember me</span>
                            </div>

                            <div onClick={() => router.push('/')} className={styles.forgot}>
                                Forgot your password?
                            </div>
                        </div> */}

                        <input type='submit'
                            value={'SIGN IN'}
                            onClick={onLogin}
                            className={styles.button} />
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Login;
