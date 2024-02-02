import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../component/MovieNavbar";
import { Button, Container } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userdata, setuserdata] = useState({});
  useEffect(() => {
    getprofile();
  }, []);

  const getprofile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 1111,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );

      setuserdata(response.data.data);
      console(response);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occoured! Try again later.");
      }
    }
  };

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };
  return (
    <>
      <MovieNavbar></MovieNavbar>
      <Container className="mt-1">
        Name:{userdata.name}
        <br />
        <br />
        Email:{userdata.email}
        <br />
        <br />
        Country:{userdata.country}
        <br />
        <br />
        <Button onClick={onLogout} variant="danger" type="button">
          Logout
        </Button>
      </Container>
    </>
  );
};

export default Profile;
