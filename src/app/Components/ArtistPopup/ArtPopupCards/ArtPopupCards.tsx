import { useEffect, useState } from 'react';
import Card from '../../Card/Card';
import styles from './ArtPopupCards.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { playilistMainState } from '@/app/states';

// Define an interface for the playlist item


// Update Props to include the correct type for onEdit
type Props = {
    onEdit: (playlistId: number) => void; // Update to take a playlistId
};

const ArtPopupCards = (props: Props) => {
    // Specify the type for the playlist state
    // const [playlist, setPlaylist] = useState<any[]>([]);
    const token = Cookies.get('accessToken')
    const [userPlaylistE, setPlaylistE] = useRecoilState<any>(playilistMainState)


    useEffect(() => {
        axios.get(`https://interstellar-1-pdzj.onrender.com/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((r) => {
                setPlaylistE(r.data.playlists)
            })
            .catch((error) => {
                console.error('Error fetching playlist:', error);
            });
    }, []);

    return (
        <div className={styles.container}>
            {
                userPlaylistE?.map((item: any) => (
                    <Card
                        key={item.id} // Ensure each Card has a unique key
                        onEdit={() => props.onEdit(item.id)} // Pass the item.id to onEdit
                        image={"/icon/albumicon3.svg"}
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
