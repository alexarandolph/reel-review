import React, { useEffect, useState } from "react";
import { useAuthContext } from "./useToken";
import { useNavigate } from "react-router-dom";

export default function TrendingMovies() {
  const { token } = useAuthContext();
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/movies/trending`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    const trendingMovies = await response.json();
    setTrending(trendingMovies);
  };


  const movieDetail = (movie_id) => {
    navigate(`/movie/detail/${movie_id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen px-8 py-8 flex flex-col justify-center items-center h-full bg-gradient-to-r from-bg-dark-blue to-blue-900">
      <div
        className="container mx-auto flex items-center py-4 justify-center"
        style={{ marginTop: "-70px" }}
      >
        <div className="text-white font-Open Sans text-[50px]">
          Trending Movies
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mx-auto">
        {trending.map((movie) => (
          <div
            className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white hover:bg-blue-100 hover:border-blue-600 opacity-90 transition duration-300 transform hover:-translate-y-1 hover:scale-105"
            onClick={() => movieDetail(movie.movie_id)}
            key={movie.movie_id}
          >
            <img
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : `https://cdn.discordapp.com/attachments/1072228028589019256/1080656211952808006/dariokun.png`
              } //not the real path wed use but it works!
              alt=""
              className="h-1/2 object-cover lg:h-5/6"
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
