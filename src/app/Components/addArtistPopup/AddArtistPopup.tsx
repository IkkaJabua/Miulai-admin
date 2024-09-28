"use client";

import styles from "./AddArtistPopup.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import UserPlaylist from "../UserPlaylist/UserPlaylist";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import NewTreck from "../popups/newTreck/NewTreck";
import AddAlbum from "../popups/addAlbum/addAlbum";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  albumDataState,
  authorIdStates,
  newTrackRecoState,
  clickState // Corrected the import here
} from "@/app/states";
import Tables from "../PlaylistTable/PlaylistTable";

type Props = {
  setActive: Dispatch<SetStateAction<boolean>>;
  secondOnDelete?: () => void;
  onClick?: () => void;
};

interface AuthorData {
  firstName: string;
  lastName: string;
  biography?: string;
  files?: { url: string }[];
  albums?: AlbumData[];
}

interface AlbumData {
  id: number;
  title: string;
}

const AddArtistPopup = (props: Props) => {
  const [albums, setAlbums] = useState(true);
  const [biography, setBiography] = useState(false);
  const [active, setActive] = useState(false);
  const [newTrackReco, setNewTrackReco] = useRecoilState(newTrackRecoState); // Updated the variable name
  const [createAlbum, setCreateAlbum] = useState(false);
  const [authorId] = useRecoilState(authorIdStates);
  const [albumData, setAlbumdata] = useRecoilState(albumDataState);
  const [authorData, setAuthorData] = useState<AuthorData | null>(null);
  const [songs, setSongs] = useState<number>(0);
  const [editedBiography, setEditedBiography] = useState<string>('');
  const [click] = useRecoilState(clickState); // Ensure clickState is defined

  useEffect(() => {
    axios
      .get(`https://interstellar-1-pdzj.onrender.com/author/${authorId}`)
      .then((r) => {
        setAuthorData(r.data);
        setAlbumdata(r.data.albums);
        setSongs(r.data.musicCount);
      })
      .catch((error) => {
        console.log("there is something error", error);
      });
  }, [authorId, click, setAlbumdata]); // Include all dependencies used in the effect

  if (createAlbum) {
    return (
      <div className={styles.container}>
        <AddAlbum onClick={() => setCreateAlbum(false)} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          onClick={() => {
            props.setActive(false);
            setAlbums(true);
            setBiography(false);
          }}
        >
          <Image
            className={styles.cursor}
            src={"/icon/back.svg"}
            width={24}
            height={24}
            alt="back"
          />
        </div>
        <div className={styles.font}>
          {authorData?.firstName} {authorData?.lastName}
        </div>
        <div>
          <Image
            className={styles.cursor}
            onClick={props.onClick}
            src={"/icon/delete.svg"}
            width={24}
            height={24}
            alt="delete"
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTexture}>
          <Image
            className={styles.image}
            src={authorData?.files?.[0]?.url || '/default-image.png'} // Provide a default image
            width={267}
            height={152}
            alt="artist name"
          />
        </div>
        <div className={styles.bodyTextureTwo}>
          <div className={styles.artistInformation}>
            <div className={styles.text}>Total albums</div>
            <div>{albumData.length}</div>
          </div>
          <div className={styles.artistInformation}>
            <div className={styles.text}>Songs</div>
            <div>{songs}</div>
          </div>
        </div>
      </div>
      {newTrackReco && ( // Updated the variable name
        <div className={styles.newTreck}>
          <NewTreck onClick={() => setNewTrackReco(false)} />
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.footerHeader}>
          <div className={styles.footerMode}>
            {!active && (
              <div
                onClick={() => {
                  setAlbums(true);
                  setBiography(false);
                }}
                className={
                  albums ? styles.activefooterModeFont : styles.footerModeFont
                }
              >
                Albums
              </div>
            )}
            {!active && (
              <div
                onClick={() => {
                  setAlbums(false);
                  setBiography(true);
                }}
                className={
                  biography
                    ? styles.activefooterModeFont
                    : styles.footerModeFont
                }
              >
                Biography
              </div>
            )}
            {active && <div>Album Tracks</div>}
          </div>
          <div className={styles.buttonMain}>
            {albums && (
              <Button
                mode={"fill"}
                onClick={() => setCreateAlbum(true)}
                title={"New Album"}
                className={"button"}
                image="/icon/plus.svg"
              />
            )}
            {biography && (
              <Button
                onClick={() => {
                  setEditedBiography(authorData?.biography || ''); // Set the biography for editing
                }}
                title={"Edit"}
                className={styles.biographyButton}
                image="/icon/pen.svg"
              />
            )}
          </div>
        </div>
        <div className={styles.footerPlaylist}>
          {albums && (
            <UserPlaylist setActive={setActive} setAlbums={() => {}} setAlbumButton={() => {}} />
          )}
          {biography && (
            <div className={styles.biographyFont}>
              {editedBiography ? (
                <textarea
                  className={styles.inputText}
                  value={editedBiography}
                  rows={9}
                  onChange={(e) => setEditedBiography(e.target.value)}
                />
              ) : (
                <div>{authorData?.biography}</div>
              )}
            </div>
          )}
          {active && <Tables />}
        </div>
      </div>
    </div>
  );
};

export default AddArtistPopup;
