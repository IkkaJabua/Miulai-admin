'use client'
import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import styles from './Table.module.scss';
import { useForm } from "react-hook-form";
import AddArtistPopup from '../addArtistPopup/AddArtistPopup';
import AddAlbum from '../popups/addAlbum/addAlbum';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authorIdStates, clikcState, deleteStates, totalSongsState } from '@/app/states';
import axios from 'axios';


interface DataType {
    albums: any;
    key: string;
    artist: string;
    totalStreams: number;
    totalAlbums: number;
    totalSongs: number;
    image: string;
    name?: any;
    id?: any;
    files?: any;
    firstName?: any
    lastName?: any
}

const MusicTable: React.FC = () => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [all, setAll] = useState(false);
    const [click, setClick] = useRecoilState(clikcState);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [active, setActive] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const [authorId, setAuthorId] = useRecoilState(authorIdStates);
    const [deletes, setDeletes] = useRecoilState(deleteStates);
    const [totalSong, setTotalSong] = useRecoilState(totalSongsState)

    const [showAlert, setShowAlert] = useState(false);



 

    useEffect(() => {
        fetchAuthors();
    }, [click]);

    const fetchAuthors = async () => {
        try {
            const response = await axios.get(`https://interstellar-1-pdzj.onrender.com/author`);

            const formattedData = response.data.map((artist: DataType) => ({
                ...artist,
                totalAlbums: artist.albums ? artist.albums.length : 0,
                totalSongs: artist.albums?.reduce((acc: any, album: { musics: string | any[]; }) => acc + (album.musics ? album.musics.length : 0), 0)
            }));
            setTableData(formattedData);
            console.log(formattedData, 'aq raari tooooo')
        } catch (error) {
            console.error('Error fetching authors', error);
        }
    };

    const TableDelete = async (id: any) => {
        const confirmDelete = confirm('Do you really want to delete?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://interstellar-1-pdzj.onrender.com/author/${id}`);
                setClick(!click); 
            } catch (error) {
                console.error('Error deleting author', error);
            }
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedKeys(new Set(tableData.map((item: any) => item.key)));
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

    const onSubmit = (values: any) => {
        // console.log('Values', values);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: () => (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='checkbox'
                        className={styles.inp}
                        {...register('selectAll')}
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
                        {...register(`select-${record.id}`)}
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
                    <img className={styles.image} src={record.files[0]?.url} width={40} height={40} alt={text} />
                    <span>{record.firstName}</span>
                </div>
            ),
            width: '30%',
        },
        {
            title: '',
            dataIndex: 'totalStreams',
            key: 'totalStreams',
            width: '10%',
            render: (text, record) => <div>{record.totalStreams}</div>,
        },
        {
            title: 'Total Albums',
            dataIndex: 'totalAlbums',
            key: 'totalAlbums',
            width: '20%',
            render: (text) => <div  className={styles.changeSize}>{text}</div>,
        },
        {
            title: 'Total Songs',
            dataIndex: 'totalSongs',
            key: 'totalSongs',
            width: '20%',
            render: (text) => <div className={styles.changeSize}>{text}</div>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className={styles.actions}>
                    <button onClick={() => setActive(true)} className={styles.unBorderPen}>
                        <Image src={`/icon/Pen.svg`} width={24} height={24} alt='pen' />
                    </button>
                    <button onClick={() => TableDelete(record.id)} className={styles.unBorder}>
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
                dataSource={tableData}
                pagination={{ 
                    pageSize: 7,
                    position: ['bottomCenter'] }}
                rowKey="id" // Important to uniquely identify rows
                onRow={(record: any) => ({
                    onClick: () => {
                        setAuthorId(record.id);
                    },
                })}
            />
            {
                showAlert && 
                <Alert />
            }
            {active && (
                <div className={styles.popup}>
                    <AddArtistPopup onClick={() => setActive(false)} setActive={setActive} />
                </div>
            )}
        </>
    );
};

export default MusicTable;
