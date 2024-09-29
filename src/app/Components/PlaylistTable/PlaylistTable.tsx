"use client";
import { Table } from "antd";
import styles from "./PlaylistTable.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {

  albumIDState,
  authorIdStates,
  cardDataStates,
  clikcState,
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

const Tables = () => {
  const [data, setData] = useState<any>([]);
  const [authorId, setAuthorId] = useRecoilState(authorIdStates);
  const [albumID, setAlbumID] = useRecoilState(albumIDState);
  const [image, setimage] = useRecoilState<any>(cardDataStates);
  const [clickck, setClickck] = useRecoilState(clikcState);
  const token = Cookies.get("accessToken");

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };


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
      .get(`https://interstellar-1-pdzj.onrender.com/album/${albumID}`)
      .then((r) => {
        setData(r.data.musics);
        console.log(r.data, "musikebi");
      });
  }, [clickck]); // include albumID here

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "1%",
      render: (text: any, item: any,index : number) => (
        <div className={styles.cellId}>{index + 1}</div>
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
            src={image?.files[0]?.url}
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
      render: (text: any, item: any) => (
        <div className={styles.cellTimeName}>{formatDuration(item.duration)}</div>
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
          pageSize: 3,
          position: ["bottomCenter"],
        }}
        rowClassName={styles.row111111}
      />
    </div>
  );
};

export default Tables;
