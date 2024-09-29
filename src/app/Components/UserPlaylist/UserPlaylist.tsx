"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./UserPlaylist.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {
  albumDataState,
  albumIDState,
  albumNAmeState,
  clikcState,
} from "@/app/states";
import axios from "axios";
import Cookies from "js-cookie";

interface Album {
  id: number;
  albumName: string;
  file?: { url: string };
}

interface Props {
  setAlbums: Dispatch<SetStateAction<boolean>>;
  setActive: Dispatch<SetStateAction<boolean>>;
  setAlbumButton: Dispatch<SetStateAction<boolean>>;
}

const UserPlaylist = (props: Props) => {
  const router = useRouter();
  const [albumData, setAlbumdata] = useRecoilState<any>(albumDataState);
  const [albumID, setAlbumID] = useRecoilState(albumIDState);
  const [click, setClick] = useRecoilState(clikcState);
  const [albumNameTwo, setAlbumNameTwo] = useRecoilState<any>(albumNAmeState);

  const token = Cookies.get("accessToken");

  const onDelete = (id: number) => {
    axios
      .delete(`https://interstellar-1-pdzj.onrender.com/album/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        alert("Are you sure you want to delete?");
        setClick(!click);
      })
      .catch((error) => {
        console.error("Error deleting the album:", error);
      });
  };

  // Map AlbumData to Album, renaming `title` to `albumName`
  const mappedAlbumData: Album[] = albumData.map((data) => ({
    id: data.id,
    albumName: data.title, // Map `title` to `albumName`
    file: data.file,
  }));

  return (
    <>
      {mappedAlbumData.map((item: Album) => (
        <div key={item.id} className={styles.playlistItem}>
          <div className={styles.playlistDetails}>
            {item.file && (
              <Image
                src={item.file.url}
                width={50}
                height={50}
                alt={`${item.albumName} cover`}
              />
            )}
            <div className={styles.buttons}>
              <div
                onClick={() => {
                  setClick(!click);
                  props.setAlbums(false);
                  props.setActive(true);
                  props.setAlbumButton(true);
                  setAlbumNameTwo(item.id);
                  setAlbumID(item.id);
                }}
                className={styles.cellEdit}
              >
                <Image
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
                <Image
                  src={"/icon/deletePlaylist.svg"}
                  width={24}
                  height={24}
                  alt={"delete button"}
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
