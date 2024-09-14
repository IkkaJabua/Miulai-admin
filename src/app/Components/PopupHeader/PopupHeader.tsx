import styles from './PopupHeader.module.scss';
import Image from 'next/image';

type Props = {
    userName: string; 
}

const PopupHeader = (props: Props) => {

    return(
        <div className={styles.container}>
            <Image src={'/icon/marcxniv-isari.svg'} alt='image' width={24} height={24} />
            <span className={styles.title}>{props.userName}</span>
            <Image src={'/icon/x-gatishva.svg'} alt={'image'} width={24} height={24} />
        </div>
    )
}


export default PopupHeader;