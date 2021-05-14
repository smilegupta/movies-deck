import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllMovies, getGenerList } from "../../../CRUD/homepage";
import moment from "moment";

const Welcome = () => {
  const [movieList, setMovieList] = useState(null);
  const [genreList, setGenreList] = useState(null);
  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    const res = await getAllMovies();
    setMovieList(res.data.results);
    const genre = await getGenerList();
    console.log(genre.data.genres);
    setGenreList(genre.data.genres)
  };
  return (
    <Container className="my-md-5 my-3">
      <Row className="mb-3">
        <Col lg={6} md={6} sm={6} xs={6}>
          <h4>Discover Movies</h4>
        </Col>
        <Col lg={{ span: 3, offset: 3 }} sm={6} xs={6}>
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            <option selected>Sort By</option>
            <option value="popularity.desc">Popularity High to Low</option>
            <option value="popularity.asc">Popularity Low to High</option>
            <option value="release_date.asc">Popularity High to Low</option>
            <option value="release_date.desc">Popularity High to Low</option>
          </select>
        </Col>
      </Row>
    
      {
        genreList && genreList.map((genre, idx) => <> <span class="badge rounded-pill bg-primary mb-2"> {genre.name} </span> </> )
      }
    
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
    </Container>
  );
};

export default Welcome;
