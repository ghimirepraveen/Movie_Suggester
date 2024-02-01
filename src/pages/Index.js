import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
      <div>
        <Link to="/add">add movie</Link>
        <Link to="/login">login</Link>
      </div>
      <div>
        <input
          type="text"
          value={searchmovietext}
          placeholder="provide movie name "
          onChange={(e) => setsearchtext(e.target.value)}
        />
        <span style={{ color: "red " }}>{searcherrortext}</span>
      </div>
      {/* <button onClick={fetchmovies}>Get movies</button> */}
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
                <img
                  style={{ height: "50%" }}
                  src={el.image}
                  alt="img of movies"
                />
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
          </>
        )}
      </div>
    </div>
  );
};
export default Index;
