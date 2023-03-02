import React, { useEffect, useState } from "react";
import { useAuthContext } from "./useToken";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player/youtube';

export default function MovieDetail() {
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState([]);
  const { token } = useAuthContext();
  const { id } = useParams();
  const fetchData = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/movie/${id}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    const movie = await response.json();
    setMovieDetail(movie);
  };

  const movieReview = (movie_id) => {
    navigate(`/reviews/create/${movie_id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="w-screen">
        <div className="bg-gradient-to-r from-bg-dark-blue to to-blue-900">
          <div className="mx-20 flex justify-center px-8 py-16">
            <div className="flex flex-row items-center bg-darker p-4 rounded-lg border-8 border-card">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
                  alt=""
                  className="border-4 border-card"
                />
              </div>
              <div className="flex justify-center items-center flex-col mx-20 text-xl bg-card pb-5 pt-5 pl-5 pr-5">
                <div className="text-4xl mb-40 text-gray-200 font-bold underline font-verdana">{movieDetail.title}</div>
                <div className="text-gray-200" style={{ margin: "2px" }}>
                  Runtime: {movieDetail.runtime} minutes
                </div>
                <div className="text-gray-200" style={{ margin: "2px" }}>
                  Rating: {movieDetail.vote_average}
                </div>
                <br></br>
                <div className="text-gray-200" >Overview:</div>
                <div className="text-gray-200" style={{ margin: "2px" }}>{movieDetail.overview}</div>
                <button
                  className="mt-40 border w-fit p-2 hover:border-yellow-500 text-white hover:text-yellow-500"
                  onClick={() => movieReview(movieDetail.movie_id)}
                >
                  Review This Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
