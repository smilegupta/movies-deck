/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { listWatchLists } from "../../CRUD/queries";
import { axiosFun } from "../../CRUD/axios.config";

const AddMovie = ({ modalStatus, setModalStatus, auth }) => {
  const [availablePlaylist, setAvailablePlaylist] = useState();
  useEffect(() => {
    if (modalStatus) {
      watchListOptions(auth.user.username);
    }
  }, [modalStatus]);

  const watchListOptions = async (userId) => {
    const res = await axiosFun(listWatchLists(userId));
    setAvailablePlaylist(res.data.listWatchLists.items);
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
          <div className="modal-body pt-0" style={{ padding: "1.5rem"}}>
            <Row>
              {availablePlaylist &&
                availablePlaylist.map((lists, idx) => (
                  <Col key={idx} lg={12} md={12} sm={12} xs={12} className="mb-2">
                    {lists.name}
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
