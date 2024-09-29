"use client";
import { Table } from "antd";
// import HeartShapeBtn from "../heatShapeIcon/HeartShapeIcn";
import styles from "./PlaylistTable.module.scss";
import { text } from "stream/consumers";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  albumDataState,
  albumIDState,
  authorIdStates,
  cardDataStates,
  clickckState,
  clikcState,
} from "@/app/states";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

// type Props = {
//   name?: string;
//   id?: string;
// };

// interface Song {
//   icon: string;
//   title: string;
//   author: string;
//   album: string;
//   time: string;
//   id: number;
// }

const Tables = () => {
  const [data, setData] = useState<any>([]);
  const [authorId, setAuthorId] = useRecoilState(authorIdStates);
  const [albumID, setAlbumID] = useRecoilState(albumIDState);
  const [image, setimage] = useRecoilState<any>(cardDataStates);
  const [img, setImg] = useState<any>();
  const [clickck, setClickck] = useRecoilState(clickckState);
  const token = Cookies.get("accessToken");
  const [deletes, setDeletes] = useState<any>();

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
      .then((r) => {
        setClickck(!clickck);
        alert("are shure you want to delete?");
      })
      .catch((error) => {
        console.log("ar shemodis then shi saertod ar shemodiiis");
      });
  };

  useEffect(() => {
    axios
      .get(`https://interstellar-1-pdzj.onrender.com/album/${albumID}`)
      .then((r) => {
        setData(r.data.musics);
        setImg(r.data.file.url);
      });
  }, [clickck]);

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
      render: (text: any, item: any) => (
        <div className={styles.cellSongname}>
          <img
            className={styles.image}
            src={img}
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
      render: (record: any) => (
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
