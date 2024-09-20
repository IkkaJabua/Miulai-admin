import Button from '../../Button/Button';
import styles from './ArtistPopupBtn.module.scss';
import Image from 'next/image';

type Props = {
    onClick?: () => void;
    title: string;
    btnTitle: string;
}

const ArtistPopupBtn = (props: Props) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{props.title}</h2>
            <Button
                title={props.btnTitle}
                image={'/icon/plus-img.svg'}
                mode='fill'
                className={styles.button}
                onClick={props.onClick} />
        </div>
    )
}

export default ArtistPopupBtn;