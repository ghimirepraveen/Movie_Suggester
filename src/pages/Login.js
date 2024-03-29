import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";
import MovieNavbar from "../component/MovieNavbar";
const Login = () => {
  const email = useRef();
  const password = useRef();

  const [modalShown, setModalShown] = useState(false);
  const [modalText, setModalText] = useState("");

  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      //   alert(response.data.message);

      const getAccessToken = response.data.accessToken;

      localStorage.setItem("accessToken", getAccessToken);

      if (response.data.status === "success") {
        setModalText("Logged in successfully, redirecting....");
        setModalShown(true);
      }

      setTimeout(() => {
        history.replace("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setModalText(error.response.data.errors[0].message);
        setModalShown(true);
      } else {
        setModalText("Unknown error occoured! Try again later.");
        setModalShown(true);
      }
    }
  };

  return (
    <>
      <MovieNavbar />

      <Container>
        <h3>Login screen</h3>
        <form onSubmit={loginHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email}
              autoComplete={false}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={password} autoComplete={false} />
          </Form.Group>
          <Button variant="dark" type="submit">
            Login
          </Button>
        </form>
      </Container>

      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h3 className="text-center">
        {" "}
        please use Email: dyno@gmail.com, Pw: 123456{" "}
      </h3>
    </>
  );
};

export default Login;
