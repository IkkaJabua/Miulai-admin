import Input from '../Input/Input';
import styles from './Header.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import UserPopup from '../UserPopup/UserPopup';


const Header = () => {
    const [showPopup, setShowPopup] = useState(false);

    // toggle function
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Input className={styles.input} placeholder='Username, Email' />
               
                <div className={styles.userIconWrapper} onClick={togglePopup}>
                    <Image
                        src={'/icon/userHeaderIcon.svg'}
                        alt='User Icon'
                        width={32}
                        height={32}
                        className={styles.image}
                    />
                </div>
                {showPopup && (
                    <div className={styles.popupWrapper}>
                        <UserPopup
                            userName={'ddawd'}
                            userGmail={'dawdawawd'}      
                        />
                    </div>
                )}
            </div>
        </div>
    );
};


export default Header;















