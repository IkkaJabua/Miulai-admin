import styles from './CardEdit.module.scss';
import Image from 'next/image';

type Props = {
    onClick?: () => void;
}

const CardEdit = (props: Props) => {

    return(
        <div className={styles.container} onClick={props.onClick}>
            <Image src={'/icon/card-edit-icon.svg'} alt={'image'} width={26} height={26} />
        </div>
    )
}


export default CardEdit;