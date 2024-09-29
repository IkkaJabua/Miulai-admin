import React, { useEffect, useMemo, useState } from "react";
import { Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./usertable.module.scss";
import Cookies from "js-cookie";
import ArtistPopup from "../ArtistPopup/ArtistPopup";
import NewPassword from "../NewPassword/NewPassword";
import SureToDelete from "../SureToDelete/SureToDelete";
import axios from "axios"; 
import Image from "next/image"; 

type User = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  block: boolean;
};

const UserTable: React.FC = () => {
  const [selectedRowKeysAll, setSelectedRowKeysAll] = useState<React.Key[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [, setUserId] = useState<number | undefined>(); // Add this line
  const [users, setUsers] = useState<User[]>([]);
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

  const fetchUsers = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get("https://interstellar-1-pdzj.onrender.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, block: true } : user))
    );
    const accessToken = Cookies.get("accessToken");
    try {
      await axios.patch(`https://interstellar-1-pdzj.onrender.com/user/block/${id}`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (err) {
      console.error("Error blocking user:", err);
    }
  };

  const toggleUnBlock = async (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, block: false } : user))
    );
    const accessToken = Cookies.get("accessToken");
    try {
      await axios.patch(`https://interstellar-1-pdzj.onrender.com/user/unblock/${id}`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (err) {
      console.error("Error unblocking user:", err);
    }
  };

  const handlePasswordToggle = (id: number) => {
    setActivePasswordId((prevId) => (prevId === id ? null : id));
  };

  const memoizedUsers = useMemo(() => {
    return users
      .filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a) => (a.email.includes(searchQuery) ? -1 : 1))
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

  const columns: ColumnsType<User> = [
    {
      title: "Registration Date",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <div className={styles.artistCell}>{createdAt}</div>
      ),
      width: "20%",
    },
    {
      title: "Email",
      key: "email",
      width: "30%",
      render: (_, { email, id }) => (
        <div
          onClick={() => {
            artistPopup ? closePop() : openPop();
            setSelectedId(id);
          }}
        >
          {email}
        </div>
      ),
    },
    {
      title: "Password",
      key: "password",
      width: "15%",
      render: (_, { password, id }) => (
        <div className={styles.Password}>
          <input
            type={activePasswordId === id ? "text" : "password"}
            value={password}
            readOnly
            className={styles.inputPassword}
          />
          <div onClick={() => handlePasswordToggle(id)}>
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
        <div className={styles.actions}>
          <button className={styles.unBorder} onClick={() => openModal(record)}>
            <Image src={`/icon/Pen.svg`} width={24} height={24} alt="edit" />
          </button>
          <button className={styles.unBorder} onClick={() => showDeleteModal(record)}>
            <Image src={`/icon/trash.svg`} width={24} height={24} alt="delete" />
          </button>
          <button
            className={styles.unBorder}
            onClick={() => {
              record.block ? toggleUnBlock(record.id) : toggleBlock(record.id);
            }}
          >
            <Image
              src={record.block ? "/icon/block-icon.svg" : "/icon/unblock-icon.svg"}
              width={24}
              height={24}
              alt="block/unblock"
            />
          </button>
        </div>
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
            }}
          />
          <Table
            rowSelection={{
              selectedRowKeys: selectedRowKeysAll,
              onChange: setSelectedRowKeysAll,
            }}
            className={styles.wrapper}
            columns={columns}
            dataSource={memoizedUsers}
            pagination={{
              pageSize: 9,
              position: ["bottomCenter"],
            }}
            onRow={(record) => ({
              onClick: () => {
                setUserId(record.id); // This now references the correct state
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
        <Table
          rowSelection={{
            selectedRowKeys: selectedRowKeysAll,
            onChange: setSelectedRowKeysAll,
          }}
          className={styles.wrapper}
          columns={columns}
          dataSource={memoizedUsers.filter(user => user.block)}
          pagination={{
            pageSize: 9,
            position: ["bottomCenter"],
          }}
        />
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      items={tabItems}
      style={{ color: "#fff", backgroundColor: "transparent" }}
    />
  );
};

export default UserTable;
