
'use client'; 

import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import styles from './usertable.module.scss';
import ArtistPopup from '../ArtistPopup/ArtistPopup';

interface User {
  key: string;
  artist: string;
  totalStreams: string;
  Password: string;
  totalSongs: number;
}

const data: User[] = [
  {
    key: '1',
    artist: 'September 17, 2024 11:22',
    totalStreams: 'dolores.chambers@example.com',
    Password: 'sandrooooo',
    totalSongs: 5,
  },
  // Add other data objects here...
];

const UserTable: React.FC = () => {
  const [active, setActive] = useState<string>();
  const { register, handleSubmit } = useForm();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [block, setBlock] = useState(true); // Default is open (true)

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setBlock(!block); // Toggle between true (open) and false (closed)
  };

  const onSubmit = (values: unknown) => {
    console.log('Values', !!values);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(new Set(data.map((item) => item.key)));
    } else {
      setSelectedKeys(new Set());
    }
  };

  const handleSelectOne = (key: string) => {
    setSelectedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handlePasswordToggle = (key: string) => {
    if (active === key) {
      setActive(''); // Hide password if the same field is clicked
    } else {
      setActive(key); // Show password for the clicked field
    }
  };

  const columns: ColumnsType<User> = [
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
      render: (_, record) => (
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
        </form>
      ),
      width: '5%',
    },
    {
      title: 'Registration Date',
      dataIndex: 'artist',
      key: 'artist',
      render: (text) => <div className={styles.artistCell}>{text}</div>,
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'totalStreams',
      key: 'totalStreams',
      width: '30%',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      key: 'Password',
      width: '15%',
      render: (text, record) => (
        <div className={styles.Password}>
          <input
            type={active === record.key ? 'text' : 'password'}
            value={text}
            className={styles.inputPassword}
            readOnly
          />
          <div onClick={() => handlePasswordToggle(record.key)}>
            <Image
              src={`/icon/paswordhider.svg`}
              width={24}
              height={24}
              alt='toggle password visibility'
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <div className={styles.actions}>
          <button className={styles.unBorder} onClick={openModal}>
            <Image src={`/icon/Pen.svg`} width={24} height={24} alt='edit' />
          </button>
          <button className={styles.unBorder}>
            <Image src={`/icon/trash.svg`} width={24} height={24} alt='delete' />
          </button>
          <button className={styles.unBorder} onClick={handleToggle}>
            <Image
              src={block ? '/icon/blockUnblock.svg' : '/icon/block-icon.svg'}
              width={24}
              height={24}
              alt='block/unblock'
            />
          </button>
        </div>
      ),
      width: '15%',
    },
  ];

  return (
    <div>
      <Table
        className={styles.wrapper}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomCenter'] }}
      />
      {isOpen && (
        <ArtistPopup
          name={'Artist Name'}
          closeModal={closeModal} // Pass the closeModal function
        />
      )}
    </div>
  );
};

export default UserTable;