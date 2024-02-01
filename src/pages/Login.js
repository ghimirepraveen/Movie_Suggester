import axios from "axios";
import { useRef } from "react";

const Login = () => {
  const email = useRef();
  const password = useRef();

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

      //alert(response.data.message);
      if (response.data.status === "success") {
        alert("logined sucessfully");
      }
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
      login screen
      <form onSubmit={loginhandeler}>
        <br />
        <br />
        email:
        <br />
        <input type="text" ref={email}></input>
        <br />
        <br />
        password:
        <br />
        <input type="text" ref={password}></input>
        <br />
        <br />
        <button type="summit">login</button>
      </form>
    </>
  );
};

export default Login;
