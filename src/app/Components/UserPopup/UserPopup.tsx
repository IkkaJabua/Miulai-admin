import styles from './UserPopup.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
    userName?: string;
    userGmail?: string;
}

const UserPopup = ({ userName,}: Props) => {
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getToken();

                const response = await axios.get('https://interstellar-1-pdzj.onrender.com/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data.email);  

                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    const getToken = () => {
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        return match ? match[2] : '';
    };





    const router = useRouter();
    const handleLogOut = () => {
        // Delete the token from cookies
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        Cookies.remove('accessToken');
        router.push('/login')
        // Refresh the page to reflect the logout state
        window.location.reload();
        //    alert('helloooooooooooooooooooooooooooooo')
    };


    return (
        <div className={styles.container}>
            <div className={styles.userNameWrapper}>
            <Image src={'/icon/userHeaderIcon.svg'} alt='image' width={20} height={20} />
            <span className={styles.gmail}>{email}</span>
            </div>
            <div className={styles.logoutWrapper} onClick={handleLogOut}>
                <Image src={'/icon/logoutIcon.svg'} alt='image' width={20} height={20} />
                <span className={styles.logout}>Log out</span>
            </div>
        </div>
    );
}

export default UserPopup;
