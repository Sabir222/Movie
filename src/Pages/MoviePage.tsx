import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
const key = "6efb5e9d888376f927bb1ed22dbe4752";
const url = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/original/";
const imageUrl2 = "https://image.tmdb.org/t/p/w200/";

interface IData {
  title: string;
  vote_average: number;
  release_date: string;
  budget: number;
  revenue: number;

  backdrop_path: string;
  overview: string;
}
interface ICast {
  name: string;
  character: string;
  profile_path: string;
}
interface IResponse {
  cast: ICast[];
}

interface IReview {
  author: string;
  content: string;
  author_details: {
    rating: number;
  };
}
interface IresReview {
  results: IReview[];
}

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieData, setMovieData] = useState<IData[]>([]);
  const [castData, setCastData] = useState<ICast[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [movieId, setMovieId] = useState<string>("");
  //fetching movie data

  console.log(id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        const result = await axios.get(
          `${url}/movie/${id}?api_key=${key}&language=en-US`
        );
        setMovieData([result.data]);
      }
    };
    void fetchMovieDetails();
  }, [id]);
  useEffect(() => {
    const fetchCast = async () => {
      if (id) {
        const result = await axios.get<IResponse>(
          `${url}/movie/${id}/credits?api_key=${key}&language=en-US`
        );
        setCastData(result.data.cast);
      }
    };
    void fetchCast();
  }, [id]);
  const castJsx = () => {
    return castData.slice(0, 6).map((movie, key) => {
      return (
        <div className="flex flex-col " key={key}>
          <div className="flex items-center gap-2 pb-2">
            <img
              src={
                movie.profile_path
                  ? `${imageUrl2}${movie.profile_path}`
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              // src={`${imageUrl2}${movie.profile_path}`}
              alt=""
              className="object-cover w-10 h-10 rounded-full"
            />
            <h1>
              {movie.name}
              <span className="font-extrabold text-gray-500 underline ">
                As {movie.character}
              </span>
            </h1>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (id) {
        setMovieId(id);
        const result =
          await axios.get<IresReview>(`${url}/movie/${id}/reviews?api_key=${key}&language=en-US
`);
        setReviews(result.data.results);
      }
    };
    void fetchReviews();
  }, [id]);

  const reviewJsx = () => {
    if (reviews.length === 0) {
      return <p className="text-center"> No reviews available yet</p>;
    }
    return reviews.slice(0, 10).map((review, key) => {
      return (
        <div key={key}>
          <h1 className="pb-2 text-lg">
            Reviewed by
            <span className="font-extrabold text-gray-500 underline">
              {review.author ?? "unknown"}
            </span>
          </h1>
          <h1 className="pb-2">
            Rating :{review.author_details.rating ?? "N/A"}
            /10
          </h1>
          <p className="pb-2">{review.content}</p>
          <hr className="pb-2 font-bold border-t border-gray-700" />
        </div>
      );
    });
  };

  return (
    <div>
      <div className="min-h-screen">
        <div className="flex items-start justify-center mb-10 md:px-2">
          <div className="  md:w-[700px] relative rounded-b-[100px] lg:w-[1000px] drop-shadow-xl ">
            {movieData[0]?.backdrop_path ? (
              <img
                src={`${imageUrl}${movieData[0]?.backdrop_path}`}
                className="object-cover  rounded-b-[100px]   w-full h-full "
              />
            ) : (
              <img
                src={`https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg`}
                className="object-cover  rounded-b-[100px] min-w-[600px]  w-full  h-[400px]"
              />
            )}

            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-0 right-0 m-10 transition-colors duration-300 ring-1 active:bg-[#819a76]  ring-black bg-[#CCEEBC] p-4 font-bold rounded-2xl  sm:px-7 sm:py-4 sm:text-2xl md:px-7 md:py-5 md:text-3xl"
            >
              Trailer
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="flex flex-col sm:flex-row gap-8 w-full  p-2 md:w-[700px] lg:w-[1000px] ">
            <div className=" order-2 sm:order-1 sm:w-[75%] ">
              <h1 className="pb-2 text-xl text-center bg-transparent">
                Summary
              </h1>
              <div className="p-2 text-center flex justify-center items-center bg-[#8CC0DE] rounded-lg drop-shadow-xl ring-4 ring-black min-h-[40px] ">
                {movieData[0]?.overview ? (
                  <p>{movieData[0]?.overview}</p>
                ) : (
                  <p>No summary Available</p>
                )}
              </div>
            </div>
            <div className="bg-[#CCEEBC] order-1 min-h-[40px] sm:order-2 sm:w-[25%] ring-4 rounded-lg p-2 ring-black drop-shadow-xl">
              <h1 className="text-lg font-bold">Top cast</h1>
              <hr className="pb-2 font-bold border-t border-gray-700" />

              <div>{castJsx()}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-2 mb-16 mt-9">
          <div className=" w-full p-2 md:w-[700px]  lg:w-[1000px] px-5 bg-[#8CC0DE] rounded-lg drop-shadow-xl ring-4 ring-black min-h-[40px]">
            {reviewJsx()}
          </div>
        </div>
      </div>

      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        selectedMovieId={movieId}
      />
      <Footer />
    </div>
  );
};
export default MoviePage;
