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
  id: string; // or whatever your music identifier is
  title: string; // title of the music
  // Add other properties as needed
}

interface Album {
  id: string; // or whatever your album identifier is
  title: string; // title of the album
  musics: Music[]; // Array of music items in the album
  // Add other properties as needed
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
  files?: Array<{ url: string }>; // Adjusted type for files
}

interface FormValues {
  selectAll?: boolean;
  key: string;
  [key: string]: any; // Allows dynamic keys like `select-<record.id>`
}

const MusicTable: React.FC = () => {
  const [click, setClick] = useRecoilState(clikcState);
  const { register, handleSubmit } = useForm<FormValues>();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [active, setActive] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [, setAuthorId] = useRecoilState(authorIdStates);
  const [showAlert] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, [click]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `https://interstellar-1-pdzj.onrender.com/author`
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
      console.log(formattedData, "aq raari tooooo");
    } catch (error) {
      console.error("Error fetching authors", error);
    }
  };

  const TableDelete = async (id: number) => {
    axios
      .delete(`https://interstellar-1-pdzj.onrender.com/author/${id}`)
      .then(() => {
        alert("Do you really want to delete it?");

        setClick(!click);
        console.log("waishala", id);
      })
      .catch(() => {
        console.log(" ar waishala", id);
      });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(new Set(tableData.map((item: any) => item.key)));
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

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log("Values", values);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: () => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="checkbox"
            className={styles.inp}
            {...register("selectAll")}
            onChange={(e) => {
              handleSelectAll(e.target.checked);
              handleSubmit(onSubmit)();
            }}
          />
        </form>
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      render: (text: string, record) => (
        <form className={styles.wrapperTwo} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="checkbox"
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
      width: "5%",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (text, record: DataType) => (
        <div className={styles.artistCell}>
          {/* <img className={styles.image} src={`${record.files[0]?.url}`} width={40} height={40} alt={text} /> */}
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
      width: "30%",
    },
    {
      title: "",
      dataIndex: "totalStreams",
      key: "totalStreams",
      width: "10%",
      render: (text, record) => <div>{record.totalStreams}</div>,
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
          {/* <button
            onClick={() => TableDelete(record.id)}
            className={styles.unBorder}
          >
            <img src={`/icon/trash.svg`} width={24} height={24} alt="trash" />
          </button> */}
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
      {/* <Table
        className={styles.wrapper}
        columns={columns}
        dataSource={tableData}
        pagination={{
          pageSize: 7,
          position: ["bottomCenter"],
        }}
        rowKey="id" // Important to uniquely identify rows
        onRow={(record) => ({
          onClick: () => {
            setAuthorId(record.id);
          },
        })}
      /> */}
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
