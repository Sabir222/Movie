import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
const key = "6efb5e9d888376f927bb1ed22dbe4752";
const url = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w500/";

interface IData {
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  id: number;
}

interface IResponse {
  results: IData[];
}
//adding a comment for test
const Test = () => {
  //state variables
  const [title, setTitle] = useState<IData[]>([]);
  const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [searchResults, setSearchResult] = useState<IData[]>([]);

  //fetching Trending movies data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<IResponse>(
          `${url}/trending/movie/day?api_key=${key}&language=en-US&page=1`
        );
        setTitle(result.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    void fetchData();
  }, []);
  //Rendering the trending movie data

  const MovieJsx = () => {
    return title.slice(0, 12).map((movie, key) => {
      return (
        <Link to={`/movie/${movie.id}`} key={key}>
          <div className="flex-col items-center justify-center">
            <div className="h-[260px] w-[220px] ring-4 ring-gray-950 relative overflow-hidden group cursor-pointer ">
              <div>
                <img
                  src={imageUrl + movie.poster_path}
                  alt=""
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:rotate-0 group-hover:scale-125"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-back/70 group-hover:via-black/70 group-hover:to-black/90 "></div>
              <div className="absolute inset-0 flex-col items-center justify-center px-4 text-center translate-y-[100%] group-hover:translate-y-0 transition-all duration-700">
                <h1 className="text-2xl font-bold text-white">
                  Rating: {movie.vote_average}
                </h1>
                <button className="bg-green-400">ADD to list</button>
                <br />
                <button className="bg-red-400">Details</button>
              </div>
            </div>
            <div>
              <h1 className="pt-2 text-center max-w-[220px] truncate text-gray-950">
                {movie.title}
              </h1>
              <h1 className="text-center max-w-[220px] text-gray-400 truncate">
                {movie.release_date}
              </h1>
            </div>
          </div>
        </Link>
      );
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmit(true);
  };
  //fetching search movie data , getting values from input
  useEffect(() => {
    const fetchSearch = async () => {
      if (isSubmit) {
        try {
          const result = await axios.get<IResponse>(
            `${url}/search/movie?query=${search}&api_key=${key}&page=1`
          );
          setSearchResult(result.data.results);
        } catch (err) {
          console.error(err);
        }
      }
    };
    if (isSubmit) {
      void fetchSearch();
    }
  }, [isSubmit, search]);
  //rendering search results
  const searchJsx = () => {
    return searchResults.map((movie) => {
      //this better way to store data compared to the first method because it allow to set default value is data comes null.
      const { title, vote_average, poster_path, release_date } = movie;
      const movieTitle = title || "Unknown Title";
      const movieRating = vote_average || "N/A";
      const moviePoster = poster_path
        ? imageUrl + poster_path
        : "/public/NO-MOVIE-POSTERS-EDITED.jpg";
      const movieReleaseDate = release_date || "Unknown Release Date";
      return (
        <div key={key} className="flex-col items-center justify-center">
          <div className="h-[260px] w-[220px] ring-4 ring-gray-950 relative overflow-hidden group cursor-pointer ">
            <div>
              <img
                src={moviePoster}
                alt=""
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:rotate-0 group-hover:scale-125"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-back/70 group-hover:via-black/70 group-hover:to-black/90 "></div>
            <div className="absolute inset-0 flex-col items-center justify-center px-4 text-center translate-y-[100%] group-hover:translate-y-0 transition-all duration-700">
              <h1 className="text-2xl font-bold text-white">
                Rating : {movieRating}
              </h1>
              <button className="bg-green-400">ADD to list</button>
              <br />
              <button className="bg-red-400">Details</button>
            </div>
          </div>
          <div>
            <h1 className="pt-2 text-center max-w-[220px] truncate text-gray-950">
              {movieTitle}
            </h1>
            <h1 className="text-center max-w-[220px] text-gray-400 truncate">
              {movieReleaseDate}
            </h1>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full pb-32 ">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center py-20"
        >
          <div className="relative flex items-center gap-4">
            <AiOutlineSearch className="absolute w-8 ml-2 h-9" />
            <input
              required
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => setIsSubmit(false)}
              type="text"
              value={search}
              aria-label="Search movie"
              name="search"
              placeholder="Search for Movies..."
              className="bg-[#C4C4C4]  bg-contain py-2 pl-12 h-[45px] w-[270px]  text-lg font-bold placeholder-gray-500 text-black rounded-2xl border-none ring-4 ring-gray-950 focus:ring-gray-950 focus:ring-4   focus:outline-none lg:w-[800px]  lg:h-[70px] lg:text-3xl md:w-[550px] md:h-[55px] md:text-2xl sm:w-[400px] sm:h-[45px] sm:text-lg"
            />
            <button
              type="submit"
              className="bg-[#C4C4C4] rounded-full lg:h-[70px] lg:w-[70px] flex items-center justify-center ring-4 ring-gray-950 h-[45px] w-[45px]  md:w-[55px] md:h-[55px] active:bg-[#989696]"
            >
              <AiOutlineSearch className="w-6 h-6 pointer-events-none lg:w-10 lg:h-10 md:w-8 md:h-8" />
            </button>
          </div>
        </form>
        <div className="flex justify-center pb-10 text-5xl font-bold">
          <h1 className="text-decoration-underline">
            {isSubmit ? `Search result for : ${search} ` : "Trending now"}
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="grid items-center justify-center grid-cols-1 gap-10 item ite sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!isSubmit ? MovieJsx() : searchJsx()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
