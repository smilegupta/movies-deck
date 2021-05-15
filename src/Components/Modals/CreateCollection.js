import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { axiosFun } from "../../CRUD/axios.config";
import { createWatchList, listWatchLists } from "../../CRUD/queries";
toast.configure();
Modal.setAppElement("*");

const CreateCollection = ({
  modalStatus,
  setModalStatus,
  userId,
  setWatchListRes,
}) => {
  // State Variables
  const [collectionName, setCollectionName] = useState("");
  const [collectionDesc, setCollectionDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validating that Collection Name
  const validateFields = () => {
    setError("");
    if (collectionName === null || collectionName === "") {
      setError("Please enter a watchlist name");
      return false;
    }
    return true;
  };

  // Creating Collection API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    try {
      await axiosFun(createWatchList(userId, collectionName, collectionDesc));
      const res = await axiosFun(listWatchLists(userId));
      setWatchListRes(res.data.listWatchLists.items);
      const message = "Bingo! New Watchlist Have Created Successfully.";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setModalStatus(false);
      setCollectionDesc("");
      setCollectionName("");
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={() => setModalStatus(false)}
      className="react-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ padding: "1.5rem" }}>
            <h5 className="modal-title">Create Watchlist</h5>
            <h5
              onClick={() => setModalStatus(false)}
              className="cursor-pointer"
            >
              {" "}
              &times;{" "}
            </h5>
          </div>
          <div className="modal-body pt-0" style={{ padding: "1.5rem" }}>
            <form>
              <div className="mb-3">
                <label htmlFor="collectionName">Watchlist Name*</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="collectionName"
                  id="collectionName"
                  value={collectionName}
                  onChange={(e) => {
                    setCollectionName(e.target.value);
                  }}
                  onBlur={validateFields}
                />
                <div className="text-danger">{error || ""}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="5"
                  value={collectionDesc}
                  onChange={(e) => {
                    setCollectionDesc(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer" style={{ padding: "1.5rem" }}>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="btn btn-primary"
              disabled={loading}
            >
              Create {loading ? "  " : ""}
              <span
                className={loading ? "spinner-border spinner-border-sm" : ""}
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCollection;
