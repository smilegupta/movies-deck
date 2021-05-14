import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../../CRUD/homepage";
import moment from "moment";

const Welcome = () => {
  const [movieList, setMovieList] = useState(null);
  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const res = await getAllMovies();
    setMovieList(res.data.results);
    console.log(res.data.results);
  };
  return (
    <Container className="my-md-5 my-3">
      <Row className="mb-3">
        <Col lg={12} md={12} sm={12} xs={12}>
          <h4>Trending this week</h4>
        </Col>
      </Row>
      <Row>
        {movieList &&
          movieList.map((movie, idx) => (
            <Col key={idx} lg={3} md={3} sm={4} xs={6}>
              <div className="card image-container d-flex justify-content-start mb-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-100"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{movie.title}</h5>
                  <h6 className="card-subtitle">
                    {moment(movie.release_date).format("YYYY")}
                  </h6>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Welcome;
