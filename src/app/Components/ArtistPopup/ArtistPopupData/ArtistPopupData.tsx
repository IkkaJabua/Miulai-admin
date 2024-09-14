import styles from './ArtistPopupData.module.scss';
import Image from 'next/image';


type Props = {
    email: string;
    firstTitle: string;
    secondTitle: string;
    thirdTitle: string;
    registrationDate: string;
    createdPlaylists: number;
    userImage: string;
    imageStyle: 'round' | 'normal'; 
}

const ArtistPopupData = (props: Props) => {
    const classes = [];
    if(props.imageStyle === 'round') classes.push(styles.round)
    else classes.push(styles.normal)

    return (
        <div className={styles.container}>
            <div> 
                {/* // <Image src={props.userImage} alt='image' width={152} height={152} className={styles.image} /> */}
                <Image src={'/icon/userTestImage.png'} alt='image' width={152} height={152} className={styles.image} />
            </div>
            <div className={styles.dataWrapper}>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>{props.firstTitle}:</span>
                    <span className={styles.data}>{props.email}</span>
                </div>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>{props.secondTitle}:</span>
                    <span className={styles.data}>{props.registrationDate}</span>
                </div>
                <div className={styles.containerWrapper}>
                    <span className={styles.title}>{props.thirdTitle}:</span>
                    <span className={styles.data}>{props.createdPlaylists}</span>
                </div>
            </div>
        </div>
    )
}

export default ArtistPopupData;