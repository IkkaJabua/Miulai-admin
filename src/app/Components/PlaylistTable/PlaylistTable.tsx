'use client'
import { Table } from "antd";
// import HeartShapeBtn from "../heatShapeIcon/HeartShapeIcn";
import styles from './PlaylistTable.module.scss'
import { render } from "sass";
import { text } from "stream/consumers";
import Image from "next/image";
// import { useWindowSize } from "react-use";
const Tables = () => {

    // const { width, height } = useWindowSize();
    // const isMobile = width > 767




    const tableData = [
        {
            icon: '/table-icon.png',
            title: 'Girls Are Fascinating',
            author: 'By Anetha',
            album: 'Mothearth',
            time: '3:54',
            id: 1,
        }, {
            icon: '/table-icon2.svg',
            title: 'Smash My Heart',
            author: 'By Anetha',
            album: 'Pink',
            time: '3:54',
            id: 2
        }, {
            icon: '/table-icon3.svg',
            title: 'Blackbird',
            author: 'By Anetha',
            album: 'Cowboy Carter',
            time: '3:54',
            id: 3
        }, {
            icon: '/table-icon4.svg',
            title: 'Human',
            author: 'By Anetha',
            album: 'Zaba',
            time: '3:54',
            id: 4
        }, 
        {
            icon: '/table-icon4.svg',
            title: 'Human',
            author: 'By Anetha',
            album: 'Zaba',
            time: '3:54',
            id: 5
        }, 
    ]





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
                    <Image src={'/image/imagesrc.png'} width={48} height={48} alt={text} />
                    <div className={styles.fontGap}>
                        <div className={styles.songTitle}>{text}</div>
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
                <div className={styles.center}>
                    <Image src={'/icon/trashsh.svg'} width={24} height={24} alt="trash" />

                </div>

            )
        },
    ];


    return (
        <div className={styles.wrapper}>
            <Table
                className={styles.container}
                dataSource={tableData}
                columns={columns}
                pagination={false}
                rowClassName={styles.row111111}

            />
        </div>

    )
}

export default Tables;
