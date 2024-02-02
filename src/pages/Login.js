import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../component/MovieNavbar";
import { Button, Container, Form } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const loginhandeler = async (e) => {
    e.preventDefault();

    const logindata = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        logindata,
        {
          timeout: 1000,
        }
      );
      const getAccesToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccesToken);

      history.replace("/");
      //alert(response.data.message);
      if (response.data.status === "success") {
        alert("logined sucessfully");
      }
    } catch (error) {
      try {
        if (error.response) {
          console.log(error.response.data.errors[0].message);
        } else {
          alert("something went wrong !!! Please try again !!");
        }
      } catch (error) {
        alert("Unknown error Occured !try again later");
      }
    }
    return (
      <>
        <MovieNavbar />
        <Container>
          <form onSubmit={loginhandeler}>
            <br />
            <br />
            {/* email:
            <br />
            <input type="text" ref={email}></input>
            <br />
            <br /> */}
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={password} />
            </Form.Group>
            {/* password:
            <br />
            <input type="text" ref={password}></input>
            <br />
            <br /> */}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </form>
        </Container>
      </>
    );
  };
};

export default Login;
