import axios from 'axios';
import styles from './CardDelete.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
    onClick?: () => void;
    id?: number;
}

const CardDelete = (props: Props) => {
    // const [playlists, setPlaylists] = useState([]);

    // useEffect(() => {
    //      axios.get(`https://interstellar-1-pdzj.onrender.com/playlist`)
    //     .then((r) => {
    //         setPlaylists(r.data)
    //     })
    // },[])

    const PlaylistDelete = async (values: any) => {
        await axios.delete(`https://interstellar-1-pdzj.onrender.com/playlist/${props.id}`)
         .then(() => {
             alert('Playlist has deleted')
         })
     }

    return(
        <div className={styles.container} onClick={PlaylistDelete}>
            <Image src={'/icon/card-delete-icon.svg'} alt={'image'} width={26} height={26} />
        </div>
    )
}


export default CardDelete;