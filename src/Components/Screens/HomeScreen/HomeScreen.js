/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import CreateCollection from "../../Modals/CreateCollection";
import { listWatchLists } from "../../../CRUD/queries";
import { axiosFun } from "../../../CRUD/axios.config";

const HomeScreen = ({ auth }) => {
  const [watchListRes, setWatchListRes] = useState();
  const userId = auth.user.username;

  useEffect(() => {
    listWatchlists();
  }, []);

  const listWatchlists = async () => {
    const res = await axiosFun(listWatchLists(userId));
    setWatchListRes(res.data.listWatchLists.items);
  };
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <Container className="my-md-5 my-3">
      <Row className="mb-3">
        <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
          <h4>
            My Watchlist{" "}
            <i
              className="las la-plus cursor-pointer"
              onClick={() => setModalStatus(true)}
            />
          </h4>
        </Col>
        {watchListRes &&
          watchListRes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((watchList, idx) => (
              <Col lg={3} md={3} sm={6} xs={6} key={idx}>
                <div className="card watch-list text-white bg-primary mb-3  cursor-pointer">
                  <div className="card-body">
                    <h4 className="card-title block-with-title-text">
                      {watchList.name}
                    </h4>
                    <p className="card-text block-with-text">
                      {watchList.description}
                    </p>
                  </div>
                </div>
              </Col>
            ))}

        <Col lg={3} md={3} sm={6} xs={6} onClick={() => setModalStatus(true)}>
          <div className="card  cursor-pointer watch-list border-primary mb-3 d-flex align-items-center justify-content-center">
            <i
              className="las la-plus-circle cursor-pointer"
              style={{ fontSize: "22px" }}
            ></i>
            Create Watchlist
          </div>
        </Col>
      </Row>
      <CreateCollection
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        userId={userId}
        setWatchListRes={setWatchListRes}
      />
    </Container>
  );
};

export default HomeScreen;
