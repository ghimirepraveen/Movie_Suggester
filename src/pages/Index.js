import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [iserror, setiserror] = useState(false);
  const [errorText, setErrorText] = useState("");
  const fetchmovies = async () => {
    setiserror(false);
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/movies"
      );
      setMovies(response.data.moviesData);
    } catch (e) {
      setiserror(true);
      setErrorText("Cannot get movies ");
      //alert("can not info from get movies!1");
    }

    console.log(movies);
  };

  //   const promise = new Promise((resolve, reject) => {
  //     const response = axios.get(
  //       "https://api.dynoacademy.com/test-api/v1/movies"
  //     );
  //     resolve(response);
  //   });
  //   promise
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {});
  // };

  return (
    <div className="App">
      <button onClick={fetchmovies}>Get movies</button>
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

      <div style={{ background: "#7e7e7e", padding: "10px", margin: "10px" }}>
        {movies.map((el) => (
          <div key={el.id}>
            <Link to={`/view_movies/${el.id}`}>
              <span
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: "30px",
                  textDecoration: "none",
                }}
              >
                {el.name}
              </span>
            </Link>
            <br />
            <br />
            <img style={{ height: "50%" }} src={el.image} alt="img of movies" />
            <div style={{ background: "white", fontSize: "20px" }}>
              <p>{el.info ? el.info : "None"}</p>
            </div>
            <br />
            <br />
            <div style={{ fontSize: "35px" }}>
              Rating:{el.rating ? el.rating : "0"}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Index;
