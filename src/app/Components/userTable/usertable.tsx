"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import axios from "axios";
import ArtistPopup from "../ArtistPopup/ArtistPopup";
import NewPassword from "../NewPassword/NewPassword";
import SureToDelete from "../SureToDelete/SureToDelete";
import styles from "./usertable.module.scss";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { userIdState } from "@/app/states";

type User = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  block: boolean;
};

const UserTable: React.FC = () => {
  const [selectedRowKeysAll,] = useState<React.Key[]>([]);
  const [selectedRowKeysBlocked, setSelectedRowKeysBlocked] = useState<
    React.Key[]
  >([]);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const [artistPopup, setArtistPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activePasswordId, setActivePasswordId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const openPop = () => setArtistPopup(true);
  const closePop = () => setArtistPopup(false);
  const openModal = (record: User) => {
    setSelectedId(record.id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const showDeleteModal = (record: User) => {
    setSelectedId(record.id);
    setDeleteModal(true);
  };
  const hideDeleteModal = () => setDeleteModal(false);

  const [, setUserId] = useRecoilState<null | number>(userIdState);

  const fetchUsers = async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      console.log("Access token", accessToken);
      const response = await axios.get(
        "https://interstellar-1-pdzj.onrender.com/user",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  console.log(users, "useerrs");
  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = (id: number) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === id ? { ...user, block: true } : user
      );

      setBlockedUsers(updatedUsers.filter((user) => user.block));
      return updatedUsers;
    });
    const accessToken = Cookies.get("accessToken");
    axios
      .patch(`https://interstellar-1-pdzj.onrender.com/user/block/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        console.log(`Blocked user with ID: ${id}`);
      })
      .catch((err) => {
        console.error("Error blocking user:", err);
      });
  };

  const toggleUnBlock = (id: number) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === id ? { ...user, block: false } : user
      );
      setBlockedUsers(updatedUsers.filter((user) => user.block));
      return updatedUsers;
    });
    const accessToken = Cookies.get("accessToken");

    axios
      .patch(
        `https://interstellar-1-pdzj.onrender.com/user/unblock/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        console.log(`Unblocked user with ID: ${id}`);
      })
      .catch((err) => {
        console.error("Error unblocking user:", err);
      });
  };

  const handlePasswordToggle = (id: number) => {
    setActivePasswordId(activePasswordId === id ? null : id);
  };

  const memoizedUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a) => (a.email.includes(searchQuery) ? -1 : 1))
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

  const memoizedBlockedUsers = useMemo(() => {
    return blockedUsers
      .filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a) => (a.email.includes(searchQuery) ? -1 : 1))
      .map((user) => ({ ...user, key: user.id }));
  }, [blockedUsers, searchQuery]);

  const columns: ColumnsType<User> = [
    {
      title: "Registration Date",
      key: "createdAt",
      render: (_, record) => (
        <div className={styles.artistCell}>{record.createdAt}</div>
      ),
      width: "20%",
    },
    {
      title: "Email",
      key: "email",
      width: "30%",
      render: (_, record) => (
        <div
          onClick={() => {
            artistPopup ? closePop() : openPop();
            setSelectedId(record.id);
          }}
        >
          {record.email}
        </div>
      ),
    },
    {
      title: "Password",
      key: "password",
      width: "15%",
      render: (_, record) => (
        <div className={styles.Password}>
          <input
            type={activePasswordId === record.id ? "text" : "password"}
            value={record.password}
            readOnly
            className={styles.inputPassword}
          />
          <div onClick={() => handlePasswordToggle(record.id)}>
            <Image
              src={`/icon/paswordhider.svg`}
              width={24}
              height={24}
              alt="toggle password visibility"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_, record) => (
        console.log(record, "recordd"),
        (
          <div className={styles.actions}>
            <button
              className={styles.unBorder}
              onClick={() => openModal(record)}
            >
              <Image className={styles.curImg} src={`/icon/Pen.svg`} width={24} height={24} alt="edit" />
            </button>
            <button
              className={styles.unBorder}
              onClick={() => showDeleteModal(record)}
            >
              <Image
              className={styles.curImg}
                src={`/icon/trash.svg`}
                width={24}
                height={24}
                alt="delete"
              />
            </button>
            <button
              className={styles.unBorder}
              onClick={() => {
                record.block
                  ? toggleUnBlock(record.id)
                  : toggleBlock(record.id);
              }}
            >
              <Image
              className={styles.curImg}
                src={
                  record.block
                    ? "/icon/block-icon.svg"
                    : "/icon/unblock-icon.svg"
                }
                width={24}
                height={24}
                alt="block/unblock"
              />
            </button>
          </div>
        )
      ),
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: (
        <span style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
          All Users
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <input
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "500px",
              marginBottom: "20px",
              height: "55px",
              borderRadius: "8px",
              border: "1px solid gray",
              outline: "none",
              backgroundColor: "unset",
              padding: "0 18px",
              fontSize: "17px",
              color: "#fff",
              position: "absolute",
              top: "-200px",
            }}
          />
          {selectedRowKeysAll.length > 0 && (
            <div
              className={styles.buttons}
              style={{
                display: "flex",
                gap: "20px",
                position: "absolute",
                top: "-112px",
                zIndex: "10",
              }}
            >
              {/* <UserBlockBtn />
              <UserDeleteBtn /> */}
            </div>
          )}

          <Table
            // rowSelection={{
            //   selectedRowKeys: selectedRowKeysAll,
            //   onChange: setSelectedRowKeysAll,
            // }}
            className={styles.wrapper}
            columns={columns}
            dataSource={memoizedUsers}
            pagination={{
              pageSize: 9, // Set page size to 8
              position: ["bottomCenter"],
            }}
            onRow={(record) => ({
              onClick: () => {
                setUserId(record.id!);
              },
            })}
          />
          {artistPopup && <ArtistPopup closeModal={closePop} name={""} />}
          {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
          {deleteModal && (
            <SureToDelete
              onCancelClick={hideDeleteModal}
              onDeleteClick={fetchUsers}
              id={selectedId}
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
          Blocked Users
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <input
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "500px",
              height: "55px",
              borderRadius: "8px",
              border: "1px solid gray",
              outline: "none",
              backgroundColor: "unset",
              padding: "0 18px",
              fontSize: "17px",
              color: "#fff",
              position: "absolute",
              top: "-190px",
            }}
          />

          {selectedRowKeysBlocked.length > 0 && (
            <div
              className={styles.buttons}
              style={{
                display: "flex",
                gap: "20px",
                position: "absolute",
                top: "-112px",
                zIndex: "10",
              }}
            >
              {/* <UserDeleteBtn /> */}
            </div>
          )}
          <Table
            rowSelection={{
              selectedRowKeys: selectedRowKeysBlocked,
              onChange: setSelectedRowKeysBlocked,
            }}
            className={styles.wrapper}
            columns={columns}
            dataSource={memoizedBlockedUsers}
            pagination={{
              pageSize: 9, // Set page size to 8
              position: ["bottomCenter"],
            }}
          />
          {artistPopup && (
            <ArtistPopup closeModal={closePop} name={"Dolores"} />
          )}
          {isOpen && <NewPassword closeModal={closeModal} id={selectedId} />}
          {deleteModal && (
            <SureToDelete
              onCancelClick={hideDeleteModal}
              onDeleteClick={fetchUsers}
              id={selectedId}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ width: "1100px" }} />
    </div>
  );
};

export default UserTable;
