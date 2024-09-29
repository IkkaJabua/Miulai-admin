"use client";
import { title } from "process";
// import styles from './UserPlaylist.module.scss'
import Image from "next/image";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./UserPlaylist.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {
  albumDataState,
  albumIDState,
  albumNAmeState,
  authorIdStates,
  cardDataStates,
  clikcState,
} from "@/app/states";
import axios from "axios";
import Cookies from "js-cookie";

interface Props {
  setActive: Dispatch<SetStateAction<boolean>>;
  setAlbums: Dispatch<SetStateAction<boolean>>;
  setAlbumButton: Dispatch<SetStateAction<boolean>>;
  image?: string;
  title?: string;
  id?: number;
  category?: string;
}

const UserPlaylist = (props: Props) => {
  const router = useRouter();
  const [albumData, setAlbumdata] = useRecoilState<any>(albumDataState);
  const [albumID, setAlbumID] = useRecoilState(albumIDState);
  const [click, setClick] = useRecoilState(clikcState);
    const [albumNameTwo, setAlbumNameTwo] = useRecoilState<any>(albumNAmeState)

  const token = Cookies.get("accessToken");



  const onDelete = (id: Number) => {
    axios
      .delete(`https://interstellar-1-pdzj.onrender.com/album/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        alert("Are you sure you want to delete?");
        setClick(!click);
      });
  };

  return (
    <>
      {albumData?.map((item: any) => (
        <div className={styles.container} key={item.id}>
          <div className={styles.hoveredImage}>
            <img
              className={styles.cellImage}
              src={item.file?.url}
              width={170}
              height={136}
              alt="image"
            />

            <div className={styles.buttons}>
              <div
                onClick={() => {
                  setClick(!click);
                  props.setAlbums(false);
                  props.setActive(true);
                  props.setAlbumButton(true);
                  setAlbumNameTwo(item.id)
                  setAlbumID(item.id);
                }}
                className={styles.cellEdit}
              >
                <img
                  src={"/icon/penPlaylist.svg"}
                  width={24}
                  height={24}
                  alt={"edit button"}
                />
              </div>
              <div
                className={styles.cellDelete}
                onClick={() => onDelete(item.id)}
              >
                <img
                  src={"/icon/deletePlaylist.svg"}
                  width={24}
                  height={24}
                  alt={"edit button"}
                />
              </div>
            </div>
          </div>
          <div className={styles.font}>{item.albumName}</div>
        </div>
      ))}
    </>
  );
};

UserPlaylist.displayName = "UserPlaylist";
export default UserPlaylist;
