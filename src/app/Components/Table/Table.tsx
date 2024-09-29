"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import styles from "./Table.module.scss";
import AddArtistPopup from "../addArtistPopup/AddArtistPopup";
import AddAlbum from "../popups/addAlbum/addAlbum";
import { useRecoilState, useRecoilValue } from "recoil";
import { artistNAmeState, authorIdStates, clickState, deleteStates } from "@/app/states";
import axios from "axios";
import { useForm } from "react-hook-form";

interface Author {
  key: string;
  artist: string;
  totalStreams: number;
  totalAlbums: number;
  totalSongs: number;
  files: { url: string }[];
  firstName: string;
  lastName: string;
  id: number;
}

const MusicTable: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  const [click, setClick] = useRecoilState(clickState);
  const [artistName, setArtistName] = useRecoilState<any>(artistNAmeState)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [tableData, setTableData] = useState<Author[]>([]);
  const [authorId, setAuthorId] = useRecoilState(authorIdStates); // Keep this if you plan to use it for editing
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, [click]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get<Author[]>(
        `https://interstellar-1-pdzj.onrender.com/author`
      );
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching authors", error);
    }
  };

  const TableDelete = async (id: number) => {
    const confirmDelete = confirm("Do you really want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://interstellar-1-pdzj.onrender.com/author/${id}`
        );
        setClick(!click);
      } catch (error) {
        console.error("Error deleting author", error);
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(new Set(tableData.map((item) => item.key)));
    } else {
      setSelectedKeys(new Set());
    }
  };

  const handleSelectOne = (key: string) => {
    setSelectedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  const columns: ColumnsType<Author> = [
    {
      title: () => (
        <input
          type="checkbox"
          className={styles.inp}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      render: (text, record) => (
        <input
          type="checkbox"
          className={styles.inp}
          checked={selectedKeys.has(record.key)}
          onChange={() => handleSelectOne(record.key)}
        />
      ),
      width: "5%",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (text, record) => (
        <div className={styles.artistCell}>
          <Image
            className={styles.image}
            src={record.files[0]?.url}
            width={40}
            height={40}
            alt={text}
          />
          <span>
            {record.firstName}
          </span>
        </div>
      ),
      width: "30%",
    },
    {
      title: "Total Streams",
      dataIndex: "totalStreams",
      key: "totalStreams",
      width: "20%",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Total Albums",
      dataIndex: "totalAlbums",
      key: "totalAlbums",
      width: "15%",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Total Songs",
      dataIndex: "totalSongs",
      key: "totalSongs",
      width: "15%",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className={styles.actions}>
          <button
            onClick={() => {
              setAuthorId(record.id); // Set the author ID when editing
              setActive(true); // Activate the popup for editing
            }}
            className={styles.unBorderPen}
          >
            <Image src={`/icon/Pen.svg`} width={24} height={24} alt="edit" />
          </button>
          <button
            onClick={() => TableDelete(record.id)}
            className={styles.unBorder}
          >
            <Image src={`/icon/trash.svg`} width={24} height={24} alt="delete" />
          </button>
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <>
      <Table
        className={styles.wrapper}
        columns={columns}
        dataSource={tableData}
        pagination={{ position: ["bottomCenter"] }}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            setArtistName(record.id)
            setAuthorId(record.id);
          },
        })}
      />
      {/* Optionally display the selected Author ID */}
      {authorId && <div>Selected Author ID: {authorId}</div>}
      {active && (
        <div className={styles.popup}>
          <AddArtistPopup
            onClick={() => setActive(false)}
            setActive={setActive}
          />
        </div>
      )}
    </>
  );
};

export default MusicTable;
