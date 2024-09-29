"use client";
import { Table } from "antd";
// import HeartShapeBtn from "../heatShapeIcon/HeartShapeIcn";
import styles from "./PlaylistTable.module.scss";
import { text } from "stream/consumers";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {

  albumCoverInAlbum,
  albumIDState,
  albumNameState,
  authorIdStates,
  cardDataStates,
  clikcState,
  musicCountState,
  nameOfAlbumState,
  numberOFMusicState,
  releaseDateState,
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
  const [clickck, setClickck] = useRecoilState(clikcState);
  const token = Cookies.get("accessToken");
  const [deletes, setDeletes] = useState<any>();
  const [albomImg, setAlbumImg] = useRecoilState(albumCoverInAlbum)
  const [nameOfAlbum, setNameOfAlbum] = useRecoilState(nameOfAlbumState)
  const [releaseDate, setReleaseDate] = useRecoilState(releaseDateState)
  const [numberOfMusic, setNumberOfMusic] = useRecoilState(numberOFMusicState)
  const [musicCound, setMusicCound] = useRecoilState(musicCountState)
  const [albumNameTwo, setAlbumNameTwo] = useRecoilState<any>(albumNameState)


  // useEffect(() => {
  //   axios
  //     .get(`https://interstellar-1-pdzj.onrender.com/album/${albumID}`)
  //     .then((r) => {
  //       setAlbumName(r.data.albumName);
  //       setAlbumCover(r.data.file?.url);
  //       setReleaseDateAlbum(r.data.releaseDate);
  //       setMusic(r.data.musics?.length);
  //     });
  // }, []);

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
        console.log(r.data.file?.url, 'fileeeee')
        setAlbumImg(r.data.file?.url)
        setReleaseDate(r.data.releaseDate)
        setNumberOfMusic(r.data.musics.length)
        setData(r.data.musics);
        setNameOfAlbum(r.data.albumName)
        setMusicCound(r.data.musicCount)
        console.log(r.data,'aesaa')
      });
  }, [clickck]); 

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "1%",
      render: (text: any, item: any,index: number) => (
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
            src={item.albumCover}
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
