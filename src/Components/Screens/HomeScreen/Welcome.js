/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Container } from "react-bootstrap";
import { useRef } from "react";
import { getAllMovies } from "../../../CRUD/movies";
import useIntersectionObserver from "../../../hook";
import MovieCard from "./MovieCard";

const Welcome = ({ auth }) => {
  const loadMoreButton = useRef();
  const pageCountValue = useRef(1);

  const fetchMoreMovies = async () => {
    pageCountValue.current += 1;
    const res = await getAllMovies(pageCountValue.current, auth.pattern);
    auth.setMovieList((prevMoviesList) => {
      return [...prevMoviesList, ...res.data.results];
    });
  };

  useIntersectionObserver({
    target: loadMoreButton,
    onIntersect: fetchMoreMovies,
    enabled: pageCountValue.current <= auth.responsePageCount.current,
  });

  return (
    <Container className="my-md-5 my-3">
      {auth && (
        <>
          {" "}
          <Row className="mb-3">
            <Col lg={6} md={6} sm={6} xs={6}>
              <h4>Discover Movies</h4>
            </Col>
            <Col lg={{ span: 3, offset: 3 }} sm={6} xs={6}>
              <select
                className="form-select form-select-sm"
                value={auth.pattern}
                onChange={(e) => auth.setPattern(e.target.value)}
              >
                <option value="">Filter By</option>
                {auth.genreList &&
                  auth.genreList.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <Row className="mt-3">
            {auth.movieList &&
              auth.movieList.map((movie, idx) => (
                <Col key={idx} lg={3} md={3} sm={4} xs={6}>
                  <MovieCard
                    title={movie.title}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                    overview={movie.overview}
                    vote_average={movie.vote_average}
                    backdrop_path={movie.backdrop_path}
                    auth={auth}
                    genre_ids={movie.genre_ids}
                    id={movie.id}
                  />
                </Col>
              ))}
          </Row>
          {pageCountValue.current <= auth.responsePageCount.current && (
            <Row className="">
              <Col lg={12} sm={12} md={12} xs={12} className="my-5 text-center">
                <button
                  ref={loadMoreButton}
                  className="btn btn-primary"
                  onClick={() => fetchMoreMovies()}
                >
                  {" "}
                  Load More{" "}
                </button>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Welcome;
