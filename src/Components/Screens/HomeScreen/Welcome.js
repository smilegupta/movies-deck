import { Row, Col, Container } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { getAllMovies, getGenerList } from "../../../CRUD/homepage";

const Welcome = () => {
  const [movieList, setMovieList] = useState(null);
  const [genreList, setGenreList] = useState(null);
  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const res = await getAllMovies();
    const genre = await getGenerList();
    setMovieList(res.data.results);
    console.log(genre.data.genres);
    setGenreList(genre.data.genres);
  };
  return (
    <Container className="my-md-5 my-3">
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
                  <h5 className="card-title">{movie.title}</h5>
                  <h6 className="card-subtitle text-muted">
                    {movie.genre_ids.map((genre, idx) => (
                      <Fragment>
                        {genreList && (
                          <span className="badge rounded-pill bg-primary m-1">
                            {" "}
                            {
                              genreList.find((obj) => obj.id === genre).name
                            }{" "}
                          </span>
                        )}
                      </Fragment>
                    ))}
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
