import styles from './PopupHeader.module.scss';
import Image from 'next/image';

type Props = {
    userName: string; 
    onClick?: () => void;
}

const PopupHeader = (props: Props) => {

    return(
        <div className={styles.container}>
            <Image src={'/icon/marcxniv-isari.svg'} alt='image' width={24} height={24} onClick={props.onClick} className={styles.img} />
            <span className={styles.title}>{props.userName}</span>
            <Image src={'/icon/x-gatishva.svg'} alt={'image'} width={24} height={24} onClick={props.onClick} className={styles.img} />
        </div>
    )
}


export default PopupHeader;