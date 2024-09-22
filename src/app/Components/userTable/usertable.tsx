// 'use client'
// import React, { useEffect, useMemo, useState } from 'react';
// import { Table } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import Image from 'next/image';
// import PlaylistInput from '../playlistinput/playlistinput';
// import { useForm, SubmitHandler } from "react-hook-form";
// import styles from './UserTable.module.scss';
// import type Password from 'antd/es/input/Password';
// import ArtistPopup from '../ArtistPopup/ArtistPopup';
// import NewPassword from '../NewPassword/NewPassword';
// import axios from 'axios';
// import SureToDelete from '../SureToDelete/SureToDelete';
// import { TableRowSelection } from 'antd/es/table/interface';

// // const [seeAll, setSeeAll] = useState(false)

// // artists.slice(0, seeAll ? artists.lenght : 4).map(() => <Card></Card>)


// // const data = [
// //     {
// //         key: '1',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '2',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '3',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '4',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '5',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '6',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '7',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '8',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '9',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '10',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '11',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// //     {
// //         key: '12',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     }, {
// //         key: '13',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     }, {
// //         key: '14',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     }, {
// //         key: '15',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     }, {
// //         key: '16',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     }, {
// //         key: '17',
// //         artist: 'September 17, 2024  11:22',
// //         totalStreams: 'dolores.chambers@example.com',
// //         Password: 'sandrooooo',
// //         totalSongs: 5,
// //     },
// // ];

// type Props = {
//     id?: number;
// }

// const UserTable: React.FC = (props: Props) => {
//     const [active, setActive] = useState<string>();
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
//     const [selectedId, setSelectedId] = useState();

//     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

//     const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//         console.log('selectedRowKeys changed: ', newSelectedRowKeys);
//         setSelectedRowKeys(newSelectedRowKeys);
//     };

//     const rowSelection: TableRowSelection = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };


//     const [isOpen, setIsOpen] = useState(false);
//     const [deleteModal, setDeleteModal] = useState(false);
//     const [artistPopup, setArtistPopup] = useState(false);


//     const openPop = () => {
//         console.log('111')
//         setArtistPopup(true)
//     }

//     const closePop = () => {
//         setArtistPopup(false)
//     }

//     const deletingShow = (record: any) => {        
//         setSelectedId(record.id)        
//         setDeleteModal(true)
//     }

//     const deletingHide = () => {
//         setDeleteModal(false)
//     }


//     const openModal = (record: any) => {
//         setSelectedId(record.id)
//         setIsOpen(true);
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//     };


//     const [block, setBlock] = useState(true); // Default is open (true)

//   // Function to toggle the block state
//   const handleToggle = () => {
//     setBlock(!block); // Switch between true (open) and false (closed)
//   };



//     const onSubmit = (values: any) => {
//         console.log('Values', !!values)
//     }

//     // const handleSelectAll = (checked: boolean) => {
//     //     if (checked) {
//     //         setSelectedKeys(new Set(data.map(item => item.key)));
//     //     } else {
//     //         setSelectedKeys(new Set());
//     //     }
//     // };

//     const handleSelectOne = (key: string) => {
//         setSelectedKeys(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(key)) {
//                 newSet.delete(key);
//             } else {
//                 newSet.add(key);
//             }
//             return newSet;
//         });
//     };

//     const handlePasswordToggle = (key: any) => {
//         if (active === key) {
//             setActive(''); // If the same field is clicked, hide the password
//         } else {
//             setActive(key); // Show password for the clicked field
//         }
//     };




//     const fetching = () => {
//         axios.get('https://interstellar-1-pdzj.onrender.com/user')
//             .then((result) => {
//                 setUsers(result.data)

//             })
//             .catch(() => {
//                 console.log('there is an error');
//             })
//     }

//     const [users, setUsers] = useState([])
//     useEffect(fetching, [])




//     const memoizedUsers = useMemo(() => 
//         users.map((user: any) => ({
//             ...user,   
//             key: user.id, 
//         })), [users]
//     );





//     const columns: ColumnsType<any> = [

//         {
//             title: 'Registration Date',
//             dataIndex: '',
//             key: 'artist',
//             render: (text, record) => (
//                 <div className={styles.artistCell}>
//                     <div>{record.createdAt}</div>
//                 </div>
//             ),
//             width: '20%',
//         },
//         {
//             title: 'Email',
//             dataIndex: 'totalStreams',
//             key: 'totalStreams',
//             width: '30%',
//             render: (text, record) => (
//                 console.log(record, 'record'),
//                 <div onClick={() => {
//                     artistPopup ? closePop() : openPop();
//                     setSelectedId(record.key);
//                 }}>
//                     {record.email}
//                 </div>
//             ),
//         },
//         {
//             title: 'Password',
//             dataIndex: 'Password',
//             key: 'Password',
//             width: '15%',
//             render: (text, record) => (
//                 <div className={styles.Password}>
//                     <input type={active === record.key ? 'text' : 'password'} value={text} className={styles.inputPassword} />
//                     <div onClick={() => handlePasswordToggle(record.key)}>
//                         {record.password}
//                         <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='trash' />
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (text, record) => (
//                 // console.log(text , 'text'),
//                 // console.log(record , 'record'),
//                 <div className={styles.actions}>
//                     <button className={styles.unBorder} onClick={() => openModal(record)}>
//                         <Image src={`/icon/Pen.svg`} width={24} height={24} alt='pen' />
//                     </button>
//                     <button className={styles.unBorder} onClick={()=> deletingShow(record.id)}>
//                         <Image src={`/icon/trash.svg`} width={24} height={24} alt='trash' />
//                     </button>
//                     <button className={styles.unBorder} onClick={handleToggle}>
//                         <Image src={block ? '/icon/blockUnblock.svg' : '/icon/block-icon.svg'}  width={24} height={24} alt='trash' />
//                     </button>
//                 </div>
//             ),
//             width: '15%',
//         },
//     ];



// return (

//     <div className={styles.tableContainer}>
//         <Table
//             rowSelection={rowSelection}
//             className={styles.wrapper}
//             columns={columns}
//             dataSource={memoizedUsers}
//             pagination={{
//                 position: ['bottomCenter']
//             }}
//         />
//         {
//             artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />
//         }

//         {isOpen &&
//             <NewPassword closeModal={closeModal} id={selectedId} />
//         }

//         {
//             deleteModal &&
//             <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />
//         }
//     </div>




// );
// };

// export default UserTable;

















// 'use client';
// import React, { useEffect, useMemo, useState } from 'react';
// import { Table } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import Image from 'next/image';
// import { useForm } from "react-hook-form";
// import styles from './UserTable.module.scss';
// import axios from 'axios';
// import ArtistPopup from '../ArtistPopup/ArtistPopup';
// import NewPassword from '../NewPassword/NewPassword';
// import SureToDelete from '../SureToDelete/SureToDelete';
// import { TableRowSelection } from 'antd/es/table/interface';

// type User = {
//     id: number;
//     email: string;
//     password: string;
//     createdAt: string;
//     block: boolean;
// };

// const UserTable: React.FC = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//     const [selectedId, setSelectedId] = useState<number | undefined>();

//     const [users, setUsers] = useState<User[]>([]);
//     const [artistPopup, setArtistPopup] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);
//     const [deleteModal, setDeleteModal] = useState(false);

//     // State to track active password field for toggling
//     const [activePasswordId, setActivePasswordId] = useState<number | null>(null);

//     // Row selection handler for the table
//     const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//         setSelectedRowKeys(newSelectedRowKeys);
//     };

//     const rowSelection: TableRowSelection<any> = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };

//     const openPop = () => setArtistPopup(true);
//     const closePop = () => setArtistPopup(false);

//     const openModal = (record: User) => {
//         setSelectedId(record.id);
//         setIsOpen(true);
//     };

//     const closeModal = () => setIsOpen(false);

//     const deletingShow = (record: User) => {        
//         setSelectedId(record.id);
//         setDeleteModal(true);
//     };

//     const deletingHide = () => setDeleteModal(false);

//     // Fetch users from the backend
//     const fetching = () => {
//         axios.get('https://interstellar-1-pdzj.onrender.com/user')
//             .then((result) => {
//                 setUsers(result.data.map((user: User) => ({
//                     ...user,
//                     block: true // Initialize block state for each user
//                 })));
//             })
//             .catch(() => {
//                 console.log('Error fetching users');
//             });
//     };

//     useEffect(fetching, []);

//     // Function to toggle the block state of a specific user
//     const toggleBlock = (id: number) => {
//         setUsers(prevUsers =>
//             prevUsers.map(user =>
//                 user.id === id ? { ...user, block: !user.block } : user
//             )
//         );
//     };

//     // Function to toggle password visibility for a specific user
//     const handlePasswordToggle = (id: number) => {
//         setActivePasswordId(activePasswordId === id ? null : id);
//     };

//     // Memoized user data for table rendering
//     const memoizedUsers = useMemo(() =>
//         users.map((user: User) => ({
//             ...user,
//             key: user.id, // Assigning key for Ant Design Table
//         })), [users]
//     );

//     // Table columns definition
//     const columns: ColumnsType<User> = [
//         {
//             title: 'Registration Date',
//             key: 'createdAt',
//             render: (_, record) => (
//                 <div className={styles.artistCell}>
//                     <div>{record.createdAt}</div>
//                 </div>
//             ),
//             width: '20%',
//         },
//         {
//             title: 'Email',
//             key: 'email',
//             width: '30%',
//             render: (_, record) => (
//                 <div onClick={() => {
//                     artistPopup ? closePop() : openPop();
//                     setSelectedId(record.id);
//                 }}>
//                     {record.email}
//                 </div>
//             ),
//         },
//         {
//             title: 'Password',
//             key: 'password',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.Password}>
//                     <input
//                         type={activePasswordId === record.id ? 'text' : 'password'}
//                         value={record.password}
//                         readOnly
//                         className={styles.inputPassword}
//                     />
//                     <div onClick={() => handlePasswordToggle(record.id)}>
//                         <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='password-toggle' />
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.actions}>
//                     <button className={styles.unBorder} onClick={() => openModal(record)}>
//                         <Image src={`/icon/Pen.svg`} width={24} height={24} alt='edit' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => deletingShow(record)}>
//                         <Image src={`/icon/trash.svg`} width={24} height={24} alt='delete' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => toggleBlock(record.id)}>
//                         <Image
//                             src={record.block ? '/icon/blockUnblock.svg' : '/icon/block-icon.svg'}
//                             width={24}
//                             height={24}
//                             alt='block/unblock'
//                         />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className={styles.tableContainer}>
//             <Table
//                 rowSelection={rowSelection}
//                 className={styles.wrapper}
//                 columns={columns}
//                 dataSource={memoizedUsers}
//                 pagination={{ position: ['bottomCenter'] }}
//             />
//             {artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />}
//             {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
//             {deleteModal && <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />}
//         </div>
//     );
// };

// export default UserTable;























// import React, { useState, useEffect, useMemo } from 'react';
// import { Table, Tabs, message } from 'antd';
// import Image from 'next/image';
// import axios from 'axios';
// import styles from './UserTable.module.scss';

// const { TabPane } = Tabs;

// type User = {
//   id: number;
//   email: string;
//   password: string;
//   createdAt: string;
//   blocked: boolean;
// };

// const UserTable: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
//   const [activeTab, setActiveTab] = useState<string>('all');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const result = await axios.get('https://interstellar-1-pdzj.onrender.com/user');
//         const fetchedUsers = result.data.map((user: User) => ({ ...user, key: user.id }));
//         setUsers(fetchedUsers);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         message.error('Failed to fetch users');
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleBlockToggle = (user: User) => {
//     if (user.blocked) {
//       unblockUser(user);
//     } else {
//       blockUser(user);
//     }
//   };

//   const blockUser = (user: User) => {
//     setUsers(prev => prev.filter(u => u.id !== user.id));
//     setBlockedUsers(prev => [...prev, { ...user, blocked: true }]);
//     message.success(`${user.email} has been blocked`);
//   };

//   const unblockUser = (user: User) => {
//     setBlockedUsers(prev => prev.filter(u => u.id !== user.id));
//     setUsers(prev => [...prev, { ...user, blocked: false }]);
//     message.success(`${user.email} has been unblocked`);
//   };

//   const columns = useMemo(() => [
//     {
//       title: 'Registration Date',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Password',
//       dataIndex: 'password',
//       key: 'password',
//       render: (password: string) => <input type="password" value={password} readOnly />,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record: User) => (
//         <div className={styles.actions}>
//           <button onClick={() => handleBlockToggle(record)}>
//             <Image
//               src={record.blocked ? '/icon/unblock-icon.svg' : '/icon/block-icon.svg'}
//               width={24}
//               height={24}
//               alt={record.blocked ? 'Unblock' : 'Block'}
//             />
//           </button>
//         </div>
//       ),
//     },
//   ], []);

//   return (
//     <div className={styles.tableContainer}>
//       <Tabs activeKey={activeTab} onChange={setActiveTab}>
//         <TabPane tab="All Users" key="all">
//           <Table
//             className={styles.wrapper}
//             columns={columns}
//             dataSource={users}
//             pagination={{ position: ['bottomCenter'] }}
//           />
//         </TabPane>
//         <TabPane tab="Blocked Users" key="blocked">
//           <Table
//             className={styles.wrapper}
//             columns={columns}
//             dataSource={blockedUsers}
//             pagination={{ position: ['bottomCenter'] }}
//           />
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default UserTable;






























// 'use client';
// import React, { useEffect, useMemo, useState } from 'react';
// import { Table } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import Image from 'next/image';
// import { useForm } from "react-hook-form";
// import styles from './UserTable.module.scss';
// import axios from 'axios';
// import ArtistPopup from '../ArtistPopup/ArtistPopup';
// import NewPassword from '../NewPassword/NewPassword';
// import SureToDelete from '../SureToDelete/SureToDelete';
// import { TableRowSelection } from 'antd/es/table/interface';
// import { Tabs } from 'antd';
// import TabPane from 'antd/es/tabs/TabPane';

// type User = {
//     id: number;
//     email: string;
//     password: string;
//     createdAt: string;
//     block: boolean;
// };

// const UserTable: React.FC = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//     const [selectedId, setSelectedId] = useState<number | undefined>();

//     const [users, setUsers] = useState<User[]>([]);
//     const [artistPopup, setArtistPopup] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);
//     const [deleteModal, setDeleteModal] = useState(false);

//     // State to track active password field for toggling
//     const [activePasswordId, setActivePasswordId] = useState<number | null>(null);

//     // Row selection handler for the table
//     const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//         setSelectedRowKeys(newSelectedRowKeys);
//     };

//     const rowSelection: TableRowSelection<any> = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };

//     const openPop = () => setArtistPopup(true);
//     const closePop = () => setArtistPopup(false);

//     const openModal = (record: User) => {
//         setSelectedId(record.id);
//         setIsOpen(true);
//     };

//     const closeModal = () => setIsOpen(false);

//     const deletingShow = (record: User) => {
//         setSelectedId(record.id);
//         setDeleteModal(true);
//     };

//     const deletingHide = () => setDeleteModal(false);

//     // Fetch users from the backend
//     const fetching = () => {
//         axios.get('https://interstellar-1-pdzj.onrender.com/user')
//             .then((result) => {
//                 setUsers(result.data.map((user: User) => ({
//                     ...user,
//                     block: true // Initialize block state for each user
//                 })));
//             })
//             .catch(() => {
//                 console.log('Error fetching users');
//             });
//     };

//     useEffect(fetching, []);

//     // Function to toggle the block state of a specific user
//     const toggleBlock = (id: number) => {
//         setUsers(prevUsers =>
//             prevUsers.map(user =>
//                 user.id === id ? { ...user, block: !user.block } : user
//             )
//         );
//     };

//     // Function to toggle password visibility for a specific user
//     const handlePasswordToggle = (id: number) => {
//         setActivePasswordId(activePasswordId === id ? null : id);
//     };

//     // Memoized user data for table rendering
//     const memoizedUsers = useMemo(() =>
//         users.map((user: User) => ({
//             ...user,
//             key: user.id, // Assigning key for Ant Design Table
//         })), [users]
//     );

//     // Table columns definition
//     const columns: ColumnsType<User> = [
//         {
//             title: 'Registration Date',
//             key: 'createdAt',
//             render: (_, record) => (
//                 <div className={styles.artistCell}>
//                     <div>{record.createdAt}</div>
//                 </div>
//             ),
//             width: '20%',
//         },
//         {
//             title: 'Email',
//             key: 'email',
//             width: '30%',
//             render: (_, record) => (
//                 <div onClick={() => {
//                     artistPopup ? closePop() : openPop();
//                     setSelectedId(record.id);
//                 }}>
//                     {record.email}
//                 </div>
//             ),
//         },
//         {
//             title: 'Password',
//             key: 'password',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.Password}>
//                     <input
//                         type={activePasswordId === record.id ? 'text' : 'password'}
//                         value={record.password}
//                         readOnly
//                         className={styles.inputPassword}
//                     />
//                     <div onClick={() => handlePasswordToggle(record.id)}>
//                         <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='password-toggle' />
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.actions}>
//                     <button className={styles.unBorder} onClick={() => openModal(record)}>
//                         <Image src={`/icon/Pen.svg`} width={24} height={24} alt='edit' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => deletingShow(record)}>
//                         <Image src={`/icon/trash.svg`} width={24} height={24} alt='delete' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => toggleBlock(record.id)}>
//                         <Image
//                             src={record.block ? '/icon/blockUnblock.svg' : '/icon/block-icon.svg'}
//                             width={24}
//                             height={24}
//                             alt='block/unblock'
//                         />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (

//         <div className={styles.tableContainer}>
//             <Tabs style={{width: '1100px'}} defaultActiveKey="1" className={styles.tabContainer}>

//                 <TabPane tab={<span style={{
//                     color: '#fff',
//                     fontSize: '18px',
//                     fontWeight: '500',
//                 }}>All Users</span>} key="1">
//                     <div>
//                         <Table
//                             rowSelection={rowSelection}
//                             className={styles.wrapper}
//                             columns={columns}
//                             dataSource={memoizedUsers}
//                             pagination={{ position: ['bottomCenter'] }}
//                         />
//                         {artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />}
//                         {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
//                         {deleteModal && <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />}
//                     </div>
//                 </TabPane>


//                 <TabPane tab={<span style={{
//                     color: '#fff',
//                     fontSize: '18px', fontWeight: '500'
//                 }}>Blocked Users</span>} key="2">
//                     <div>
//                         <Table
//                             rowSelection={rowSelection}
//                             className={styles.wrapper}
//                             columns={columns}
//                             dataSource={memoizedUsers}
//                             pagination={{ position: ['bottomCenter'] }}
//                         />

//                         {deleteModal && <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />}
//                     </div>
//                 </TabPane>

//             </Tabs>

//         </div>
//     );
// };

// export default UserTable;

























































// 'use client';
// import React, { useEffect, useMemo, useState } from 'react';
// import { Table } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import Image from 'next/image';
// import { useForm } from "react-hook-form";
// import styles from './UserTable.module.scss';
// import axios from 'axios';
// import ArtistPopup from '../ArtistPopup/ArtistPopup';
// import NewPassword from '../NewPassword/NewPassword';
// import SureToDelete from '../SureToDelete/SureToDelete';
// import { Tabs } from 'antd';
// import TabPane from 'antd/es/tabs/TabPane';
// import UserBlockBtn from '../UserBlockBtn/UserBlockBtn';
// import UserDeleteBtn from '../UserDeleteBtn/UserDeleteBtn';

// type User = {
//     id: number;
//     email: string;
//     password: string;
//     createdAt: string;
//     block: boolean;
// };

// const UserTable: React.FC = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [selectedRowKeysAll, setSelectedRowKeysAll] = useState<React.Key[]>([]);
//     const [selectedRowKeysBlocked, setSelectedRowKeysBlocked] = useState<React.Key[]>([]);
//     const [selectedId, setSelectedId] = useState<number | undefined>();
//     const [users, setUsers] = useState<User[]>([]);
//     const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
//     const [artistPopup, setArtistPopup] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);
//     const [deleteModal, setDeleteModal] = useState(false);
//     const [activePasswordId, setActivePasswordId] = useState<number | null>(null);

//     const openPop = () => setArtistPopup(true);
//     const closePop = () => setArtistPopup(false);
//     const openModal = (record: User) => {
//         setSelectedId(record.id);
//         setIsOpen(true);
//     };
//     const closeModal = () => setIsOpen(false);
//     const deletingShow = (record: User) => {
//         setSelectedId(record.id);
//         setDeleteModal(true);
//     };
//     const deletingHide = () => setDeleteModal(false);

//     const fetching = () => {
//         axios.get('https://interstellar-1-pdzj.onrender.com/user')
//             .then((result) => {
//                 setUsers(result.data.map((user: User) => ({
//                     ...user,
//                     block: false
//                 })));
//             })
//             .catch(() => {
//                 console.log('Error fetching users');
//             });
//     };

//     useEffect(fetching, []);

//     const toggleBlock = (id: number) => {
//         setUsers(prevUsers => {
//             const updatedUsers = prevUsers.map(user =>
//                 user.id === id ? { ...user, block: !user.block } : user
//             );
//             setBlockedUsers(updatedUsers.filter(user => user.block));
//             return updatedUsers;
//         });
//     };

//     const handlePasswordToggle = (id: number) => {
//         setActivePasswordId(activePasswordId === id ? null : id);
//     };

//     const memoizedUsers = useMemo(() =>
//         users.map((user: User) => ({
//             ...user,
//             key: user.id,
//         })), [users]
//     );

//     const memoizedBlockedUsers = useMemo(() =>
//         blockedUsers.map((user: User) => ({
//             ...user,
//             key: user.id,
//         })), [blockedUsers]
//     );

//     const columns: ColumnsType<User> = [
//         {
//             title: 'Registration Date',
//             key: 'createdAt',
//             render: (_, record) => (
//                 <div className={styles.artistCell}>
//                     <div>{record.createdAt}</div>
//                 </div>
//             ),
//             width: '20%',
//         },
//         {
//             title: 'Email',
//             key: 'email',
//             width: '30%',
//             render: (_, record) => (
//                 <div onClick={() => {
//                     artistPopup ? closePop() : openPop();
//                     setSelectedId(record.id);
//                 }}>
//                     {record.email}
//                 </div>
//             ),
//         },
//         {
//             title: 'Password',
//             key: 'password',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.Password}>
//                     <input
//                         type={activePasswordId === record.id ? 'text' : 'password'}
//                         value={record.password}
//                         readOnly
//                         className={styles.inputPassword}
//                     />
//                     <div onClick={() => handlePasswordToggle(record.id)}>
//                         <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='password-toggle' />
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.actions}>
//                     <button className={styles.unBorder} onClick={() => openModal(record)}>
//                         <Image src={`/icon/Pen.svg`} width={24} height={24} alt='edit' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => deletingShow(record)}>
//                         <Image src={`/icon/trash.svg`} width={24} height={24} alt='delete' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => toggleBlock(record.id)}>
//                         <Image
//                             src={record.block ? '/icon/block-icon.svg' : '/icon/unblock-icon.svg'}
//                             width={24}
//                             height={24}
//                             alt='block/unblock'
//                         />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className={styles.tableContainer}>
//             <Tabs style={{ width: '1100px' }} defaultActiveKey="1" className={styles.tabContainer}>
//                 <TabPane tab={<span style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>All Users</span>} key="1">
//                     <div>
//                         <div className={styles.btnW}>
//                             {selectedRowKeysAll.length > 0 && (
//                                 <div className={styles.buttons}>
//                                     <UserBlockBtn />
//                                     <UserDeleteBtn />
//                                 </div>
//                             )}
//                         </div>
//                         <Table
//                             rowSelection={{
//                                 selectedRowKeys: selectedRowKeysAll,
//                                 onChange: setSelectedRowKeysAll,
//                             }}
//                             className={styles.wrapper}
//                             columns={columns}
//                             dataSource={memoizedUsers}
//                             pagination={{ position: ['bottomCenter'] }}
//                         />
//                         {artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />}
//                         {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
//                         {deleteModal && <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />}
//                     </div>
//                 </TabPane>

//                 <TabPane tab={<span style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>Blocked Users</span>} key="2">
//                     <div>
//                         {selectedRowKeysBlocked.length > 0 && (
//                             <div className={styles.buttons}>
//                                 <UserBlockBtn />
//                                 <UserDeleteBtn />
//                             </div>
//                         )}
//                         <Table
//                             rowSelection={{
//                                 selectedRowKeys: selectedRowKeysBlocked,
//                                 onChange: setSelectedRowKeysBlocked,
//                             }}
//                             className={styles.wrapper}
//                             columns={columns}
//                             dataSource={memoizedBlockedUsers}
//                             pagination={{ position: ['bottomCenter'] }}
//                         />
//                         {artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />}
//                         {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
//                         {deleteModal && <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />}
//                     </div>
//                 </TabPane>
//             </Tabs>
//         </div>
//     );
// };

// export default UserTable;















































































// 'use client';
// import React, { useEffect, useMemo, useState } from 'react';
// import { Table, Tabs, Input } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import Image from 'next/image';
// import { useForm } from "react-hook-form";
// import styles from './UserTable.module.scss';
// import axios from 'axios';
// import ArtistPopup from '../ArtistPopup/ArtistPopup';
// import NewPassword from '../NewPassword/NewPassword';
// import SureToDelete from '../SureToDelete/SureToDelete';
// import UserBlockBtn from '../UserBlockBtn/UserBlockBtn';
// import UserDeleteBtn from '../UserDeleteBtn/UserDeleteBtn';

// type User = {
//     id: number;
//     email: string;
//     password: string;
//     createdAt: string;
//     block: boolean;
// };

// const UserTable: React.FC = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [selectedRowKeysAll, setSelectedRowKeysAll] = useState<React.Key[]>([]);
//     const [selectedRowKeysBlocked, setSelectedRowKeysBlocked] = useState<React.Key[]>([]);
//     const [selectedId, setSelectedId] = useState<number | undefined>();
//     const [users, setUsers] = useState<User[]>([]);
//     const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
//     const [artistPopup, setArtistPopup] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);
//     const [deleteModal, setDeleteModal] = useState(false);
//     const [activePasswordId, setActivePasswordId] = useState<number | null>(null);
//     const [searchQuery, setSearchQuery] = useState(''); // State for search input

//     const openPop = () => setArtistPopup(true);
//     const closePop = () => setArtistPopup(false);
//     const openModal = (record: User) => {
//         setSelectedId(record.id);
//         setIsOpen(true);
//     };
//     const closeModal = () => setIsOpen(false);
//     const deletingShow = (record: User) => {
//         setSelectedId(record.id);
//         setDeleteModal(true);
//     };
//     const deletingHide = () => setDeleteModal(false);

//     const fetching = () => {
//         axios.get('https://interstellar-1-pdzj.onrender.com/user')
//             .then((result) => {
//                 setUsers(result.data.map((user: User) => ({
//                     ...user,
//                     block: false
//                 })));
//             })
//             .catch(() => {
//                 console.log('Error fetching users');
//             });
//         deletingHide();
//     };

//     useEffect(fetching, []);

//     const toggleBlock = (id: number) => {
//         setUsers(prevUsers => {
//             const updatedUsers = prevUsers.map(user =>
//                 user.id === id ? { ...user, block: !user.block } : user
//             );
//             setBlockedUsers(updatedUsers.filter(user => user.block));
//             return updatedUsers;
//         });
//     };

//     const handlePasswordToggle = (id: number) => {
//         setActivePasswordId(activePasswordId === id ? null : id);
//     };

//     // Memoized users with search filter applied
//     const memoizedUsers = useMemo(() => {
//         return users
//             .filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase())) // Filter users by search query
//             .sort((a, b) => {
//                 const aIncludes = a.email.toLowerCase().includes(searchQuery.toLowerCase());
//                 const bIncludes = b.email.toLowerCase().includes(searchQuery.toLowerCase());
//                 if (aIncludes && !bIncludes) return -1; // Sort matching users to the top
//                 if (!aIncludes && bIncludes) return 1;
//                 return 0;
//             })
//             .map(user => ({
//                 ...user,
//                 key: user.id,
//             }));
//     }, [users, searchQuery]);





//     const memoizedBlockedUsers = useMemo(() => {
//         return blockedUsers
//             .filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase())) // Filter based on search query
//             .sort((a, b) => {
//                 const aIncludes = a.email.toLowerCase().includes(searchQuery.toLowerCase());
//                 const bIncludes = b.email.toLowerCase().includes(searchQuery.toLowerCase());
//                 if (aIncludes && !bIncludes) return -1; // Sort matching users to the top
//                 if (!aIncludes && bIncludes) return 1;
//                 return 0;
//             })
//             .map(user => ({
//                 ...user,
//                 key: user.id,
//             }));
//     }, [blockedUsers, searchQuery]);




//     const columns: ColumnsType<User> = [
//         {
//             title: 'Registration Date',
//             key: 'createdAt',
//             render: (_, record) => (
//                 <div className={styles.artistCell}>
//                     <div>{record.createdAt}</div>
//                 </div>
//             ),
//             width: '20%',
//         },
//         {
//             title: 'Email',
//             key: 'email',
//             width: '30%',
//             render: (_, record) => (
//                 <div onClick={() => {
//                     artistPopup ? closePop() : openPop();
//                     setSelectedId(record.id);
//                 }}>
//                     {record.email}
//                 </div>
//             ),
//         },
//         {
//             title: 'Password',
//             key: 'password',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.Password}>
//                     <input
//                         type={activePasswordId === record.id ? 'text' : 'password'}
//                         value={record.password}
//                         readOnly
//                         className={styles.inputPassword}
//                     />
//                     <div onClick={() => handlePasswordToggle(record.id)}>
//                         <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='password-toggle' />
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             title: 'Actions',
//             key: 'actions',
//             width: '15%',
//             render: (_, record) => (
//                 <div className={styles.actions}>
//                     <button className={styles.unBorder} onClick={() => openModal(record)}>
//                         <Image src={`/icon/Pen.svg`} width={24} height={24} alt='edit' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => deletingShow(record)}>
//                         <Image src={`/icon/trash.svg`} width={24} height={24} alt='delete' />
//                     </button>
//                     <button className={styles.unBorder} onClick={() => toggleBlock(record.id)}>
//                         <Image
//                             src={record.block ? '/icon/block-icon.svg' : '/icon/unblock-icon.svg'}
//                             width={24}
//                             height={24}
//                             alt='block/unblock'
//                         />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     const tabItems = [
//         {
//             key: "1",
//             label: <span style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>All Users</span>,
//             children: (
//                 <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>

//                     <input
//                         placeholder="Search by email"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         style={{
//                             width: '500px',
//                             height: '55px',
//                             borderRadius: '8px',
//                             border: '1px solid gray',
//                             outline: 'none',
//                             backgroundColor: 'unset',
//                             padding: '0 18px',
//                             fontSize: '17px',
//                             color: '#fff',
//                             position: 'absolute',
//                             top: '-220px',

//                         }}
//                     />
//                     {selectedRowKeysAll.length > 0 && (
//                         <div className={styles.buttons} style={{
//                             display: 'flex',
//                             gap: '20px',
//                             position: 'absolute',
//                             top: '-112px',
//                             zIndex: '10'
//                         }}>
//                             <UserBlockBtn />
//                             <UserDeleteBtn />
//                         </div>
//                     )}
//                     <Table
//                         rowSelection={{
//                             selectedRowKeys: selectedRowKeysAll,
//                             onChange: setSelectedRowKeysAll,
//                         }}
//                         className={styles.wrapper}
//                         columns={columns}
//                         dataSource={memoizedUsers}
//                         pagination={{ position: ['bottomCenter'] }}
//                     />
//                     {artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />}
//                     {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
//                     {deleteModal && <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />}
//                 </div>
//             )
//         },
//         {
//             key: "2",
//             label: <span style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>Blocked Users</span>,
//             children: (
//                 <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
//                     <input style={{
//                         width: '500px',
//                         height: '55px',
//                         borderRadius: '8px',
//                         border: '1px solid gray',
//                         outline: 'none',
//                         backgroundColor: 'unset',
//                         padding: '0 18px',
//                         fontSize: '17px',
//                         color: '#fff',
//                         position: 'absolute',
//                         top: '-220px',

//                     }} />

//                     {selectedRowKeysBlocked.length > 0 && (
//                         <div className={styles.buttons} style={{
//                             display: 'flex',
//                             gap: '20px',
//                             position: 'absolute',
//                             top: '-112px',
//                             zIndex: '10'
//                         }}>
//                             <UserBlockBtn />
//                             <UserDeleteBtn />
//                         </div>
//                     )}
//                     <Table
//                         rowSelection={{
//                             selectedRowKeys: selectedRowKeysBlocked,
//                             onChange: setSelectedRowKeysBlocked,
//                         }}
//                         className={styles.wrapper}
//                         columns={columns}
//                         dataSource={memoizedBlockedUsers} // Use the memoized blocked users here
//                         pagination={{ position: ['bottomCenter'] }}
//                     />
//                     {artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />}
//                     {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
//                     {deleteModal && <SureToDelete onCancelClick={deletingHide} onDeleteClick={fetching} id={selectedId} />}
//                 </div>
//             )
//         }
//     ];

//     return (
//         <div className={styles.tableContainer}>
//             <Tabs style={{ width: '1100px' }} defaultActiveKey="1" items={tabItems} />
//         </div>
//     );
// };

// export default UserTable;



























'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Table, Tabs, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import axios from 'axios';
import ArtistPopup from '../ArtistPopup/ArtistPopup';
import NewPassword from '../NewPassword/NewPassword';
import SureToDelete from '../SureToDelete/SureToDelete';
import UserBlockBtn from '../UserBlockBtn/UserBlockBtn';
import UserDeleteBtn from '../UserDeleteBtn/UserDeleteBtn';
import styles from './UserTable.module.scss';

type User = {
    id: number;
    email: string;
    password: string;
    createdAt: string;
    block: boolean;
};

const UserTable: React.FC = () => {
    const [selectedRowKeysAll, setSelectedRowKeysAll] = useState<React.Key[]>([]);
    const [selectedRowKeysBlocked, setSelectedRowKeysBlocked] = useState<React.Key[]>([]);
    const [selectedId, setSelectedId] = useState<number | undefined>();
    const [users, setUsers] = useState<User[]>([]);
    const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
    const [artistPopup, setArtistPopup] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [activePasswordId, setActivePasswordId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const openPop = () => setArtistPopup(true);
    const closePop = () => setArtistPopup(false);
    const openModal = (record: User) => {
        setSelectedId(record.id);
        setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);
    const showDeleteModal = (record: User) => {
        setSelectedId(record.id);
        setDeleteModal(true);
    };
    const hideDeleteModal = () => setDeleteModal(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://interstellar-1-pdzj.onrender.com/user');
            const fetchedUsers = response.data.map((user: User) => ({ ...user, block: false }));
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    
    useEffect(() => {
        fetchUsers();
    }, []);




    const toggleBlock = (id: number) => {
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map(user =>
                user.id === id ? { ...user, block: !user.block } : user
            );
            setBlockedUsers(updatedUsers.filter(user => user.block));
            return updatedUsers;
        });
    };

    const handlePasswordToggle = (id: number) => {
        setActivePasswordId(activePasswordId === id ? null : id);
    };

    const memoizedUsers = useMemo(() => {
        return users
            .filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => (a.email.includes(searchQuery) ? -1 : 1))
            .map(user => ({ ...user, key: user.id }));
    }, [users, searchQuery]);

    const memoizedBlockedUsers = useMemo(() => {
        return blockedUsers
            .filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => (a.email.includes(searchQuery) ? -1 : 1))
            .map(user => ({ ...user, key: user.id }));
    }, [blockedUsers, searchQuery]);

    const columns: ColumnsType<User> = [
        {
            title: 'Registration Date',
            key: 'createdAt',
            render: (_, record) => <div className={styles.artistCell}>{record.createdAt}</div>,
            width: '20%',
        },
        {
            title: 'Email',
            key: 'email',
            width: '30%',
            render: (_, record) => (
                <div onClick={() => {
                    artistPopup ? closePop() : openPop();
                    setSelectedId(record.id);
                }}>
                    {record.email}
                </div>
            ),
        },
        {
            title: 'Password',
            key: 'password',
            width: '15%',
            render: (_, record) => (
                <div className={styles.Password}>
                    <input
                        type={activePasswordId === record.id ? 'text' : 'password'}
                        value={record.password}
                        readOnly
                        className={styles.inputPassword}
                    />
                    <div onClick={() => handlePasswordToggle(record.id)}>
                        <Image src={`/icon/paswordhider.svg`} width={24} height={24} alt='toggle password visibility' />
                    </div>
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '15%',
            render: (_, record) => (
                <div className={styles.actions}>
                    <button className={styles.unBorder} onClick={() => openModal(record)}>
                        <Image src={`/icon/Pen.svg`} width={24} height={24} alt='edit' />
                    </button>
                    <button className={styles.unBorder} onClick={() => showDeleteModal(record)}>
                        <Image src={`/icon/trash.svg`} width={24} height={24} alt='delete' />
                    </button>
                    <button className={styles.unBorder} onClick={() => toggleBlock(record.id)}>
                        <Image
                            src={record.block ? '/icon/block-icon.svg' : '/icon/unblock-icon.svg'}
                            width={24}
                            height={24}
                            alt='block/unblock'
                        />
                    </button>
                </div>
            ),
        },
    ];

    const tabItems = [
        {
            key: "1",
            label: <span style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>All Users</span>,
            children: (
                <div className={styles.tabContent}>
                    <input
                        placeholder="Search by email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '500px', marginBottom: '20px',
                            height: '55px',
                            borderRadius: '8px',
                            border: '1px solid gray',
                            outline: 'none',
                            backgroundColor: 'unset',
                            padding: '0 18px',
                            fontSize: '17px',
                            color: '#fff',
                            position: 'absolute',
                            top: '-220px',
                        }}
                    />
                    {selectedRowKeysAll.length > 0 && (
                        <div className={styles.buttons} style={{
                            display: 'flex',
                            gap: '20px',
                            position: 'absolute',
                            top: '-112px',
                            zIndex: '10'
                        }}>
                            <UserBlockBtn />
                            <UserDeleteBtn />
                        </div>
                    )}

                    <Table
                        rowSelection={{
                            selectedRowKeys: selectedRowKeysAll,
                            onChange: setSelectedRowKeysAll,
                        }}
                        className={styles.wrapper}
                        columns={columns}
                        dataSource={memoizedUsers}
                        pagination={{ position: ['bottomCenter'] }}
                    />
                    {artistPopup && <ArtistPopup closeModal={closePop} name={''} />}
                    {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
                    {deleteModal && <SureToDelete onCancelClick={hideDeleteModal} onDeleteClick={fetchUsers} id={selectedId} />}
                </div>
            ),
        },
        {
            key: "2",
            label: <span style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>Blocked Users</span>,
            children: (
                <div className={styles.tabContent}>

                    <input
                        placeholder="Search by email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '500px',
                            height: '55px',
                            borderRadius: '8px',
                            border: '1px solid gray',
                            outline: 'none',
                            backgroundColor: 'unset',
                            padding: '0 18px',
                            fontSize: '17px',
                            color: '#fff',
                            position: 'absolute',
                            top: '-220px',

                        }} />

                    {selectedRowKeysBlocked.length > 0 && (
                        <div className={styles.buttons} style={{
                            display: 'flex',
                            gap: '20px',
                            position: 'absolute',
                            top: '-112px',
                            zIndex: '10'
                        }}>
                           
                            <UserDeleteBtn />
                        </div>
                    )}
                    <Table
                        rowSelection={{
                            selectedRowKeys: selectedRowKeysBlocked,
                            onChange: setSelectedRowKeysBlocked,
                        }}
                        className={styles.wrapper}
                        columns={columns}
                        dataSource={memoizedBlockedUsers}
                        pagination={{ position: ['bottomCenter'] }}
                    />
                    {artistPopup && <ArtistPopup closeModal={closePop} name={'Dolores'} />}
                    {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
                    {deleteModal && <SureToDelete onCancelClick={hideDeleteModal} onDeleteClick={fetchUsers} id={selectedId} />}
                </div>
            ),
        },
    ];

    return (
        <div className={styles.tableContainer}>
            <Tabs defaultActiveKey="1" items={tabItems} style={{ width: '1100px' }} />
        </div>
    );
};

export default UserTable;



















