'use client'
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import PlaylistInput from '../playlistinput/playlistinput';
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './UserTable.module.scss';
import type Password from 'antd/es/input/Password';
import ArtistPopup from '../ArtistPopup/ArtistPopup';
import NewPassword from '../NewPassword/NewPassword';
import axios from 'axios';
import SureToDelete from '../SureToDelete/SureToDelete';
import { TableRowSelection } from 'antd/es/table/interface';

// const [seeAll, setSeeAll] = useState(false)

// artists.slice(0, seeAll ? artists.lenght : 4).map(() => <Card></Card>)


// const data = [
//     {
//         key: '1',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '2',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '3',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '4',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '5',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '6',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '7',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '8',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '9',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '10',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '11',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
//     {
//         key: '12',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     }, {
//         key: '13',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     }, {
//         key: '14',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     }, {
//         key: '15',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     }, {
//         key: '16',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     }, {
//         key: '17',
//         artist: 'September 17, 2024  11:22',
//         totalStreams: 'dolores.chambers@example.com',
//         Password: 'sandrooooo',
//         totalSongs: 5,
//     },
// ];



const UserTable: React.FC = () => {
    const [active, setActive] = useState<string>();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [selectedId, setSelectedId] = useState();

    console.log(selectedId, 'selectedId');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const [isOpen, setIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [artistPopup, setArtistPopup] = useState(false);

    const openPop = () => {
        console.log('111')
        setArtistPopup(true)
    }

    const closePop = () => {
        setArtistPopup(false)
    }

    const deletingShow = () => {
        setDeleteModal(true)
    }

    const deletingHide = () => {
        setDeleteModal(false)
    }


    const openModal = (record: any) => {
        setSelectedId(record.id)
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };




    const onSubmit = (values: any) => {
        console.log('Values', !!values)
    }

    // const handleSelectAll = (checked: boolean) => {
    //     if (checked) {
    //         setSelectedKeys(new Set(data.map(item => item.key)));
    //     } else {
    //         setSelectedKeys(new Set());
    //     }
    // };

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

    const handlePasswordToggle = (key: any) => {
        if (active === key) {
            setActive(''); // If the same field is clicked, hide the password
        } else {
            setActive(key); // Show password for the clicked field
        }
    };





    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('https://interstellar-1-pdzj.onrender.com/user')
            .then((result) => {
                setUsers(result.data)

            })
            .catch(() => {
                console.log('there is an error');
            })
    }, [])
    console.log(users, 'zd');




    const columns: ColumnsType<any> = [

        {
            title: 'Registration Date',
            dataIndex: '',
            key: 'artist',
            render: (text, record) => (
                <div className={styles.artistCell}>
                    <div>{record.createdAt}</div>
                </div>
            ),
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'totalStreams',
            key: 'totalStreams',
            width: '30%',
            render: (text, record) => (
                console.log(record, 'record'),
                <div onClick={() => {
                    artistPopup ? closePop() : openPop();
                    setSelectedId(record.key);
                }}>
                    {record.email}
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
                    <input type={active === record.key ? 'text' : 'password'} value={text} className={styles.inputPassword} />
                    <div onClick={() => handlePasswordToggle(record.key)}>
                        {record.password}
                        <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='trash' />
                    </div>
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                // console.log(text , 'text'),
                // console.log(record , 'record'),
                <div className={styles.actions}>
                    <button className={styles.unBorder} onClick={() => openModal(record)}>
                        <Image src={`/icon/Pen.svg`} width={24} height={24} alt='pen' />
                    </button>
                    <button className={styles.unBorder} onClick={deletingShow}>
                        <Image src={`/icon/trash.svg`} width={24} height={24} alt='trash' />
                    </button>
                    <button className={styles.unBorder}>
                        <Image src={`/icon/blockUnblock.svg`} width={24} height={24} alt='trash' />
                    </button>
                </div>
            ),
            width: '15%',
        },
    ];


    return (

        <div className={styles.tableContainer}>
            <Table
                rowSelection={rowSelection}
                className={styles.wrapper}
                columns={columns}
                dataSource={users}
                pagination={{
                    position: ['bottomCenter']
                }}
            />
            {
                artistPopup && <ArtistPopup closeModal={closePop} name={'dawdwad'} />
            }

            {isOpen &&
                <NewPassword closeModal={closeModal} id={selectedId} />
            }

            {
                deleteModal &&
                <SureToDelete onCancelClick={deletingHide} onDeleteClick={deletingHide} id={selectedId} />
            }
        </div>




    );
};

export default UserTable;


