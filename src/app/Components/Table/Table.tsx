'use client';
import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import styles from './Table.module.scss';
import { useForm } from "react-hook-form";
import AddArtistPopup from '../addArtistPopup/AddArtistPopup';

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
    // Add more entries as needed
];

const MusicTable: React.FC = () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const { register, handleSubmit } = useForm<{ selectAll: boolean; [key: string]: boolean }>();
    const [active, setActive] = useState(false);

    const onSubmit = (values: { selectAll: boolean; [key: string]: boolean }) => {
        console.log('Values', values);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedKeys(new Set(data.map(item => item.key)));
        } else {
            setSelectedKeys(new Set());
        }
    };

    const handleSelectOne = (key: string) => {
        setSelectedKeys(prev => {
            const newSet = new Set(prev);
            newSet.has(key) ? newSet.delete(key) : newSet.add(key);
            return newSet;
        });
    };

    const columns: ColumnsType<DataType> = [
        {
            title: () => (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='checkbox'
                        className={styles.inp}
                        {...register('selectAll')}
                        checked={selectedKeys.size === data.length}
                        onChange={(e) => {
                            handleSelectAll(e.target.checked);
                            handleSubmit(onSubmit)();
                        }}
                    />
                </form>
            ),
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (text, record) => (
                <form className={styles.wrapperTwo} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='checkbox'
                        className={styles.inp}
                        {...register(`select-${record.key}`)}
                        checked={selectedKeys.has(record.key)}
                        onChange={() => {
                            handleSelectOne(record.key);
                            handleSubmit(onSubmit)();
                        }}
                    />
                </form>
            ),
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
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Total Albums',
            dataIndex: 'totalAlbums',
            key: 'totalAlbums',
            width: '15%',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Total Songs',
            dataIndex: 'totalSongs',
            key: 'totalSongs',
            width: '15%',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className={styles.actions}>
                    <button onClick={() => setActive(!active)} className={styles.unBorder}>
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
        <>
            <Table
                className={styles.wrapper}
                columns={columns}
                dataSource={data}
                pagination={{
                    position: ['bottomCenter']
                }}
            />

            {active && (
                <div className={styles.popup}>
                    <AddArtistPopup 
                        onClick={() => setActive(false)}
                        setActive={setActive} 
                        key1={'Album Name:'}
                        key2={'Release Date:'} 
                        key3={'Number Of Tracks:'}
                        value1={'I Hear You'} 
                        value2={'January 15, 2015'}
                        value3={'5'} 
                        image={'popupImage.svg'} 
                    />
                </div>
            )}
        </>
    );
};

export default MusicTable;
