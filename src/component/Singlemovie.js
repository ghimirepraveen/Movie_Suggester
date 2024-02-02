import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Singlemovie = (props) => {
  return (
    <>
      <Col key={props.data.id}>
        <Card style={{ width: "16rem", minHeight: "730px" }}>
          <Card.Img
            variant="top"
            src={props.data.image}
            style={{ maxWidth: "250 px" }}
          />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <Card.Text>{props.data.rating}</Card.Text>
            <Link to={`/view_movies/${props.data.id}`}>
              <Button variant="primary">View Detail</Button>
            </Link>
          </Card.Body>
        </Card>

        {/* <div key={props.data.id}>
          <Link to={`/view_movies/${props.data.id}`}>
            <span
              style={{
                color: "blue",
                fontWeight: "bold",
                fontSize: "30px",
                textDecoration: "none",
              }}
            >
              {props.data.name}
            </span>
          </Link>
          <br />
          <br />
          <img
            style={{ height: "50%" }}
            src={props.data.image}
            alt="img of movies"
          />
          <div style={{ background: "white", fontSize: "20px" }}>
            <p>{props.data.info ? props.data.info : "None"}</p>
          </div>
          <br />
          <br />
          <div style={{ fontSize: "35px" }}>
            Rating:{props.data.rating ? props.data.rating : "0"}
          </div>
          <hr />
        </div> */}
      </Col>
    </>
  );
};

export default Singlemovie;
