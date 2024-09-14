'use client'
import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import PlaylistInput from '../playlistinput/playlistinput';
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './usertable.module.scss'
import type Password from 'antd/es/input/Password';






const data = [
    {
        key: '1',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '2',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '3',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '4',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '5',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '6',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '7',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '8',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '9',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '10',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '11',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
    {
        key: '12',
        artist: 'September 17, 2024  11:22',
        totalStreams: 'dolores.chambers@example.com',
        Password: 'sandrooooo',
        totalSongs: 5,
    },
];



const MusicTable: React.FC = () => {
    const [active, setActive] = useState<string>();
    const [all, setAll] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());




    const onSubmit = (values: any) => {
        console.log('Values', !!values)
    }

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
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };



    const columns: ColumnsType<any> = [
        {
            title: () =>
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
                </form>,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (text, record) =>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                </form>,
            width: '5%',
        },
        {
            title: 'Registration Date',
            dataIndex: 'artist',
            key: 'artist',
            render: (text, record) => (
                <div className={styles.artistCell}>
                    <div>{text}</div>
                </div>
            ),
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'totalStreams',
            key: 'totalStreams',
            width: '30%',
            render: (text) => (
                <div>
                    {text}
                </div>
            ),
        },
        {
            title: 'Password',
            dataIndex: 'Password',
            key: 'Password',
            width: '15%',
            render: (text, record) => (
                <div className={styles.Password}>
                    <input type={active === record.key ? 'text' : 'password'}  value={text} className={styles.inputPassword} />
                    <div onClick={() => setActive(record.key)}>
                        <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='trash' />
                    </div>
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


