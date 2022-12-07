import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GamesContext } from "../provider/GamesProvider";
import Search from "antd/lib/input/Search";

const GamesList = () => {
  let { dataGames, setDataGames, inputGames, setInputGames, functions } = useContext(GamesContext);
  const { fetchData, functionDelete, functionEdit, functionSubmitAdd, functionSubmitUpdate, fetchById } = functions;
  let history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (event) => {
    let id = event.currentTarget.value;
    history.push(`/games/edit/${id}`);
  };

  const handleDelete = (event) => {
    let id = event.currentTarget.value;
    functionDelete(id);
  };

  const handleToForm = () => {
    history.push("/games/create");
    setInputGames([]);
  };

  const onSearch = (str) => {
    let searchData = async () => {
      if (!str) {
        fetchData();
      }
      const filtered = dataGames.filter((data) => {
        return data.name.toLowerCase().includes(str.toLowerCase());
      });

      setDataGames(filtered);
    };

    searchData();
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Year Release",
      dataIndex: "release",
      key: "release",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.release - b.release,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.platform.length - b.platform.length,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.genre.length - b.genre.length,
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (res, index) => (
        <>
          <Button icon={<EditOutlined />} onClick={handleEdit} value={res.id}>
            Edit
          </Button>
          &nbsp; &nbsp;
          <Button icon={<DeleteOutlined />} onClick={handleDelete} value={res.id} />
        </>
      ),
    },
  ];

  return (
    <div className="wrap-paper list">
      <h1 className="text-header" style={{ textAlign: "center" }}>
        <b>Game List</b>
      </h1>
      <Search placeholder="search games name" allowClear enterButton="Cari" onSearch={onSearch} style={{ width: "300px" }} />
      <br />
      <br />
      <Button type="primary" onClick={handleToForm}>
        Add New Game
      </Button>{" "}
      <br />
      <Table columns={columns} dataSource={dataGames} />
    </div>
  );
};

export default GamesList;
