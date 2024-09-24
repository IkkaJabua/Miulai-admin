import axios from 'axios';
import styles from './CardDelete.module.scss';
import Image from 'next/image';

type Props = {
    onClick?: () => void;
    id?: number;
};

const CardDelete = (props: Props) => {
    const PlaylistDelete = async () => {
        if (props.id) { // Ensure there's an ID before attempting to delete
            await axios.delete(`https://interstellar-1-pdzj.onrender.com/playlist/${props.id}`)
                .then(() => {
                    alert('Playlist has been deleted');
                })
                .catch((error) => {
                    console.error('Error deleting playlist:', error);
                });
        } else {
            alert('No playlist ID provided.');
        }
    };

    return (
        <div className={styles.container} onClick={PlaylistDelete}>
            <Image src={'/icon/card-delete-icon.svg'} alt={'image'} width={26} height={26} />
        </div>
    );
};

export default CardDelete;
