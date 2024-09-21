'use client'
import { Table } from "antd";
// import HeartShapeBtn from "../heatShapeIcon/HeartShapeIcn";
import styles from './PlaylistTable.module.scss'
import { render } from "sass";
import { text } from "stream/consumers";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import SureToDelete from "../SureToDelete/SureToDelete";
import SureToDeleteSong from "../SureToDeleteSong/SureToDeleteSong";

type Props = {
    name?: string;
    id?: number;
}

const Tables = (props: Props) => {


    // const tableData = [
    //     {
    //         icon: '/table-icon.png',
    //         title: 'Girls Are Fascinating',
    //         author: 'By Anetha',
    //         album: 'Mothearth',
    //         time: '3:54',
    //         id: 1,
    //     }, ]

    const [music, setMusic] = useState([]);
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false)
    }

    const openModal = () => {
        setOpen(true)
    }


    useEffect(() => {
        axios.get(`https://interstellar-1-pdzj.onrender.com/playlist/${props.id}`)
        .then((r) => {
            setMusic(r.data.files)         
        })
    }, [])
    

    const deleteSong = async (values: any) => {
        axios.delete(`https://interstellar-1-pdzj.onrender.com/music/${props.id}`)
         .then((r) => {
            setMusic(r.data.id)
            //  alert('music has deleted')   
         })
    }




    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: '1%',
            render: (text: any, item: any) => (
                <div className={styles.cellId}>
                {props.id}
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
                    <Image src={'/image/imagesrc.png'} width={48} height={48} alt={text} />
                    <div className={styles.fontGap}>
                        <div className={styles.songTitle}>{props.name}</div>
                        <div className={styles.songArtist}>{item.author}</div>
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
                    {text}
                </div>
            )
        },
        {
            title: 'Actions',
            key: 'like',
            width: '3%',
            render: (() =>
                <div className={styles.center} onClick={deleteSong}>
                    <Image src={'/icon/trashsh.svg'} width={24} height={24} alt="trash" />

                </div>

            )
        },
    ];


    return (
        <div className={styles.wrapper}>
            <Table
                className={styles.container}
                dataSource={music}
                columns={columns}
                pagination={false}
                rowClassName={styles.row111111}
            />
            {/* {
                open && <SureToDeleteSong onCancelClick={closeModal} id={props.id} />
            } */}
        </div>

    )
}

export default Tables;

