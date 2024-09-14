import Card from '../../Card/Card';
import styles from './ArtPopupCards.module.scss';

const data = [
    {
        title: 'playlist name 1',
        id: 1,
        image: '/image/card-default-image.png',
    },
    {
        title: 'playlist name 1',
        id: 2,
        image: '/image/card-default-image.png',
    },
    {
        title: 'playlist name 1',
        id: 3,
        image: '/image/card-default-image.png',
    },
    {
        title: 'playlist name 1',
        id: 4,
        image: '/image/card-default-image.png',
    },
]

const ArtPopupCards = () => {

    return(
        <div className={styles.container}>
            {
                data.map((item) => <Card header={''} image={item.image} title={item.title} id={item.id} imageStyle={'normal'} /> )
            }
        </div>
    )
}

export default ArtPopupCards;