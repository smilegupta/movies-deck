import Modal from "react-modal";
import { Row, Col } from "react-bootstrap";

const ReadNote = ({
  modalStatus,
  setModalStatus,
  movieTitle,
  overview,
  vote_average,
  poster_path,
  backdrop_path,
}) => {
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
              <div className="modal-header" style={{ padding: "1.5rem" }}>
                <h5 className="modal-title pb-0">{movieTitle}</h5>
              </div>
              <div className="modal-body pt-0" style={{ padding: "1.5rem" }}>
                <h6>
                  {" "}
                  <span className="text-dark"> Overview: </span> {overview}{" "}
                </h6>
                <h6>
                  {" "}
                  <span className="text-dark"> Rating: </span> {vote_average}{" "}
                </h6>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default ReadNote;
