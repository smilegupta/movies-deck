import { Row, Col, Container } from "react-bootstrap";

const Search = () => {
  return (
    <Container className="my-md-5 my-3">
      <Row className="mb-3">
      <Col lg={12} md={12} sm={12} xs={12} className="text-center mb-2">
          <h4> Search Movies</h4>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="mx-auto">
          <form class="d-flex">
            <input
              class="form-control me-sm-2"
              type="text"
              placeholder="Search"
            />
            <button class="btn btn-secondary my-2 my-sm-0" type="submit" style={{display: "none"}}>
              Search
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
