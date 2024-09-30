"use client";
import styles from "./AddArtistPopup.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import Card from "../Card/Card";
import UserPlaylist from "../UserPlaylist/UserPlaylist";
import NewTreck from "../popups/newTreck/NewTreck";
import AddAlbum from "../popups/addAlbum/addAlbum";
import axios from "axios";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useRecoilState } from "recoil";
import {
  albumCoverInAlbum,
  albumDataState,
  albumIDState,
  albumNameState,
  artistNameGlobalState,
  authorIdStates,
  cardDataStates,
  clikcState,
  musicCountState,
  nameOfAlbumState,
  newTrackRrecoState,
  numberOFMusicState,
  onBackWardState,
  releaseDateState,
  totalSongsState,
} from "@/app/states";
import { Divider } from "antd";
import Tables from "../PlaylistTable/PlaylistTable";
import Cookies from "js-cookie";

type Props = {
  setActive: Dispatch<SetStateAction<boolean>>;
  secondOnDelete?: () => void;
  onClick?: () => void;
};

const AddArtistPopup = (props: Props) => {
  const [albums, setAlbums] = useState(true);
  const [biography, setBiography] = useState(false);
  const [active, setActive] = useState(false);
  const [newTrack, setNewTrack] = useState(false);

  const [newTrackRreco, setNewTrackRreco] = useRecoilState(newTrackRrecoState);

  const [createAlbum, setCreateAlbum] = useRecoilState(onBackWardState);
  const [deleted, setDeleted] = useState(false);
  const [albumButton, setAlbumButton] = useState(false);
  const [authorId, setAuthorId] = useRecoilState(authorIdStates);
  const [albumData, setAlbumdata] = useRecoilState(albumDataState);
  const [authorData, setAuthorData] = useState<any>();
  const [songs, setSongs] = useState<any>([]);
  const [image, setimage] = useRecoilState<Props>(cardDataStates);
  const [edited, setEdited] = useState<boolean>(false);
  const [editedBiography, setEditedBiography] = useState<string>();
  const [click, setClick] = useRecoilState(clikcState);
  const [albumCover, setAlbumCover] = useState();
  const [albumID, setAlbumID] = useRecoilState(albumIDState);
  const [albumName, setAlbumName] = useState();
  const [releaseDateAlbum, setReleaseDateAlbum] = useState();
  const [albomImg, setAlbumImg] = useRecoilState<any>(albumCoverInAlbum)
  const [nameOfAlbum, setNameOfAlbum] = useRecoilState(nameOfAlbumState)
  const [releaseDate, setReleaseDate] = useRecoilState(releaseDateState)
  const [numberOfMusic, setNumberOfMusic] = useRecoilState(numberOFMusicState)
  const [musicCound, setMusicCound] = useRecoilState(musicCountState)
  const [nameOFArtist, setNameOfArtist] = useRecoilState(artistNameGlobalState)
  const [totalSong, setTotalSong] = useRecoilState<any>(totalSongsState)
  const [totalAlbum, setTotalAlbum] = useState()



  useEffect(() => {
    axios
      .get(`https://interstellar-1-pdzj.onrender.com/author/${authorId}`).
      then((r) => {
        console.log(r.data.albums.length, 'moixode')
        setTotalAlbum(r.data.albums.length)
        setNameOfArtist(r.data.firstName)
        setAuthorData(r.data);
        setAlbumdata(r.data.albums);
        setimage(r.data);
        setSongs(r.data.musics);
        const totalMusic = r.data.albums.reduce((acc: any, album: { musics: string | any[]; }) => {
          return acc + (album.musics ? album.musics.length : 0); // Sum up songs in each album
        }, 0);
        setTotalSong(totalMusic)

      })
      .catch((error) => {
        console.log("there is something error", error);
      });
  }, [click]);

  if (deleted) {
    return;
  }

  if (createAlbum) {
    return (
      <div className={styles.container}>
        <AddAlbum
          onClick={() => setCreateAlbum(false)}
          onDelete={() => setDeleted(true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          onClick={() => {
            setActive(false);
            setAlbums(true);
            setBiography(false);
            setAlbumButton(false);
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
          {authorData?.firstName}
        </div>
        <div>
          <Image
            className={styles.cursor}
            onClick={props.onClick}
            src={"/icon/delete.svg"}
            width={24}
            height={24}
            alt="back"
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTexture}>
          {albumButton ? (
            <img
              className={styles.image}
              src={albomImg}
              width={250}
              height={170}
              alt="artist name"
            />
          ) : (
            <img
              className={styles.image}
              src={authorData?.files[0]?.url}
              width={250}
              height={170}
              alt="artist name"
            />
          )}
        </div>
        {albumButton ? (
          <div className={styles.albumGap}>
            <div className={styles.artistInformationAlbum}>
              <div className={styles.textAlbum}>Album Name :</div>
              <div className={styles.colorGray}>{nameOfAlbum}</div>
            </div>
            <div className={styles.artistInformation}>
              <div className={styles.textAlbum}>Release Date :</div>
              <div className={styles.colorGray}>{releaseDate}</div>
            </div>
            <div className={styles.artistInformation}>
              <div className={styles.textAlbum}>Number Of Tracks:</div>
              <div className={styles.colorGray}>{numberOfMusic}</div>
            </div>
          </div>
        ) : (
          <div className={styles.bodyTextureTwo}>
            <div className={styles.artistInformation}>
              <div className={styles.text}>Tolat album :</div>
                <div>{totalAlbum}</div>
            </div>
            <div className={styles.artistInformation}>
              <div className={styles.text}>Total Songs :</div>
                <div>{totalSong}</div>
            </div>
          </div>
        )}
      </div>
      {newTrackRreco && (
        <div className={styles.newTreck}>
          <NewTreck onClick={() => setNewTrackRreco(false)} />
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.foterHeader}>
          <div className={styles.footerMode}>
            {!active && (
              <div
                onClick={() => {
                  setAlbums(true);
                  setBiography(false);
                  setAlbumButton(false);
                }}
                className={
                  albums ? styles.activefooterModeFont : styles.footerModeFont
                }
              >
                Albums
              </div>
            )}
            {!active && (
              <>
                <div
                  onClick={() => {
                    setAlbums(false);
                    setBiography(true);
                    setAlbumButton(false);
                  }}
                  className={
                    biography
                      ? styles.activefooterModeFont
                      : styles.footerModeFont
                  }
                >
                  Biography
                </div>
              </>
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
            {albumButton && (
              <Button
                onClick={() => {
                  setNewTrackRreco(!newTrackRreco);
                }}
                mode={"fill"}
                title={"New Track"}
                className={"button"}
                image="/icon/plus.svg"
              />
            )}
            {biography && (
              <Button
                onClick={() => {
                  setEditedBiography(authorData?.biography);
                  setEdited(!edited);
                }}
                title={"Edit"}
                className={styles.biographyButton}
                image="/icon/pen.svg"
              />
            )}
          </div>
        </div>
        <div className={styles.footerPLaylist}>
          {albums && (
            <UserPlaylist
              setAlbumButton={setAlbumButton}
              setAlbums={setAlbums}
              setActive={setActive}
            />
          )}
          {biography &&
            (edited ? (
              <textarea
                className={styles.inputText}
                value={editedBiography}
                rows={9}
                onChange={(e) => setEditedBiography(e.target.value)}
              />
            ) : (
              <div className={styles.biographyFont}>
                {authorData?.biography}
              </div>
            ))}
          {active && <Tables />}
        </div>
      </div>
    </div>
  );
};

export default AddArtistPopup;
