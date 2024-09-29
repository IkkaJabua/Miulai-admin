"use client";
import styles from "./page.module.scss";
import Header from "../Components/Header/Header";
import Usertable from "../Components/userTable/usertable";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.user}>
        <h1 className={styles.h1}>User Managment</h1>
      </div>
      <Usertable />
      
    </main>
  );
}
