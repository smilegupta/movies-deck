import Modal from "react-modal";
import { Row, Col } from "react-bootstrap";

const ReadNote = ({
  modalStatus,
  setModalStatus,
  movieTitle,
  overview,
  vote_average,
  backdrop_path,
  auth,
  genre_ids,
  id,
}) => {
  const genreMapping = Object.fromEntries(
    auth.genreList.map((g) => [g.id, g.name])
  );

  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={() => setModalStatus(false)}
      className="react-modal"
      ariaHideApp={false}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <Row>
            {backdrop_path && (
              <Col lg={12} md={12} xs={12} sm={12}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                  alt={movieTitle}
                  className="w-100"
                />
              </Col>
            )}

            <Col lg={12} md={12} xs={12} sm={12}>
              <div
                className="modal-header"
                style={{ padding: "1.5rem", flexDirection: "column" }}
              >
                <h5 className="modal-title pb-0 text-start w-100">
                  {movieTitle} {" "} {auth.user &&  <i className="las la-plus cursor-pointer" /> }
                </h5>
                <h6 className="pb-0 text-start w-100">
                  {" "}
                  {genre_ids.map((gId) => genreMapping[gId]).join(", ")}{" "}
                </h6>
              </div>
              <div className="modal-body pt-0" style={{ padding: "1.5rem" }}>
                <h6>
                  {" "}
                  <span className="text-dark"> Overview: </span> {overview}{" "}
                </h6>
                <Row>
                  <Col lg={6} md={6} xs={12} sm={12}>
                    <h6>
                      <span className="text-dark"> Rating: </span>{" "}
                      {vote_average}{" "}
                    </h6>
                  </Col>
                  <Col lg={6} md={6} xs={12} sm={12}>
                    <h6 className="text-md-end text-start cursor-pointer">
                      <a
                        href={`https://www.themoviedb.org/movie/${id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="text-dark">
                          {" "}
                          Know More <i className="las la-external-link-alt" />
                        </span>
                      </a>
                    </h6>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default ReadNote;
