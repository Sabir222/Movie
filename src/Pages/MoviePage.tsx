import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
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
  //fetching movie data
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
        <div className="flex flex-col ">
          {" "}
          <div className="flex items-center gap-2 pb-2" key={key}>
            <img
              src={`${imageUrl2}${movie.profile_path}`}
              alt=""
              className="object-cover w-10 h-10 rounded-full"
            />
            <h1>
              {movie.name}{" "}
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
        const result =
          await axios.get<IresReview>(`${url}/movie/${id}/reviews?api_key=${key}&language=en-US
`);
        setReviews(result.data.results);
      }
    };
    void fetchReviews();
  }, [id]);

  const reviewJsx = () => {
    return reviews.slice(0, 10).map((review) => {
      return (
        <div>
          <h1 className="pb-2 text-lg">
            Reviewed by
            <span className="font-extrabold text-gray-500 underline">
              {review.author}
            </span>
          </h1>
          <h1 className="pb-2">Rating : {review.author_details.rating}/10</h1>
          <p className="pb-2">{review.content}</p>
          <hr className="pb-2 font-bold border-t border-gray-700" />
        </div>
      );
    });
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col  min-h-screen  max-w-[1924px]">
        <div className="relative h-[400px] rounded-bl-[60px] shadow-2xl overflow-hidden rounded-br-[60px] ">
          <img
            src={`${imageUrl}${movieData[0]?.backdrop_path}`}
            className="object-cover w-full h-full "
          />
          <button className="absolute bottom-0 right-0 m-5 transition-colors duration-300 ring-1 active:bg-[#a5c199]  ring-black bg-[#CCEEBC] p-4 font-bold rounded-2xl  sm:px-7 sm:py-4 sm:text-2xl md:px-7 md:py-5 md:text-3xl">
            Trailer
          </button>
        </div>
        <div className="flex flex-col items-start gap-3 px-3 py-6 md:flex-row lg:px-[10%]">
          <div className="md:order-1 order-2 md:w-[75%]">
            <div className="flex justify-center pb-2">
              <h1>Plot Summary</h1>
            </div>
            <div className="  w-full  ring-1 ring-gray-950 p-2 rounded-2xl bg-[#8CC0DE] shadow-lg">
              <p>{movieData[0]?.overview}</p>
            </div>
          </div>

          <div className=" ring-1 order-1 md:w-[25%] md:order-1 shadow-lg ring-gray-950 p-4 rounded-2xl bg-[#8CC0DE] w-full">
            <h1 className="text-lg font-bold">Top cast</h1>
            <hr className="pb-2 font-bold border-t border-gray-700" />

            <div>{castJsx()}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="pb-4 text-2xl">Movie Reviews</h1>
        </div>
        <div className="px-3 pb-11 lg:px-[10%]">
          <div className="ring-1 shadow-lg ring-gray-950 p-4 rounded-2xl bg-[#8CC0DE] px-4">
            {reviewJsx()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default MoviePage;
