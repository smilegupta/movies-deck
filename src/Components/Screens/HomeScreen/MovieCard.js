import React from "react";
import moment from "moment";

const MovieCard = ({title, poster_path, release_date }) => {
  return (
    <div>
      <div className="card image-container d-flex justify-content-start mb-3">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="w-100"
        />
        <div className="card-body">
          <h5 className="card-title text-primary">{title}</h5>
          <h6 className="card-subtitle">
            {moment(release_date).format("YYYY")}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
