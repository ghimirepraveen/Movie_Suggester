import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MovieNavbar = () => {
  return (
    <>
      <Navbar className="bg-dark text-light">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            <Link to="/" className="text-white">
              Movie Suggester
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end gap-3">
            <Navbar.Text>
              <Link to="/add" className="text-white">
                add movie
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              {localStorage.getItem("accessToken") ? (
                <>
                  <Link to="/profile" className="text-white">
                    profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white">
                    login
                  </Link>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MovieNavbar;
