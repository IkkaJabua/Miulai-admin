'use client'
import styles from './artistForm.module.scss'
import { useForm, SubmitHandler } from "react-hook-form"
import Button from '../../Button/Button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddAlbum from '../addAlbum/addAlbum'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { autoCloseState, clikcState } from '@/app/states'



interface Props {
  onClick?: () => void;
}
const ArtistForm = (props: Props) => {
  const [deleted, setDeleted] = useState(false);
  const [addAlbum, setAddAlbum] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [coverFileName, setCoverFileName] = useState(""); 
  const [autoClose, setAutoClose] = useRecoilState(autoCloseState)
  const [click, setClick] = useRecoilState(clikcState);





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  if (deleted) {
    return null;
  }

  if (addAlbum) {
    return <AddAlbum onDelete={() => setDeleted(true)} />;
  }

  const onSubmit = (values: any) => {
    const data = new FormData();
    data.append("firstName", String(values.firstName));
    data.append("lastName", String(values.lastName));
    data.append("biography", String(values.biography));
    // data.append("file", values.file[0]);
    if (file) {
      data.append("file", file);
    } else {
      console.log("ar midiiis");
    }

    axios
      .post("https://interstellar-1-pdzj.onrender.com/author", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setClick(!click)
        setAutoClose(false)
        console.log("Successfully submitted:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error submitting the form:",
          error.response?.data || error.message
        );
      });
  };

  const fileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e?.target.files[0]);
      console.log(e?.target.files[0],file)
      setCoverFileName(e.target.files[0].name);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.header}>
        <div>
          {/* <Image src={'/icon/back.svg'} width={24} height={24} alt='back' /> */}
        </div>
        <div>Add New Artist</div>
        <div className={styles.cursor} onClick={props.onClick}>
          <Image src={"/icon/delete.svg"} width={24} height={24} alt="delete" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.formBody}>
          <div className={styles.inputGap}>
            <div>Artist Name</div>
            <input
              className={styles.nameInput}
              {...register("firstName",{
                required: true
              })}
              type="text"
            />
            {
              errors.firstName && 
              <div className={styles.gayError}>FirstName is required!</div>

            }
          </div>
          {/* <div className={styles.inputGap}>
            <div>Last Name </div>
            <input
              className={styles.nameInput}
              {...register("lastName")}
              type="text"
            />
          </div> */}
          <div>
            <div>Biography</div>
            <div className={styles.inputTwo}>
              <textarea
                className={styles.biographyInput}
                {...register("biography", {
                  required: true
                })}
                rows={9}  // Set how many rows you want to show initially
                wrap="soft" 
              />
            </div>
            {
              errors.biography &&
              <div className={styles.gayError}>Biography is required!</div>
            }
          </div>
        </div>
        <div className={styles.formBody}>
          <div className={styles.gap}>
            <div>Artist Photo</div>
            <div className={styles.photoFile}>
              <input
                className={styles.photoInput}
                {...register("file",{
                  required: true
                })}
                id="file-upload-file"
                type="file"
                onChange={fileChange}
              />
              <label htmlFor="file-upload-file">
                <Image
                  src={"/icon/Screenshots.svg"}
                  width={90}
                  height={90}
                  alt="screenshot"
                />
                <div className={styles.imagePhoto}>{coverFileName || "UPLOAD FILE!"}</div>
              </label>
            </div>
                
          </div>
          {
            errors.file && 
            <div className={styles.gayError}>File is required!</div>
          }
          {/* <Button
            onClick={() => setAddAlbum(true)}
            title={"New Album"}
            image="/icon/plus.svg"
            className={styles.button}
          /> */}
        </div>
      </div>
      <button className={styles.buttonTwo}>
        Save
      </button>
      {/* <Button title={'Save'} className={styles.buttonTwo} /> */}
    </form>
  )
};
export default ArtistForm;
