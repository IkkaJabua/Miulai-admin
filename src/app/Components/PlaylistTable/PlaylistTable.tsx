"use client";
import { Table } from "antd";
import styles from "./PlaylistTable.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  albumIDState,
  authorIdStates,
  clickState,
} from "@/app/states";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

interface MusicItem {
  id: number;
  name: string;
  artistName: string;
}

interface AlbumResponse {
  musics: MusicItem[];
  file: {
    url: string;
  };
}

const Tables: React.FC = () => {
  const [data, setData] = useState<MusicItem[]>([]);
  const [] = useRecoilState(authorIdStates);
  const [albumID] = useRecoilState(albumIDState);
  const [img, setImg] = useState<string | undefined>();
  const [clickck, setClickck] = useRecoilState(clickState);
  const token = Cookies.get("accessToken");

  const onDelete = (id: number) => {
    axios
      .delete(`https://interstellar-1-pdzj.onrender.com/music/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setClickck(!clickck);
        alert("Are you sure you want to delete?");
      })
      .catch(() => {
        console.log("Error occurred while deleting");
      });
  };

  useEffect(() => {
    axios
      .get<AlbumResponse>(`https://interstellar-1-pdzj.onrender.com/album/${albumID}`)
      .then((response) => {
        setData(response.data.musics);
        setImg(response.data.file.url);
      });
  }, [clickck, albumID]); // include albumID here

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "1%",
      render: (text: number) => (
        <div className={styles.cellId}>{text}</div>
      ),
    },
    {
      title: "Song Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (text: string, item: MusicItem) => (
        <div className={styles.cellSongname}>
          <Image
            className={styles.image}
            src={img || ''}
            width={48}
            height={48}
            alt={text}
          />
          <div className={styles.fontGap}>
            <div className={styles.songTitle}>{item.name}</div>
            <div className={styles.songArtist}>{item.artistName}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Time",
      key: "time",
      width: "15%",
      render: () => (
        <div className={styles.cellTimeName}>3.35</div>
      ),
    },
    {
      title: "Actions",
      key: "like",
      width: "3%",
      render: (record: MusicItem) => (
        <div onClick={() => onDelete(record.id)} className={styles.center}>
          <Image src={"/icon/trashsh.svg"} width={24} height={24} alt="trash" />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Table
        className={styles.container}
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 5,
          position: ["bottomCenter"],
        }}
        rowClassName={styles.row111111}
      />
    </div>
  );
};

export default Tables;
