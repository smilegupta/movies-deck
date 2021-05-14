/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { getAllMovies, getGenerList } from "../../../CRUD/homepage";
import moment from "moment";
import useIntersectionObserver from "../../../hook";

const Welcome = () => {
  const loadMoreButton = useRef();
  const [movieList, setMovieList] = useState(null);
  const [genreList, setGenreList] = useState(null);
  const pageCountValue = useRef(1);
  const [pattern, setPattern] = useState('');
  const responsePageCount = useRef();
  useEffect(() => {
    fetchMovieList();
  }, [pattern]);

  const fetchMovieList = async () => {
    const res = await getAllMovies(pageCountValue.current, pattern);
    setMovieList(res.data.results);
    responsePageCount.current = res.data.total_pages;
    const genre = await getGenerList();
    setGenreList(genre.data.genres);
  };

  const fetchMoreMovies = async () => {
    pageCountValue.current += 1;
    const res = await getAllMovies(pageCountValue.current, pattern);
    setMovieList((prevMoviesList) => {
      return [...prevMoviesList, ...res.data.results];
    });
  };

  useIntersectionObserver({
    target: loadMoreButton,
    onIntersect: fetchMoreMovies,
    enabled: pageCountValue.current <= 500,
  });

  return (
    <Container className="my-md-5 my-3">
      <Row className="mb-3">
        <Col lg={6} md={6} sm={6} xs={6}>
          <h4>Discover Movies</h4>
        </Col>
        <Col lg={{ span: 3, offset: 3 }} sm={6} xs={6}>
          <select
            className="form-select form-select-sm"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          >
            <option value="">
              Filter By
            </option>
            {genreList &&
              genreList.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        </Col>
      </Row>

      <Row className="mt-3">
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
      {pageCountValue.current <= responsePageCount.current && (
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
    </Container>
  );
};

export default Welcome;
