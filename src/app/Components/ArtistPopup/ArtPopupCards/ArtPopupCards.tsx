import { useEffect, useState } from 'react';
import Card from '../../Card/Card';
import styles from './ArtPopupCards.module.scss';
import axios from 'axios';

// const data = [
//     {
//         title: 'playlist name 1',
//         id: 1,
//         image: '/image/card-default-image.png',
//     },
//     {
//         title: 'playlist name 1',
//         id: 2,
//         image: '/image/card-default-image.png',
//     },
//     {
//         title: 'playlist name 1',
//         id: 3,
//         image: '/image/card-default-image.png',
//     },
//     {
//         title: 'playlist name 1',
//         id: 4,
//         image: '/image/card-default-image.png',
//     },
// ];

type Props = {
    onEdit?: () => void;
};



const ArtPopupCards = (props: Props) => {
    const [playlist, setPlaylist] = useState([]);
    useEffect(() => {
        axios.get(`https://interstellar-1-pdzj.onrender.com/playlist`)
        .then((r) => {
            setPlaylist(r.data)
        })
    }, [])

    return(
        <div className={styles.container}>
            {
                playlist.map((item: any) => <Card onEdit={props.onEdit} image={item.image} title={item.name} id={item.id} imageStyle={'normal'} /> )
            }
        </div>
    );
};

export default ArtPopupCards;
