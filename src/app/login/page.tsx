'use client';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Components/Button/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';
import { useRouter } from 'next/navigation';
import { setCookie } from '../cookies';
import { useState } from 'react';


type SignIn = {
    email: string;
    password: string;
    remember: boolean;
}

const Login = () => {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignIn>();
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = (values: any) => {
        axios.post('https://interstellar-1-pdzj.onrender.com/auth', values)
            .then(r => {

                setCookie('token', r.data.accesToken, 60)
                router.push('/')
            })
           
            
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
                            <input type="email"
                                placeholder='Email'
                                className={styles.input}
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'email is required'
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
                                    id=""
                                    placeholder='Password'
                                    className={styles.inputPassword}
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: 'password is required'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'min length of password should be 8 character'
                                        }
                                    })}
                                />

                                <Image onClick={togglePasswordVisibility}
                                    src={showPassword ? '/icon/show-password.svg' : '/icon/hide-showPass.svg'}
                                    alt='image'
                                    width={16}
                                    height={16}
                                    className={styles.passwordImg} />
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
                        
                    </form>
                    <Button title={'SIGN IN'}
                            mode={'fill'}
                            onClick={() => console.log('button clicked')}
                            className={styles.button} />
                    
                </div>
            </div>
        </div>
    )
}
export default Login;
