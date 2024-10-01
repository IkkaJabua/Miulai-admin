import axios from 'axios';
import styles from './NewTreck.module.scss';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { albumNameState, clikcState, newTrackRrecoState } from '@/app/states';
import { useRecoilState } from 'recoil';
import { Spin } from 'antd'; // Importing Ant Design Spin component
import Cookies from 'js-cookie';

interface Props {
    onClick: () => void;
}

interface FormData {
    name: string;
    file: FileList;
}

const NewTreck: React.FC<Props> = (props) => {
    const [clickck, setClickck] = useRecoilState<boolean>(clikcState);
    const [loading, setLoading] = useState<boolean>(false);
    const [, setNewTrackRreco] = useRecoilState<boolean>(newTrackRrecoState); // Assuming this is a boolean state
    const [albumNameTwo] = useRecoilState(albumNameState);
    const [albumNameNew, setAlbumNameNew] = useState<string | undefined>();
    const [artistNameNew, setArtistNameNew] = useState<string | undefined>();
    const [albumCover, setAlbumCover] = useState<string | undefined>();
    const token: string | undefined = Cookies.get('accessToken');

    useEffect(() => {
        if (albumNameTwo) {
            axios.get(`https://interstellar-1-pdzj.onrender.com/album/${albumNameTwo}`)
                .then((response) => {
                    setAlbumNameNew(response.data.albumName);
                    setArtistNameNew(response.data.artistName);
                    setAlbumCover(response.data.file?.url);
                })
                .catch((error) => {
                    console.error('Error fetching album data:', error);
                });
        }
    }, [albumNameTwo]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (value: FormData) => {
        const data = new FormData();
        data.append('name', value.name);
        data.append('albumName', albumNameNew || ''); // Provide a fallback
        data.append('albumCover', albumCover || ''); // Provide a fallback
        data.append('file', value.file[0]);
        data.append('albumId', albumNameTwo || ''); // Provide a fallback
        data.append('artistName', artistNameNew || ''); // Provide a fallback

        setLoading(true); // Start loading

        axios.post(`https://interstellar-1-pdzj.onrender.com/music`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                setNewTrackRreco(false);
                setClickck(!clickck);
            })
            .catch((error) => {
                console.error('Error submitting track:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.font}>Add New Track</div>
                <Image onClick={props.onClick} src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
            </div>
            <div className={styles.gap}>
                <div>Track Name</div>
                <input className={styles.name} type="text" {...register('name', { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>
            {/* Uncomment if you want to use Artist Name */}
            {/* <div className={styles.gap}>
                <div>Artist Name</div>
                <input className={styles.name} type="text" {...register('artistName')} />
            </div> */}
            <div className={styles.twoFile}>
                <div>Upload Music file</div>
                <label htmlFor="upload-file">
                    <Image src={'/icon/Upload.svg'} width={24} height={24} alt='upload' />
                </label>
                <input id={'upload-file'} className={styles.file} type="file" {...register('file', { required: true })} />
            </div>
            {loading ? (
                <div className={styles.loading}>
                    <Spin tip="Submitting..." size="default" />
                </div>
            ) : (
                <input type='submit' value={'Save'} className={styles.button} />
            )}
        </form>
    );
}

export default NewTreck;





































// import axios from 'axios'
// import styles from './NewTreck.module.scss'
// import Image from 'next/image'
// import { useForm } from "react-hook-form"
// import { useEffect, useState } from 'react'
// import { albumDataState, albumNameState, , clikcState, newTrackRrecoState } from '@/app/states'
// import { useRecoilState } from 'recoil'
// import { Spin } from "antd"; // Importing Ant Design Spin component

// import Cookies from 'js-cookie'




// interface Props {
//     onClick: () => void;
// }

// interface FormData {
//     name: string;
//     file: FileList;
// }



// const NewTreck = (props: Props) => {

 
//     const [clickck, setClickck] = useRecoilState<boolean>(clikcState)
//     const [loading, setLoading] = useState<boolean>(false);
//     const [, setNewTrackRreco] = useRecoilState(newTrackRrecoState)
//     const [albumNameTwo, ] = useRecoilState(albumNameState)
//     const [albumNameNew, setAlbumNameNew] = useState()
//     const [artistNameNew, setArtistNameNew] = useState()
//     const [albumCover, setAlbumcover] = useState()
//     const token = Cookies.get('accessToken');






//     useEffect(() => {

//         axios.get(`https://interstellar-1-pdzj.onrender.com/album/${albumNameTwo}`).
//             then((r) => {
//                 // setAlbumName(r.data.albumName)
//                 setAlbumNameNew(r.data.albumName)
//                 setArtistNameNew(r.data.artistName)
//                 setAlbumcover(r.data.file?.url)

//             })

//     }, [])



//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<FormData>();

//     const onSubmit = (value: FormData) => {
//         const data = new FormData()
//         data.append('name', value.name)
//         data.append('albumName', albumNameNew)
//         // data.append('artistName', value.artistName)
//         data.append('albumCover', albumCover)
//         data.append('file', value.file[0])
//         data.append('albumId', albumNameTwo)
//         data.append('artistName', artistNameNew)

//         setLoading(true); // Start loading







//         axios.post(`https://interstellar-1-pdzj.onrender.com/music`, data, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }).
//             then((r) => {
//                 setNewTrackRreco(false)
//                 setClickck(!clickck)
//             })
//             .finally(() => {
//                 setLoading(false); // Stop loading
//             });


//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
//             <div className={styles.header}>
//                 <div className={styles.font}>Add New track</div>
//                 <Image onClick={props.onClick} src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
//             </div>
//             <div className={styles.gap}>
//                 <div>Track Names</div>
//                 <input className={styles.name} type="text" {...register('name', { required: true })} />
//                 {errors.name && <span>This field is required</span>}
//             </div>
//             {/* <div className={styles.gap}>
//                 <div>Artist Name</div>
//                 <input className={styles.name} type="text"  {...register('artistName')} />
//             </div> */}
//             <div className={styles.twoFile}>
//                 <div>Upload Music file</div>
//                 <label htmlFor="upload-file">
//                     <Image src={'/icon/Upload.svg'} width={24} height={24} alt='upload' />
//                 </label>
//                 <input id={'upload-file'} className={styles.file} type="file"  {...register('file')} />
//             </div>
//             {loading ? (
//                 <div className={styles.loading}>
//                     <Spin tip="Submitting..." size="default" />
//                 </div>
//             ) : (
//                 <input type='submit' value={'Save'} className={styles.button} />
//             )}
//         </form>
//     );
// }

// export default NewTreck;
