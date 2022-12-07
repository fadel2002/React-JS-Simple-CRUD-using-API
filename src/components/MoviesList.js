import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { message, Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { MoviesContext } from "../provider/MoviesProvider";
import Search from "antd/lib/input/Search";

const MoviesList = () => {
  const { dataMovies, setDataMovies, inputMovies, setInputMovies, functions } = useContext(MoviesContext);
  const { fetchData, functionDelete, functionEdit, functionSubmitAdd, functionSubmitUpdate, fetchById } = functions;

  let history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const success = () => {
    message.success("Data Terhapus!");
  };

  const handleEdit = (event) => {
    let id = event.currentTarget.value;
    history.push(`/movies/edit/${id}`);
  };

  const handleDelete = (event) => {
    let id = event.currentTarget.value;
    // console.log(event.currentTarget);
    functionDelete(id);
  };

  const handleToForm = () => {
    history.push("/movies/create");
    setInputMovies([]);
  };

  const onSearch = (str) => {
    let searchData = async () => {
      if (!str) {
        fetchData();
      }
      const filtered = dataMovies.filter((data) => {
        return data.title.toLowerCase().includes(str.toLowerCase());
      });

      setDataMovies(filtered);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Year Release",
      dataIndex: "year",
      key: "year",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.review.length - b.review.length,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.genre.length - b.genre.length,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.description.length - b.description.length,
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
    <div className="wrap-paper list" style={{ display: "inlineBlock" }}>
      <h1 className="text-header" style={{ textAlign: "center" }}>
        <b>Movie List</b>
      </h1>
      <Search placeholder="search movies title" allowClear enterButton="Cari" onSearch={onSearch} style={{ width: "300px" }} />
      <br />
      <br />
      <Button type="primary" onClick={handleToForm}>
        Add New Movie
      </Button>{" "}
      <br />
      <Table columns={columns} dataSource={dataMovies} />
    </div>
  );
};

export default MoviesList;
