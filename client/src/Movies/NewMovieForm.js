import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialFormState = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const NewMovieForm = ({ updateMovieList }) => {
  const [newMovie, setNewMovie] = useState(initialFormState);
  const { push } = useHistory();

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;

    setNewMovie({
      ...newMovie,
      [e.target.name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processed = {...newMovie}
    processed.stars = newMovie.stars.split(', ')
    axios
    .post(`http://localhost:5000/api/movies`, processed)
    .then((res) => {
      updateMovieList()
      push(`/movies/${res.data[res.data.length - 1].id}`);
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={newMovie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={newMovie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={newMovie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={newMovie.stars}
        />
        <div className="baseline" />

        <button className="save-button">Add New Movie</button>
      </form>  

    </div>
  );

};

export default NewMovieForm;