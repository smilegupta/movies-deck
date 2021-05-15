import { useState, Fragment } from "react";
import moment from "moment";
import MoviesDetails from "../../Modals/MoviesDetails";

const MovieCard = ({
  title,
  poster_path,
  release_date,
  overview,
  vote_average,
  backdrop_path,
}) => {
  const [modalStatus, setModalStatus] = useState(false);

  const openModal = () => {
    setModalStatus(true);
  };

  return (
    <Fragment>
      <div
        className="card image-container d-flex justify-content-start mb-3 cursor-pointer"
        onClick={() => openModal(title)}
      >
        <img
          src={
            !poster_path
              ? "https://image-dock-uploads-be.s3.ap-south-1.amazonaws.com/image.2021-05-15T07%3A20%3A12.528Z"
              : `https://image.tmdb.org/t/p/w500/${poster_path}`
          }
          alt={title}
          className="w-100"
        />
        <div className="card-body">
          <h5 className="card-title text-primary">{title}</h5>
          <h6 className="card-subtitle">
            {release_date && moment(release_date).format("YYYY")}
          </h6>
        </div>
      </div>
      <MoviesDetails
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        movieTitle={title}
        overview={overview}
        vote_average={vote_average}
        poster_path={poster_path}
        backdrop_path={backdrop_path}
      />
    </Fragment>
  );
};

export default MovieCard;
