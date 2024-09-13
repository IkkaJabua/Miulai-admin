import styles from './CardDelete.module.scss';
import Image from 'next/image';

type Props = {
    onClick?: () => void;
}

const CardDelete = (props: Props) => {

    return(
        <div className={styles.container} onClick={props.onClick}>
            <Image src={'/icon/card-delete-icon.svg'} alt={'image'} width={26} height={26} />
        </div>
    )
}


export default CardDelete;