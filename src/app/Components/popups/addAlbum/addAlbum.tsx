import styles from "./addAlbum.module.scss";
import Button from "../../Button/Button";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ArtistForm from "../artistForm/artistForm";
import { useRecoilState } from "recoil";
import { artistNAmeState, authorIdStates, clickState } from "@/app/states";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';

interface Props {
    onClick?: () => void;
    onDelete?: () => void;
}

interface FormValues {
    albumName?: string;
    releaseDate?: string;
    file?: FileList;  // Ensure you're expecting the correct file type
}

const AddAlbum = (props: Props) => {
    const [artistForm, setArtistForm] = useState(false);
    const [authorId, setAuthorId] = useRecoilState(authorIdStates);
    // const [artistName, setArtistName] = useState()
    const [artistName, setArtistName] = useRecoilState(artistNAmeState)
    console.log(artistName, 'artistname')




    const [message, setMessage] = useState<string>();
    const [click, setClick] = useRecoilState(clickState);
    const [coverFileName, setCoverFileName] = useState(""); // Fix the typo and make sure it's a string or null
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        axios.get(`https://interstellar-1-pdzj.onrender.com/author/${authorId}`).
            then((r) => {
                setArtistName(r.data.firstName)
                console.log(r.data.firstName, 'firstname')
            })
    }, [])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>();

    const onSubmit = (values: FormValues) => {
        const data = new FormData();
        data.append('albumName', values.albumName);
        data.append('releaseDate', values.releaseDate);
        data.append('authorId', String(authorId)); // Convert authorId to string
        if (file) data.append('file', file);

        const onSubmit = (values: any) => {
            const data: any = new FormData();
            data.append("albumName", values.albumName);
            data.append("releaseDate", values.releaseDate);
            // data.append('file', values.file[0])
            data.append('artistName', artistName)
            data.append("authorId", authorId);

            const handleDelete = (e: React.MouseEvent) => {
                e.preventDefault();
                props.onDelete?.();
            };

            const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                    setCoverFileName(e.target.files[0].name);
                }
            };
        }

        const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
                setCoverFileName(e.target.files[0].name);
            }
        };

        const handleDelete = (e: React.MouseEvent) => {
            e.preventDefault();
            props.onDelete?.();
        };


        return (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.cursor} onClick={props.onClick}>
                        <Image src={'/icon/back.svg'} height={24} width={24} alt='back' />
                    </div>
                    <div>Add New Album</div>
                    <div className={styles.cursor} onClick={handleDelete}>
                        <Image src={'/icon/delete.svg'} height={24} width={24} alt='delete' />
                    </div>
                </div>
                <div className={styles.formBody}>
                    <div className={styles.inputWrapper}>
                        <div>Album Cover Photo</div>
                        <div className={styles.wrapper}>
                            <label htmlFor="file-upload-file">
                                <Image src={'/icon/Screenshots.svg'} width={90} height={90} alt='screenshot' />
                                <span>{coverFileName || 'Choose file'}</span>
                            </label>
                            <input className={styles.photoInput} id='file-upload-file' type='file'
                                {...register('file', { required: true })}
                                onChange={fileChange}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGap}>
                        <div className={styles.inputWrapper}>
                            <div>Album Name</div>
                            <input className={styles.inputName} type='text'
                                {...register('albumName', { required: true })}
                            />
                        </div>
                        <div>Album Release Date</div>
                        <input className={styles.date} type='text'
                            {...register('releaseDate', { required: true })}
                        />
                        <div>{message}</div>
                    </div>
                </div>
                <button className={styles.buttonTwo}>Save</button>
            </form>
        )
    }
}

export default AddAlbum;
