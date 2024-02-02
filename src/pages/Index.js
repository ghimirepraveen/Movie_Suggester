import axios from "axios";
import { useEffect, useState } from "react";
import MovieNavbar from "../component/MovieNavbar";
import Singlemovie from "../component/Singlemovie";
import { Container, Form, Row } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [iserror, setiserror] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchmovietext, setsearchtext] = useState("");
  const [searcherrortext, setsearcherrortext] = useState(false);
  const [loading, setloading] = useState(false);
  const [firstrun, setfirstrun] = useState(true);
  useEffect(() => {
    fetchmovies();
  }, []);

  useEffect(() => {
    if (!firstrun) {
      const fetchtimer = setTimeout(() => {
        if (searchmovietext && searchmovietext.length > 2) {
          fetchmovies();
          setsearcherrortext();
        } else if (searchmovietext.length < 1) {
          fetchmovies();
          setsearcherrortext();
        } else {
          setsearcherrortext("please enter 3 letter to search  ");
        }
      }, 1000);
      return () => {
        clearTimeout(fetchtimer);
      };
    }
  }, [searchmovietext]);
  const fetchmovies = async () => {
    setloading(true);

    setiserror(false);
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchmovietext}`
      );
      setMovies(response.data.moviesData);
      setloading(false);
      setfirstrun(false);
    } catch (e) {
      setiserror(true);
      setloading(false);
      setfirstrun(false);
      setErrorText("Cannot get movies ");
    }

    console.log(movies);
  };

  return (
    <div className="App">
      <MovieNavbar />
      <div className="text-center">
        <Container>
          <Form.Group className="mb-3">
            <Form.Label>Provide a movie name </Form.Label>
            <Form.Control
              type="movie"
              onChange={(e) => setsearchtext(e.target.value)}
            />
          </Form.Group>
        </Container>
      </div>
      <br></br>
      {iserror ? (
        <>
          <div
            style={{
              background: "red",
              color: "#fff",
              padding: "10px",
              margin: "10px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <></>
      )}
      <div>{loading ? <>loading </> : <></>}</div>
      <div style={{ background: "#7e7e7e", padding: "10px", margin: "10px" }}>
        {loading && movies.length < 1 ? (
          <>movies not found</>
        ) : (
          <>
            <Row>
              {movies.map((el) => (
                <Singlemovie data={el} />
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};
export default Index;
