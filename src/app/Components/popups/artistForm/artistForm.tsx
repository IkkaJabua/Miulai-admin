import styles from './artistForm.module.scss';
import { useForm, SubmitHandler } from "react-hook-form";
import Button from '../../Button/Button';
import Image from 'next/image';
import { useState } from 'react';
import AddAlbum from '../addAlbum/addAlbum';
import axios from 'axios';

interface Props {
  onClick?: () => void;
}

// Define the interface for form values
interface FormValues {
  firstName: string;
  lastName: string;
  biography: string;
  file: FileList;
}

const ArtistForm = (props: Props) => {
  const [deleted, setDeleted] = useState(false);
  const [addAlbum, setAddAlbum] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(); // Specify the type here

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const data = new FormData();
    data.append('firstName', values.firstName);
    data.append('lastName', values.lastName);
    data.append('biography', values.biography);
    data.append('file', values.file[0]); // Ensure you're accessing the correct file

    axios.post("https://interstellar-1-pdzj.onrender.com/author", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Successfully submitted:', response.data);
      })
      .catch(error => {
        console.error('Error submitting the form:', error.response?.data || error.message);
      });
  };


  if (addAlbum) {
    return <AddAlbum onDelete={() => setDeleted(true)} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.header}>
        <div>
          {/* <Image src={'/icon/back.svg'} width={24} height={24} alt='back' /> */}
        </div>
        <div>Add New Artist</div>
        <div className={styles.cursor} onClick={props.onClick}>
          <Image src={'/icon/delete.svg'} width={24} height={24} alt='delete' />
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.formBody}>
          <div className={styles.inputGap}>
            <div>Artist Name</div>
            <input
              className={styles.nameInput}
              {...register('firstName', { required: true })}
              type='text' />
            {errors.firstName && <span>This field is required</span>}
          </div>

          <div className={styles.inputGap}>
            <div>Last Name</div>
            <input
              className={styles.nameInput}
              {...register('lastName', { required: true })}
              type='text' />
            {errors.lastName && <span>This field is required</span>}
          </div>

          <div>
            <div>Biography</div>
            <div className={styles.inputTwo}>
              <input
                className={styles.biographyInput}
                {...register('biography', { required: true })}
                type='text' />
              {errors.biography && <span>This field is required</span>}
            </div>
          </div>
        </div>

        <div className={styles.formBody}>
          <div>
            <div>Artist Photo</div>
            <div className={styles.photoFile}>
              <input
                className={styles.photoInput}
                {...register('file', { required: true })}
                id='file-upload-file'
                type='file' />
              <label htmlFor="file-upload-file">
                <Image src={'/icon/Screenshots.svg'} width={90} height={90} alt='screenshot' />
              </label>
            </div>
            {errors.file && <span>This field is required</span>}
          </div>

          <Button
            onClick={() => setAddAlbum(true)}
            title={'New Album'}
            image='/icon/plus.svg'
            className={styles.button} />
        </div>
      </div>

      <button type="submit" className={styles.buttonTwo}>
        Save
      </button>
    </form>
  );
}

export default ArtistForm;
