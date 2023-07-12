import axios from "axios";

const key = "6efb5e9d888376f927bb1ed22dbe4752";
const url = "https://api.themoviedb.org/3";

interface IData {
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

interface IResponse {
  results: IData[];
}

export const fetchTrendingMovies = async (): Promise<IData[]> => {
  try {
    const response = await axios.get<IResponse>(
      `${url}/trending/movie/day?api_key=${key}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const fetchSearchResults = async (query: string) => {
  try {
    const response = await axios.get<IResponse>(
      `${url}/search/movie?query=${query}&api_key=${key}&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
