import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../component/MovieNavbar";
import { Container, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
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
      <MovieNavbar />
      <Container className="p-5 m-2">
        <form onSubmit={addmoviehandler}>
          <h3>Add a movie</h3>

          {/* <input type="text" placeholder="movie name" ref={moviename} />
          <br />
          <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
              type="moviename"
              placeholder="Enter Movie Name"
              ref={moviename}
            />
          </Form.Group>
          {/* <input type="text" placeholder="rating" ref={rating} />
          <br />
          <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="rating"
              placeholder="Enter Movie Rating"
              ref={rating}
            />
          </Form.Group>
          {/* <textarea placeholder="description" ref={descripetion}></textarea>
          <br />
          <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Enter Movie Description"
              ref={descripetion}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};
export default AddMovies;
