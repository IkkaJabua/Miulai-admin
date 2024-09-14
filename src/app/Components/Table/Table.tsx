'use client'
import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import styles from './Table.module.scss';
import { useForm } from 'antd/es/form/Form';

interface DataType {
    key: string;
    artist: string;
    totalStreams: number;
    totalAlbums: number;
    totalSongs: number;
    image: string;
}

const data: DataType[] = [
    {
        key: '1',
        artist: 'Rihanna',
        image: 'rihana.svg',
        totalStreams: 267400,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '2',
        artist: 'Arianna Grande',
        image: 'rihana.svg',

        totalStreams: 558612,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '3',
        artist: 'Rihanna',
        image: 'rihana.svg',

        totalStreams: 267400,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '4',
        artist: 'Arianna Grande',
        image: 'rihana.svg',

        totalStreams: 558612,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '5',
        artist: 'Rihanna',
        image: 'rihana.svg',

        totalStreams: 267400,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '6',
        artist: 'Arianna Grande',
        image: 'rihana.svg',

        totalStreams: 558612,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '7',
        artist: 'Rihanna',
        image: 'rihana.svg',

        totalStreams: 267400,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '8',
        artist: 'Arianna Grande',
        image: 'rihana.svg',

        totalStreams: 558612,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '9',
        artist: 'Rihanna',
        image: 'rihana.svg',

        totalStreams: 267400,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '10',
        artist: 'Arianna Grande',
        image: 'rihana.svg',

        totalStreams: 558612,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '11',
        artist: 'Rihanna',
        image: 'rihana.svg',

        totalStreams: 267400,
        totalAlbums: 5,
        totalSongs: 5,
    },
    {
        key: '12',
        artist: 'Arianna Grande',
        image: 'rihana.svg',

        totalStreams: 558612,
        totalAlbums: 5,
        totalSongs: 5,
    },
];



const MusicTable: React.FC = () => {
    const [active, setActive] = useState(false)


    const columns: ColumnsType<DataType> = [
        {
            title: () =>
                <div onClick={() => setActive(!active)} className={active ? styles.activeInput : styles.input}>

                </div>,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () =>
                <div onClick={() => setActive(!active)} className={active ? styles.activeInput : styles.input}>
                    {
                        active && <Image src={} width={}  height={} alt='checkbox'   />
                    }
                </div>,
            width: '5%',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            render: (text, record) => (
                <div className={styles.artistCell}>
                    <Image src={`image/${record.image}`} width={40} height={40} alt={text} />
                    <span>{text}</span>
                </div>
            ),
            width: '30%',
        },
        {
            title: 'Total Streams',
            dataIndex: 'totalStreams',
            key: 'totalStreams',
            width: '20%',
            render: (text) => (
                <div>
                    {text}
                </div>
            ),
        },
        {
            title: 'Total Albums',
            dataIndex: 'totalAlbums',
            key: 'totalAlbums',
            width: '15%',
            render: (text) => (
                <div>
                    {text}
                </div>
            ),
        },
        {
            title: 'Total Songs',
            dataIndex: 'totalSongs',
            key: 'totalSongs',
            width: '15%',
            render: (text) => (
                <div>
                    {text}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className={styles.actions}>
                    <button className={styles.unBorder}>
                        <Image src={`/icon/Pen.svg`} width={24} height={24} alt='pen' />
                    </button>
                    <button className={styles.unBorder}>
                        <Image src={`/icon/trash.svg`} width={24} height={24} alt='trash' />
                    </button>
                </div>
            ),
            width: '15%',
        },
    ];











    return (
        <Table
            className={styles.wrapper}
            columns={columns}
            dataSource={data}
            pagination={{
                position: ['bottomCenter']
            }}
        />
    );
};

export default MusicTable;