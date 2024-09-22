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
];

type Props = {
    onEdit?: () => void;
};

const ArtPopupCards = (props: Props) => {
    return (
        <div className={styles.container}>
            {data.map((item) => (
                <Card 
                    key={item.id} 
                    header={''} 
                    onEdit={props.onEdit} 
                    image={item.image} 
                    title={item.title} 
                    id={item.id} 
                    imageStyle={'normal'} 
                />
            ))}
        </div>
    );
};

export default ArtPopupCards;
