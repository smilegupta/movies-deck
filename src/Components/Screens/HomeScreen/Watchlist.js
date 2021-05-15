/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listMovies } from "../../../CRUD/queries";
import { axiosFun } from "../../../CRUD/axios.config";
import moment from "moment";
import { Row, Col, Container } from "react-bootstrap";

const Watchlist = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState();

  useEffect(() => {
    getMoviesList();
  }, [id]);

  const getMoviesList = async () => {
    const res = await axiosFun(listMovies(id));
    console.log(res.data.listMoviess.items);
    setMovies(res.data.listMoviess.items);
  };

  return (
    <Container className="my-md-5 my-3">
      <Row className="mb-3">
        <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
          <h4>{name}</h4>
        </Col>
      </Row>
      {movies && movies.length > 0 ? (
        <Row>
          <Col lg={3} md={3} xs={6} sm={6}>
            <div>
              {movies.map((movie, idx) => (
                <div
                  className="card image-container d-flex justify-content-start mb-3 cursor-pointer"
                  key={idx}
                >
                  <img
                    src={
                      !movie.posterPath
                        ? "https://image-dock-uploads-be.s3.ap-south-1.amazonaws.com/image.2021-05-15T07%3A20%3A12.528Z"
                        : `https://image.tmdb.org/t/p/w500/${movie.posterPath}`
                    }
                    alt={movie.title}
                    className="w-100"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary">{movie.title}</h5>
                    <h6 className="card-subtitle">
                      {movie.releaseDate &&
                        moment(movie.releaseDate).format("YYYY")}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      ) : (
        <span> There are no movies in this watchlist </span>
      )}
    </Container>
  );
};

export default Watchlist;
