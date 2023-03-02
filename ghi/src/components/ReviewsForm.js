import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./useToken";

export default function ReviewsForm() {
  const { token } = useAuthContext();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("")

  const fetchData = async () => {
    const user = localStorage.getItem("username")
    setUsername(user)
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/movie/${id}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    const movie = await response.json();
    setTitle(movie);
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() =>{
    setReview({
          movie_id: id,
          display_name: username,
          rating: "",
          comments: "",
        })
  },[username])

  const navigate = useNavigate();
  const [review, setReview] = useState({
    movie_id: id,
    display_name: username,
    rating: "",
    comments: "",
  });

  // const [selectedMovieId, setSelectedMovieId] = useState("");

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setReview((review) => ({
      ...review,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setUsername(props.username)

    const reviewUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/reviews/create`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };
    const response = await fetch(reviewUrl, fetchConfig);

    try {
      if (response.ok) {
        setReview({
          movie_id: id,
          display_name: username,
          rating: "",
          comments: "",
        });
        navigate("/reviews/list");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="container mx-auto flex items-center py-4 justify-center">
        <div className="text-white font-Open Sans text-[50px]">
          Share a Reel Review
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-10"
      >
        <h1 className="text-3xl font-bold mb-6">{title.title}</h1>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="display_name"
          >
            Username
          </label>
          <div
            className=" appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >{username}</div>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <label className="block text-gray-700 font-bold mb-2" for="rating">
            Rating
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rating"
            type="number"
            step={0.1}
            name="rating"
            placeholder="5"
            min={1}
            max={10}
            value={review.rating}
            onChange={handleReviewChange}
          />
        </div>
        <div className="w-full md:w-full mb-6">
          <label className="block text-gray-700 font-bold mb-2" for="comments">
            Comments
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="comments"
            placeholder="What are your thoughts?"
            name="comments"
            value={review.comments}
            onChange={handleReviewChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-center w-60">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
