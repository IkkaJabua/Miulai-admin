// ArtistPopup.tsx
import styles from "./ArtistPopup.module.scss";
import Image from "next/image";
import ArtistPopupData from "./ArtistPopupData/ArtistPopupData";
import ArtPopupCards from "./ArtPopupCards/ArtPopupCards";
import { useEffect, useState } from "react";
import PlaylistTable from "../PlaylistTable/PlaylistTable";
import axios from "axios";
import Cookies from "js-cookie";
import {useRecoilState } from "recoil";
import { playilistMainState, userIdState } from "@/app/states";
import dayjs from "dayjs";

interface Props {
  name: string;
  closeModal?: () => void; // Accept closeModal function
}

const ArtistPopup = (props: Props) => {
  const [isPlaylistEdit, setPlaylistEdit] = useState<boolean>(false);
  const [, setEditPlaylistId] = useState<number>(0);
  const token = Cookies.get("accessToken");
  const [userId, ] = useRecoilState(userIdState);
  const [email, setEmail] = useState();
  const [data, setDate] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userPlaylist, setPlaylist] = useRecoilState(playilistMainState)
  const [playlistLength, setPlaylistLength] = useState()

  useEffect(() => {
    axios
      .get(`https://interstellar-1-pdzj.onrender.com/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        console.log(r.data, "=-=-=-=- use,id");
        setEmail(r.data.email);
        setPlaylist(r.data.playlists)
        setPlaylistLength(r.data.playlists.length)

        const formattedDate = dayjs(r.data.createdAt).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        setDate(formattedDate);
      });
  }, []);

  return (
    <div className={styles.sss}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div onClick={() => setPlaylistEdit(false)} className={styles.img}>
            <Image
              src={"/icon/marcxniv-isari.svg"}
              alt="image"
              width={20}
              height={20}
            />
          </div>

          <span className={styles.font}>{props.name}</span>

          <div className={styles.img} onClick={props.closeModal}>
            <Image
              src={"/icon/x-gatishva.svg"}
              alt="close"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className={styles.wrapper}>
          <ArtistPopupData
            key1={!isPlaylistEdit ? "Email" : "Playlist Name"}
            value1={`${email}`}
            key2={"Registration Date"}
            value2={data}
            key3={"Playlists Created"}
            value3={`${playlistLength}`}
            userImage={"/image/userTestImage.png"}
            imageStyle={"round"}
            id={0}
          />
        </div>

        {!isPlaylistEdit ? (
          <ArtPopupCards
            onEdit={(playlistId: number) => {
              setPlaylistEdit(true);
              setEditPlaylistId(playlistId);
            }}
          />
        ) : (
          <PlaylistTable />
        )}
      </div>
    </div>
  );
};

export default ArtistPopup;
