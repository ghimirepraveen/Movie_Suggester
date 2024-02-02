import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../component/MovieNavbar";
import { Button, Container } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userdata, setuserdata] = useState({});
  useEffect(() => {
    getprofile();
  }, []);

  const getprofile = async () => {
    const getAccesToken = localStorage.getItem("AccessToken");
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 1111,
          header: {
            Authorization: `Bearer ${getAccesToken}}`,
          },
        }
      );

      setuserdata(response.data.data);
      console(response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errors[0].message);
      } else {
        alert("something went wrong !!! Please try again !!");
      }
    }
  };

  const onlogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };
  return (
    <>
      <MovieNavbar></MovieNavbar>
      <Container className="mt-1">
        Name:{userdata.name};
        <br />
        <br />
        Email:{userdata.email}
        <br />
        <br />
        Country:{userdata.country}
        <br />
        <br />
        <Button variant="danger" type="submit">
          Login
        </Button>
      </Container>
    </>
  );
};

export default Profile;
