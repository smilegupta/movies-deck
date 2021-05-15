import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { searchMovies } from "../../../CRUD/movies";
import MovieCard from "./MovieCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResponse, setSearchResponse] = useState();
  const searchingMovie = async (e, value) => {
    e.preventDefault();
    setSearchTerm(value)
    const res = await searchMovies(searchTerm);
    console.log(res.data.results)
    setSearchResponse(res.data.results);
  };
  return (
    <Container className="my-md-5 my-3">
      <Row className="mb-3">
        <Col lg={12} md={12} sm={12} xs={12} className="text-center mb-2">
          <h4> Search Movies</h4>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mx-auto">
          <form className="d-flex" onSubmit={(e) => searchingMovie(e)}>
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => searchingMovie(e, e.target.value)}
            />
            <button
              className="btn btn-secondary my-2 my-sm-0"
              type="submit"
              style={{ display: "none" }}
            >
              Search
            </button>
          </form>
        </Col>
      </Row>
      <Row>
        {searchResponse && searchResponse.length > 0 ? (
          <>
            {" "}
            {searchResponse.map((movie, idx) => (
              <Col key={idx} lg={3} md={3} sm={4} xs={6}>
                <MovieCard
                  title={movie.title}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                />
              </Col>
            ))}{" "}
          </>
        ) : (
          <span> No result found </span>
        )}
      </Row>
    </Container>
  );
};

export default Search;
