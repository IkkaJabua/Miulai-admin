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
        }, {
            icon: '/table-icon5.svg',
            title: 'Toes',
            author: 'By Anetha',
            album: 'Zaba',
            time: '3:54',
            id: 5
        }, {
            icon: '/table-icon6.svg',
            title: 'Picture Of You',
            author: 'By Anetha',
            album: 'Genesys II',
            time: '3:54',
            id: 6
        }, {
            icon: '/table-icon7.svg',
            title: 'End Of An Era',
            author: 'By Anetha',
            album: 'Radical Optimism',
            time: '3:54',
            id: 7
        }, {
            icon: '/table-icon8.svg',
            title: 'Your Art',
            author: 'By Anetha',
            album: 'I Hear You',
            time: '3:54',
            id: 8
        },
        {

            icon: '/table-icon9.svg',
            title: 'Girls Are Fascinating',
            author: 'By Anetha',
            album: 'Poker Face',
            time: '3:54',
            id: 9
        }, {
            icon: '/table-icon10.svg',
            title: 'The man',
            author: 'By Anetha',
            album: 'Lover',
            time: '3:54',
            id: 10
        }, {
            icon: '/table-icon11.svg',
            title: 'So Fresh, So  Clean',
            author: 'By Anetha',
            album: 'Stankonia',
            time: '3:54',
            id: 11
        }
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

