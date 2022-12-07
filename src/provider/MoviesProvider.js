import React, { useState, createContext } from "react";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

export const MoviesContext = createContext();

export const MoviesProvider = (props) => {
  const [dataMovies, setDataMovies] = useState([]);
  const [inputMovies, setInputMovies] = useState({
    description: "",
    duration: "",
    genre: "",
    image_url: "",
    rating: "",
    review: "",
    title: "",
    year: "",
  });

  const fetchData = async () => {
    const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`);
    setDataMovies(
      result.data.map((data, index) => {
        return {
          no: index + 1,
          id: data.id,
          description: data.description,
          duration: data.duration,
          genre: data.genre,
          image_url: data.image_url,
          rating: data.rating,
          review: data.review,
          title: data.title,
          year: data.year,
        };
      })
    );
  };

  const fetchById = async (Id) => {
    const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${Id}`);
    let data = result.data;
    setInputMovies({
      id: Id,
      description: data.description,
      duration: data.duration,
      genre: data.genre,
      image_url: data.image_url,
      rating: data.rating,
      review: data.review,
      title: data.title,
      year: data.year,
    });
  };

  const functionDelete = (id) => {
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, { headers: { Authorization: "Bearer " + Cookies.get("token") } })
      .then(() => {
        let newData = dataMovies.filter((el) => {
          return el.id !== id;
        });
        newData.map((map, index) => {
          newData[index].no = index + 1;
        });
        setDataMovies(newData);
        message.success("Delete Successful!");
      })
      .catch(() => {
        message.warning("Delete Failed!");
      });
  };

  const functionEdit = (id) => {
    axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`).then((res) => {
      let data = res.data;
      setInputMovies({
        id: data.id,
        description: data.description,
        duration: data.duration,
        genre: data.genre,
        image_url: data.image_url,
        rating: data.rating,
        review: data.review,
        title: data.title,
        year: data.year,
      });
    });
  };

  const functionSubmitAdd = () => {
    axios
      .post(
        `https://backendexample.sanbersy.com/api/data-movie`,
        {
          description: inputMovies.description,
          duration: inputMovies.duration,
          genre: inputMovies.genre,
          image_url: inputMovies.image_url,
          rating: inputMovies.rating,
          review: inputMovies.review,
          title: inputMovies.title,
          year: inputMovies.year,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((res) => {
        setDataMovies([
          ...dataMovies,
          {
            no: dataMovies.at(-1).no + 1,
            id: res.data.id,
            description: inputMovies.description,
            duration: inputMovies.duration,
            genre: inputMovies.genre,
            image_url: inputMovies.image_url,
            rating: inputMovies.rating,
            review: inputMovies.review,
            title: inputMovies.title,
            year: inputMovies.year,
          },
        ]);
        message.success("Data Has Been Added!");
      })
      .catch(() => {
        message.warning("Data Add Failed!");
      });
  };

  const functionSubmitUpdate = (id) => {
    axios
      .put(
        `https://backendexample.sanbersy.com/api/data-movie/${id}`,
        {
          description: inputMovies.description,
          duration: inputMovies.duration,
          genre: inputMovies.genre,
          image_url: inputMovies.image_url,
          rating: inputMovies.rating,
          review: inputMovies.review,
          title: inputMovies.title,
          year: inputMovies.year,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then(() => {
        let singleData = dataMovies.find((el) => el.id == id);

        singleData.id = id;
        singleData.description = inputMovies.description;
        singleData.duration = inputMovies.duration;
        singleData.genre = inputMovies.genre;
        singleData.image_url = inputMovies.image_url;
        singleData.rating = inputMovies.rating;
        singleData.review = inputMovies.review;
        singleData.title = inputMovies.title;
        singleData.year = inputMovies.year;
        setDataMovies([...dataMovies]);
        message.success("Data Has Been Edited!");
      })
      .catch(() => {
        message.warning("Data Edit Failed!");
      });
  };

  const functions = {
    fetchData,
    functionDelete,
    functionEdit,
    functionSubmitAdd,
    functionSubmitUpdate,
    fetchById,
  };

  return <MoviesContext.Provider value={{ dataMovies, setDataMovies, inputMovies, setInputMovies, functions }}>{props.children}</MoviesContext.Provider>;
};
