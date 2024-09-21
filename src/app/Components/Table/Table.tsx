'use client'
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import styles from './Table.module.scss';
import PlaylistInput from '../playlistinput/playlistinput';
import { useForm, SubmitHandler } from "react-hook-form";
import AddArtistPopup from '../addArtistPopup/AddArtistPopup';
import AddAlbum from '../popups/addAlbum/addAlbum';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authorIdStates, deleteStates } from '@/app/states';
import axios from 'axios';


interface DataType {
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
    const [all, setAll] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [active, setActive] = useState(false)
    const [createAlbum, setCreateAlbum] = useState(true)
    const [tableData, setTableData] = useState<any>()

    const [authorId, setAuthorId] = useRecoilState(authorIdStates)

    const [deletes, setDeletes] = useRecoilState(deleteStates)



    useEffect(() => {

        axios.get(`https://interstellar-1-pdzj.onrender.com/author`).
            then(r => {
                setTableData(r.data)

            }).catch((error) => {
                console.log('ar modiiiiiis', error)
            })
    }, [tableData])


    const TableDelete = (id: any) => {

        axios.delete(`https://interstellar-1-pdzj.onrender.com/author/${id}`).
            then((r : any) => {
                alert('do you really want to delete?')
                console.log('waishala', id)
            },)
    }




    const onSubmit = (values: any) => {
        // console.log('Values', !values)
    }

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
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };



    const columns: ColumnsType<DataType> = [
        {
            title: (record) =>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='checkbox'
                        className={styles.inp}
                        {...register('selectAll')}
                        // checked={selectedKeys.size === .length}
                        onChange={(e) => {
                            handleSelectAll(e.target.checked);
                            handleSubmit(onSubmit)();
                        }}
                    />
                </form>,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (text, record) =>
                <form className={styles.wrapperTwo} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='checkbox'
                        className={styles.inp}
                        {...register(`select-${record.id}`)}
                        checked={selectedKeys.has(record.id)}
                        onChange={() => {
                            handleSelectOne(record.key);
                            handleSubmit(onSubmit)();
                        }}
                    />
                </form>,
            width: '5%',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            render: (text, record) => (
                <div className={styles.artistCell}>
                    <img src={record.files[0]?.url} width={40} height={40} alt={text} />
                    <span>{record.firstName} {record.lastName}</span>
                </div>

            ),
            width: '30%',
        },
        {
            title: 'Total Streams',
            dataIndex: 'totalStreams',
            key: 'totalStreams',
            width: '20%',
            render: (text, record) => (
                <div>

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
            render: (text, record) => (
                <div className={styles.actions}>
                    <button onClick={() => setActive(!active)} className={styles.unBorderPen}>
                        <Image src={`/icon/Pen.svg`} width={24} height={24} alt='pen' />
                    </button>
                    {/* =====================-> */}
                    <button onClick={() => TableDelete(record.id)} className={styles.unBorder}>
                        <Image src={`/icon/trash.svg`} width={24} height={24} alt='trash' />
                    </button>
                    {/* =====================-> */}

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
                    position: ['bottomCenter']
                }}

                onRow={(record: any, rowIndex) => {

                    return {
                        onClick: () => {
                            setAuthorId(record.id)
                        },
                    };
                }}
            />


            {

                active &&
                <div className={styles.popup}>
                    <AddArtistPopup onClick={() => setActive(false)}
                        setActive={setActive} />
                </div>

            }
        </>

    );
};

export default MusicTable;