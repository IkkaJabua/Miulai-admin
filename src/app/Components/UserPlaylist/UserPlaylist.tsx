import Image from "next/image";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./UserPlaylist.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {
    albumDataState,
    authorIdStates,
    cardDataStates,
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
    setActive: Dispatch<SetStateAction<boolean>>;
    setAlbums: Dispatch<SetStateAction<boolean>>;
    setAlbumButton: Dispatch<SetStateAction<boolean>>;
    image?: string;
    title?: string;
    id?: number;
    category?: string;


}

const UserPlaylist = (props: Props) => {
    // const router = useRouter()
    // const [albumData, setAlbumdata] = useRecoilState<any>(albumDataState)
    // const [albumID, setAlbumID] = useRecoilState(albumNAmeState)

    const router = useRouter();
    const [albumData, setAlbumdata] = useRecoilState<any>(albumDataState);
    const [albumID, setAlbumID] = useRecoilState<any>(albumDataState);
    const [click, setClick] = useRecoilState(clikcState);
    const token = Cookies.get("accessToken");


    return (
        <>
            {
                albumData?.map((item: any) => (
                    <div className={styles.container} key={item.id}>
                        <div className={styles.hoveredImage} >
                            <img className={styles.cellImage} src={item.file?.url} width={170} height={136} alt='image' />

                            <div className={styles.buttons}>
                                <div onClick={() => {
                                    props.setAlbums(false)
                                    props.setActive(true)
                                    props.setAlbumButton(true)
                                    setAlbumID(item.id)
                                }} className={styles.cellEdit}>
                                    <img src={'/icon/penPlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                                <div className={styles.cellDelete}>
                                    <img src={'/icon/deletePlaylist.svg'} width={24} height={24} alt={'edit button'} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.font}>{item.albumName}</div>
                    </div>
                ))
            }
        </>
    );
};

UserPlaylist.displayName = 'UserPlaylist';
export default UserPlaylist;
