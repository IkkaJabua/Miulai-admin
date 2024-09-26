'use client';
import { Table } from "antd";
// import HeartShapeBtn from "../heatShapeIcon/HeartShapeIcn";
import styles from './PlaylistTable.module.scss'
import { text } from "stream/consumers";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { albumDataState, albumIDState, authorIdStates, cardDataStates } from "@/app/states";
import { useRecoilState } from "recoil";
import type { Props } from "next/script";
// import { useWindowSize } from "react-use";
import styles from './PlaylistTable.module.scss';
import Image from "next/image";

type Props = {
    name?: string;
    id?: number;
}

interface Song {
    icon: string;
    title: string;
    author: string;
    album: string;
    time: string;
    id: number;
}

const Tables = () => {
    const [data, setData] = useState<any>([])
    const [authorId, setAuthorId] = useRecoilState(authorIdStates)
    const [albumID, setAlbumID] = useRecoilState(albumIDState)
    const [image, setimage] = useRecoilState<any>(cardDataStates)

    const [deletes, setDeletes] = useState<any>()

    const onDelete = (id: number) => {
        axios.delete(`https://interstellar-1-pdzj.onrender.com/author/${authorId}/albums/${albumID}/musics/${id}`).
            then(r => {
                alert('are shure you want to delete?')
            }).catch((error) => {
                console.log()
            })
    }

    useEffect(() => {

        axios.get(`https://interstellar-1-pdzj.onrender.com/album/${albumID}/musics`). 
        then((r ) => {
            console.log(r.data,'=-=-=-=-=-=-=-=- musicData')
        })
    },[])



    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: '1%',
            render: (text: any, item: any) => (
                <div className={styles.cellId}>
                    {text}
                </div>
            )
        },

        {
            title: 'Song Name',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            render: (text: any, item: any) => (
                <div className={styles.cellSongname}>
                    <img className={styles.image} src={image?.files[0]?.url} width={48} height={48} alt={text} />
                    <div className={styles.fontGap}>
                        <div className={styles.songTitle}>{item.name}</div>
                        <div className={styles.songArtist}>{item.authorName}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: '15%',
            render: (text: any, item: any) => (
                <div className={styles.cellTimeName}>
                    3.35
                </div>
            )
        },
        {
            title: 'Actions',
            key: 'like',
            width: '3%',
            render: ((record: any) =>
                <div onClick={() => onDelete(record.id)} className={styles.center}>
                    <Image src={'/icon/trashsh.svg'} width={24} height={24} alt="trash" />

                </div>

            )
        },
    ];


const Tables = ({  }: Props) => { // Destructuring props
    return (
        <div className={styles.wrapper}>
            <Table
                className={styles.container}
                dataSource={data}
                columns={columns}
                pagination={{
                    pageSize: 5,
                    position: ['bottomCenter'],

                }}
                rowClassName={styles.row111111}
            />
            {/* 
                Uncomment when SureToDeleteSong component is used
                {open && <SureToDeleteSong onCancelClick={closeModal} id={id} />}
            */}
        </div>
    );
}

export default Tables;
