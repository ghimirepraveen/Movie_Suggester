import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewMovies = () => {
  const getPrams = useParams();
  const getId = getPrams.id;
  const [movieData, setMovieData] = useState({});
  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      console.log("error due to api call");
    }
  };
  return (
    <>
      view movies of id {getId}
      <button onClick={getSingleMovieInfo}>View detail of this movie!!</button>
      <br></br>
      Movie Data:
      <br />
      Movie Name:{movieData.name}
      <br />
      <br></br>
      Movie Info:{movieData.info}
      Movie Description:{movieData.desc}
      <br />
      <br />
      <br />
      <img
        style={{ height: "50%" }}
        src={movieData.image}
        alt="img of movies"
      />
      <br />
      <br />
      Rating:{movieData.rating}
    </>
  );
};
export default ViewMovies;
