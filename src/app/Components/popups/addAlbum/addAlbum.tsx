import styles from "./addAlbum.module.scss";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import ArtistForm from "../artistForm/artistForm";
import { useRecoilState } from "recoil";
import { artistNameGlobalState, authorIdStates, clikcState, onBackWardState } from "@/app/states";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

interface FormValues {
  albumName: string;
  releaseDate: string;
  file?: FileList; // Assuming it's an optional file input, you may need to adjust this type if it's different
}

interface Props {
  onClick?: () => void;
  onDelete?: () => void;
  secondOnDelete?: () => void;
}
const AddAlbum = (props: Props) => {
  const token = Cookies.get("accessToken");

  const [artistForm, setArtistForm] = useState(false);
  const [authorId, ] = useRecoilState(authorIdStates);
  const [message, setMessage] = useState<string>();
  const [click, setClick] = useRecoilState(clikcState);
  const [coverFileName, setCoverFileName] = useState(""); // Fix the typo and make sure it's a string or null
  const [file, setFile] = useState<File | null>(null);
  const [nameOFArtist, ] = useRecoilState(artistNameGlobalState)
  const [, setCreateAlbum] = useRecoilState(onBackWardState);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (artistForm) {
    return <ArtistForm />;
  }

  const onSubmit = (values: FormValues) => {
    const data = new FormData();
    data.append("albumName", values.albumName);
    data.append('artistName', nameOFArtist)
    data.append("releaseDate", values.releaseDate);
    // data.append('file', values.file[0])
    data.append("authorId", authorId);

    if (file) {
      data.append("file", file);
    } else {
      console.log("ar midiiis");
    }

    axios
      .post(`https://interstellar-1-pdzj.onrender.com/album`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMessage("Album are created");
        setCreateAlbum(false)
        setClick(!click);
      })
      .catch(() => {
        setMessage("The album could not be created");
      });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.onDelete) {
      props.onDelete();
    }
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              <div className={styles.imagePhoto}>{coverFileName || "UPLOAD FILE!"}</div>
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
            {
              errors.file &&
              <div></div>
              // <div className={styles.fileError}>upload file!</div>
            }
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
              {
                errors.albumName &&
                <div className={styles.gayError}>albumName is required</div>
              }
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
          {
            errors.releaseDate &&
            <span className={styles.gayError}>releaseDate is required!</span>
          }
          <div>
            {message}
          </div>
        </div>
      </div>
      <button className={styles.buttonTwo}>SAVE</button>
    </form>
  );
};
export default AddAlbum
