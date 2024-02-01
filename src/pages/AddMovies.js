import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddMovies = () => {
  const history = useHistory();
  const moviename = useRef();
  const rating = useRef();
  const descripetion = useRef();

  const addmoviehandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: moviename.current.value,
      rating: rating.current.value,
      description: descripetion.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 1111,
        }
      );

      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errors[0].message);
      } else {
        alert("something went wrong !!! Please try again !!");
      }
    }
  };
  return (
    <>
      <Link to="/">Home</Link>
      <form onSubmit={addmoviehandler}>
        <br />
        <br />

        <input type="text" placeholder="mmovie name" ref={moviename} />
        <br />
        <br />
        <input type="text" placeholder="rating" ref={rating} />
        <br />
        <br />
        <textarea placeholder="description" ref={descripetion}></textarea>
        <br />
        <br />
        <button type="submit">Summit</button>
      </form>
    </>
  );
};
export default AddMovies;
