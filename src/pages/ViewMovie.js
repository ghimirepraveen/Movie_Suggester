import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../component/MovieNavbar";
import { Card, Container } from "react-bootstrap";

const ViewMovies = () => {
  const getPrams = useParams();
  const getId = getPrams.id;
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    getSingleMovieInfo();
  }, [movieData]);
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
      <MovieNavbar />
      <Container>
        <h1> Movie Data:</h1>
        <br />
        <h1 className="text-info ">Movie Name:{movieData.name}</h1>
        <br />
        <br></br>
        <Card body>Movie Info:{movieData.info}</Card>
        <Card body>
          Movie Description:
          {movieData.desc}
        </Card>
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
        <Card body>Rating:{movieData.rating}</Card>
      </Container>
    </>
  );
};
export default ViewMovies;
