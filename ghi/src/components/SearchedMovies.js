import React, { useEffect, useState } from "react";
import { useAuthContext } from "./useToken";
import { useNavigate } from "react-router-dom";

export default function SearchedMovies(props) {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [SearchedMovies, setSearchedMovies] = useState([]);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/movies/${props.searchTerm}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    const searched = await response.json();
    setSearchedMovies(searched);
    console.log(searched);
  };

  const movieDetail = (movie_id) => {
    console.log(movie_id);
    navigate(`/movie/detail/${movie_id}`);
  };

  useEffect(() => {
    fetchData();
  }, [SearchedMovies]);
  return (
    <div className="min-h-screen px-8 py-8">
      <div className="grid grid-cols-5 gap-4 mx-auto">
        {SearchedMovies.map((movie) => (
          <div
            className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-blue-100 hover:border-blue-600 opacity-90 transition duration-300 transform hover:-translate-y-1 hover:scale-105"
            onClick={() => movieDetail(movie.movie_id)}
            key={movie.movie_id}
          >
            <img
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : `https://image.tmdb.org/t/p/original/qzMYKnT4MG1d0gnhwytr4cKhUvS.jpg`
              } //not the real path wed use but it works!
              alt=""
              className="object-cover h-auto"
            />
            <div className="p-4">
              <div className="text-2xl font-bold">{movie.title}</div>
              <div className="mt-2">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  ></svg>
                  <span className="mr-auto text-lg text-gray-600">
                    Rating: {movie.vote_average.toFixed(1)} &#x2B50;
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
