import { useEffect, useState } from 'react';
import Card from '../../Card/Card';
import styles from './ArtPopupCards.module.scss';
import axios from 'axios';

// Define an interface for the playlist item
interface PlaylistItem {
    id: number;
    name: string;
    image: string;
}

// Update Props to include the correct type for onEdit
type Props = {
    onEdit: (playlistId: number) => void; // Update to take a playlistId
};

const ArtPopupCards = (props: Props) => {
    // Specify the type for the playlist state
    const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);

    useEffect(() => {
        axios.get(`https://interstellar-1-pdzj.onrender.com/playlist`)
            .then((response) => {
                setPlaylist(response.data);
            })
            .catch((error) => {
                console.error('Error fetching playlist:', error);
            });
    }, []);

    return (
        <div className={styles.container}>
            {
                playlist.map((item) => (
                    <Card
                        key={item.id} // Ensure each Card has a unique key
                        onEdit={() => props.onEdit(item.id)} // Pass the item.id to onEdit
                        image={item.image}
                        title={item.name}
                        id={item.id}
                        imageStyle={'normal'}
                    />
                ))
            }
        </div>
    );
};

export default ArtPopupCards;
