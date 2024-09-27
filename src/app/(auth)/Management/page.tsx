"use client";
import Header from "@/app/Components/Header/Header";
import styles from "./page.module.scss";
import Table from "@/app/Components/Table/Table";
import Button from "@/app/Components/Button/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import ArtistForm from "@/app/Components/popups/artistForm/artistForm";
import axios from "axios";

const Management = () => {
  const [active, setActive] = useState(false);
  const [totalArtists, setTotalArtists] = useState<string>();
  const [onclick, setOnclick] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://interstellar-1-pdzj.onrender.com/author`)
      .then((r) => {
        setOnclick(!onclick);
        setTotalArtists(r.data.length);
      })
      .catch((error) => {
        console.log("there is something error", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.font}>
        <div className={styles.foontHeader}>Content Management</div>
        <div className={styles.artistTotalFont}>{totalArtists} Artists</div>
      </div>
      <div className={styles.containerButtons}>
        <div>
          <Button
            title={"Add"}
            mode="fill"
            className={styles.button}
            onClick={() => setActive(!active)}
            image="/icon/user-add.svg"
          />
        </div>
        <div className={styles.export}>
          <Image src={"/icon/export.svg"} height={24} width={24} alt="export" />
        </div>
      </div>
      <Table />
      {active && (
        <div className={styles.popup}>
          <ArtistForm onClick={() => setActive(false)} />
        </div>
      )}
    </div>
  );
};

export default Management;
