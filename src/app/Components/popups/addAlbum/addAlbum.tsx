<<<<<<< HEAD
import styles from './addAlbum.module.scss'
import Button from '../../Button/Button'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import ArtistForm from '../artistForm/artistForm'
import { useRecoilState } from 'recoil'
import { authorIdStates, clikcState } from '@/app/states'
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import { Input } from 'antd'



interface Props {
    onClick?: () => void,
    onDelete?: () => void,
    secondOnDelete?: () => void
}
const AddAlbum = (props: Props) => {
    const [artistForm, setArtistForm] = useState(false)
    const [authorId, setAuthorId] = useRecoilState(authorIdStates)
    const [message, setMessage] = useState<string>()
    const [click, setClick] = useRecoilState(clikcState)
    const [coverFileName, setCoverFileName] = useState(''); // Fix the typo and make sure it's a string or null
    const [file, setFile] = useState<File | null>(null)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()

    if (artistForm) {
        return <ArtistForm />
    }


    const onSubmit = (values: any) => {
        const data: any = new FormData()
        data.append('albumName', values.albumName)
        // data.append('artistName', values.artistName)
        data.append('releaseDate', values.releaseDate)
        // data.append('file', values.file[0])
        data.append('authorId', authorId)

        if(file) {
            data.append('file', file)
        } else {
            console.log('ar midiiis')
        }



        const token = Cookies.get('accessToken');
        axios.post(`https://interstellar-1-pdzj.onrender.com/album`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((r) => {
            setMessage('Album are created')
            setClick(!click)
        }).catch((errors: string) => {
            setMessage('The album could not be created')
        })
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault()
        if (props.onDelete) {
            props.onDelete()
        }
    }

    const fileChange  = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e?.target.files[0])
            setCoverFileName(e.target.files[0].name); 
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            <div className={styles.header}>
                <div className={styles.cursor}
                    onClick={props.onClick}>
                    <div onClick={() => setArtistForm(true)}>
                        <Image src={'/icon/back.svg'} height={24} width={24} alt='pen' />
                    </div>
                </div>
                <div>Add New Album</div>
                <div className={styles.cursor} onClick={handleDelete}>
                    <Image src={'/icon/delete.svg'} height={24} width={24} alt='pen' />
                </div>

            </div>
            <div className={styles.formBody}>
                <div className={styles.inputWrapper}>
                    <div>
                        Album Cover Photo
                    </div>
                    <div className={styles.wrapper}>
                        <label htmlFor="file-upload-file">
                            <Image src={'/icon/Screenshots.svg'} width={90} height={90} alt='screenshot' />
                            <span>
                                {coverFileName || 'gamochndaa'}
                            </span>
                        </label>
                        <input className={styles.photoInput} id='file-upload-file' type='file'

                            {...register('file', {
                                required: true
                            })}
                        onChange={fileChange}
                        />
                    </div>
                </div>
                <div className={styles.inputGap}>
                    <div className={styles.inputWrapper}>
                        <div>Album Name </div>
                        <div>
                            <input className={styles.inputName} type='text'
                                {...register('albumName', {
                                    required: true
                                })}
                            />
                        </div>
                    </div>
                    <div>Album Release Date</div>

                    <input className={styles.date} type='text'
                        {...register('releaseDate', {
                            required: true
                        })}

                    />
                    <div>
                        {message}
                    </div>
                </div>
            </div>
            <button className={styles.buttonTwo}>
                Save
            </button>
        </form>
    )
}
=======
import styles from "./addAlbum.module.scss";
import Button from "../../Button/Button";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ArtistForm from "../artistForm/artistForm";
import { useRecoilState } from "recoil";
import { artistNAmeState, authorIdStates, clikcState } from "@/app/states";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Input } from "antd";

interface Props {
  onClick?: () => void;
  onDelete?: () => void;
  secondOnDelete?: () => void;
}
const AddAlbum = (props: Props) => {
  const [artistForm, setArtistForm] = useState(false);
  const [authorId, setAuthorId] = useRecoilState(authorIdStates);
  // const [artistName, setArtistName] = useState()
  const [artistName, setArtistName] = useRecoilState(artistNAmeState)
  console.log(artistName, 'artistname')




  const [message, setMessage] = useState<string>();
  const [click, setClick] = useRecoilState(clikcState);
  const [coverFileName, setCoverFileName] = useState(""); // Fix the typo and make sure it's a string or null
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    axios.get(`https://interstellar-1-pdzj.onrender.com/author/${authorId}`). 
    then((r) => {
      setArtistName(r.data.firstName)
      console.log(r.data.firstName,'firstname')
    })
  },[])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  if (artistForm) {
    return <ArtistForm />;
  }

  const onSubmit = (values: any) => {
    const data: any = new FormData();
    data.append("albumName", values.albumName);
    data.append("releaseDate", values.releaseDate);
    // data.append('file', values.file[0])
    data.append('artistName', artistName)
    data.append("authorId", authorId);

    if (file) {
      data.append("file", file);
    } else {
      console.log("ar midiiis");
    }

    const token = Cookies.get("accessToken");
    axios
      .post(`https://interstellar-1-pdzj.onrender.com/album`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        setMessage("Album are created");
        setClick(!click);
      })
      .catch((errors: string) => {
        setMessage("The album could not be created");
      });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.onDelete) {
      props.onDelete();
    }
  };

  const fileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e?.target.files[0]);
      setCoverFileName(e.target.files[0].name);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.cursor} onClick={props.onClick}>
          <div onClick={() => setArtistForm(true)}>
            <Image src={"/icon/back.svg"} height={24} width={24} alt="pen" />
          </div>
        </div>
        <div>Add New Album</div>
        <div className={styles.cursor} onClick={handleDelete}>
          <Image src={"/icon/delete.svg"} height={24} width={24} alt="pen" />
        </div>
      </div>
      <div className={styles.formBody}>
        <div className={styles.inputWrapper}>
          <div>Album Cover Photo</div>
          <div className={styles.wrapper}>
            <label htmlFor="file-upload-file">
              <Image
                src={"/icon/Screenshots.svg"}
                width={90}
                height={90}
                alt="screenshot"
              />
              <span className={styles.imagePhoto}>{coverFileName || ""}</span>
            </label>
            <input
              className={styles.photoInput}
              id="file-upload-file"
              type="file"
              {...register("file", {
                required: true,
              })}
              onChange={fileChange}
            />
          </div>
        </div>
        <div className={styles.inputGap}>
          <div className={styles.inputWrapper}>
            <div>Album Name </div>
            <div>
              <input
                className={styles.inputName}
                type="text"
                {...register("albumName", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div>Album Release Date</div>

          <input
            className={styles.date}
            type="text"
            {...register("releaseDate", {
              required: true,
            })}
          />
          <div>{message}</div>
        </div>
      </div>
      <button className={styles.buttonTwo}>Save</button>
    </form>
  );
};
>>>>>>> parent of cea225b (Merge branch 'master' of https://github.com/IkkaJabua/Miulai-admin)


export default AddAlbum
