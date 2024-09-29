"use client";
import { Table } from "antd";
// import HeartShapeBtn from "../heatShapeIcon/HeartShapeIcn";
import styles from "./PlaylistTable.module.scss";
import { text } from "stream/consumers";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {
<<<<<<< HEAD
<<<<<<< HEAD

  albumIDState,
  authorIdStates,
  cardDataStates,
=======
  albumDataState,
  albumIDState,
  authorIdStates,
  cardDataStates,
  clickckState,
>>>>>>> parent of cea225b (Merge branch 'master' of https://github.com/IkkaJabua/Miulai-admin)
=======
  albumDataState,
  albumIDState,
  authorIdStates,
  cardDataStates,
  clickckState,
>>>>>>> parent of d636ebb (build err fxd)
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
<<<<<<< HEAD
<<<<<<< HEAD
  const [clickck, setClickck] = useRecoilState(clikcState);
=======
  const [img, setImg] = useState<any>();
  const [clickck, setClickck] = useRecoilState(clickckState);
>>>>>>> parent of cea225b (Merge branch 'master' of https://github.com/IkkaJabua/Miulai-admin)
  const token = Cookies.get("accessToken");
  const [deletes, setDeletes] = useState<any>();

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

=======
  const [img, setImg] = useState<any>();
  const [clickck, setClickck] = useRecoilState(clickckState);
  const token = Cookies.get("accessToken");
  const [deletes, setDeletes] = useState<any>();
>>>>>>> parent of d636ebb (build err fxd)

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
<<<<<<< HEAD
<<<<<<< HEAD
        console.log(r.data, "musikebi");
      });
  }, [clickck]); // include albumID here
=======
        setImg(r.data.file.url);
      });
  }, [clickck]);
>>>>>>> parent of cea225b (Merge branch 'master' of https://github.com/IkkaJabua/Miulai-admin)
=======
        setImg(r.data.file.url);
      });
  }, [clickck]);
>>>>>>> parent of d636ebb (build err fxd)

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "1%",
<<<<<<< HEAD
      render: (text: any, item: any,index : number) => (
        <div className={styles.cellId}>{index + 1}</div>
=======
      render: (text: any, item: any) => (
        <div className={styles.cellId}>{text}</div>
>>>>>>> parent of d636ebb (build err fxd)
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
<<<<<<< HEAD
<<<<<<< HEAD
            src={image?.files[0]?.url}
=======
            src={img}
>>>>>>> parent of cea225b (Merge branch 'master' of https://github.com/IkkaJabua/Miulai-admin)
=======
            src={img}
>>>>>>> parent of d636ebb (build err fxd)
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
<<<<<<< HEAD
        <div className={styles.cellTimeName}>{formatDuration(item.duration)}</div>
=======
        <div className={styles.cellTimeName}>3.35</div>
>>>>>>> parent of d636ebb (build err fxd)
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
