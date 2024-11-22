/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Alert, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./Table.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import AddArtistPopup from "../addArtistPopup/AddArtistPopup";
import { useRecoilState } from "recoil";
import { authorIdStates, clikcState } from "@/app/states";
import axios from "axios";

interface Music {
  id: string;
  title: string;
}

interface Album {
  id: string;
  title: string;
  musics: Music[];
}

interface DataType {
  albums: Album[];
  key: string;
  artist: string;
  totalStreams: number;
  totalAlbums: number;
  totalSongs: number;
  image: string;
  name?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  files?: Array<{ url: string }>;
}

interface FormValues {
  selectAll?: boolean;
  key: string;
  [key: string]: unknown;
}

const MusicTable: React.FC = () => {
  const [click, setClick] = useRecoilState(clikcState);
  const { register, handleSubmit } = useForm<FormValues>();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [active, setActive] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [, setAuthorId] = useRecoilState(authorIdStates);
  const [showAlert] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, [click]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `https://backend.miulai.ge/author`
      );

      const formattedData = response.data.map((artist: DataType) => ({
        ...artist,
        totalAlbums: artist.albums ? artist.albums.length : 0,
        totalSongs: artist.albums?.reduce(
          (acc: number, album: Album) =>
            acc + (album.musics ? album.musics.length : 0),
          0
        ),
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error("Error fetching authors", error);
    }
  };

  const TableDelete = async (id: number) => {
    try {
      await axios.delete(`https://backend.miulai.ge/author/${id}`);
      alert("Do you really want to delete it?");
      setClick(!click);
    } catch (error) {
      console.error("Error deleting author", id);
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
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const onSubmit: SubmitHandler<FormValues> = (values) => {
  };

  const columns: ColumnsType<DataType> = [
    {
      title: () => (
        <div>

        </div>
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      render: (text: string, record) => (
        <div>

        </div>
      ),
      width: "1%",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (text, record: DataType) => (
        <div className={styles.artistCell}>
          {record.files && record.files.length > 0 ? (
            <img
              className={styles.image}
              src={`${record.files[0].url}`}
              width={40}
              height={40}
              alt={text}
            />
          ) : (
            <div className={styles.placeholderImage}>No Image</div>
          )}
          <span>{record.firstName}</span>
        </div>
      ),
      width: "10%",
    },
    {
      title: "",
      dataIndex: "totalStreams",
      key: "totalStreams",
      width: "10%",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Total Albums",
      dataIndex: "totalAlbums",
      key: "totalAlbums",
      width: "20%",
      render: (text) => <div className={styles.changeSize}>{text}</div>,
    },
    {
      title: "Total Songs",
      dataIndex: "totalSongs",
      key: "totalSongs",
      width: "20%",
      render: (text) => <div className={styles.changeSize}>{text}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: DataType) => (
        <div className={styles.actions}>
          <button
            onClick={() => setActive(true)}
            className={styles.unBorderPen}
          >
            <img src={`/icon/Pen.svg`} width={24} height={24} alt="pen" />
          </button>
          <button
            onClick={() => {
              if (typeof record.id === "number") {
                TableDelete(record.id);
              } else {
                console.error("Invalid ID:", record.id);
              }
            }}
            className={styles.unBorder}
          >
            <img src={`/icon/trash.svg`} width={24} height={24} alt="trash" />
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
        pagination={{
          pageSize: 7,
          position: ["bottomCenter"],
        }}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            if (typeof record.id === "number") {
              setAuthorId(record.id);
            } else {
              console.error("Invalid ID:", record.id);
            }
          },
        })}
      />
      {showAlert && <Alert />}
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
