/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { listWatchLists, createMovie } from "../../CRUD/queries";
import { axiosFun } from "../../CRUD/axios.config";
import { toast } from "react-toastify";
toast.configure();
Modal.setAppElement("*");

const AddMovie = ({
  modalStatus,
  setModalStatus,
  auth,
  movieTitle,
  backdrop_path,
  id,
  poster_path,
  release_date,
}) => {
  const [availablePlaylist, setAvailablePlaylist] = useState();
  useEffect(() => {
    if (modalStatus) {
      watchListOptions(auth.user.username);
    }
  }, [modalStatus]);

  const watchListOptions = async (userId) => {
    const res = await axiosFun(listWatchLists(userId));
    console.log(res.data.listWatchLists.items);
    setAvailablePlaylist(res.data.listWatchLists.items);
  };

  const addMovietoWatchList = async (watchListId) => {
    try {
      await axiosFun(
        createMovie(
          auth.user.username,
          movieTitle,
          backdrop_path,
          id,
          poster_path,
          release_date,
          watchListId
        )
      );
      const message = "Bingo! Movie Added to Watchlist Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setModalStatus(false);
    } catch (err) {
      let error = err.message || "Something went wrong!";
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={() => setModalStatus(false)}
      className="react-modal"
      ariaHideApp={false}
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ minHeight: "250px" }}>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div
                className="modal-header"
                style={{ padding: "1.5rem", flexDirection: "column" }}
              >
                <h5 className="modal-title pb-0 text-start w-100">
                  Available Watchlists
                </h5>
              </div>
            </Col>
          </Row>
          <div className="modal-body pt-0" style={{ padding: "1.5rem" }}>
            <Row>
              {availablePlaylist &&
                availablePlaylist.map((lists, idx) => (
                  <Col
                    key={idx}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className="mb-2"
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => addMovietoWatchList(lists.watchListId)}
                    >
                      {" "}
                      {lists.name}{" "}
                    </span>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddMovie;
