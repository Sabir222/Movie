import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
const apiKey = "6efb5e9d888376f927bb1ed22dbe4752";
const url = "https://api.themoviedb.org/3";

interface IModalProps {
  isVisible: boolean;
  selectedMovieId: string;
  onClose: () => void;
}
interface ITrailerProps {
  name: string;
  key: string;
}
interface IApiResponse {
  results: ITrailerProps[];
}
const Modal: React.FC<IModalProps> = ({
  isVisible,
  onClose,
  selectedMovieId,
}) => {
  const [trailer, setTrailer] = useState<ITrailerProps[]>([]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const result = await axios.get<IApiResponse>(
          `${url}/movie/${selectedMovieId}/videos?api_key=${apiKey}&language=en-US`
        );
        const officialTrailer = result.data.results.find(
          (trailer) => trailer.name === "Official Trailer"
        );
        if (officialTrailer) {
          setTrailer([officialTrailer]);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
    void fetchTrailer();
  }, [selectedMovieId]);

  console.log(trailer);

  if (!isVisible) return null;
  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 "
    >
      <div className=" w-[600px] flex flex-col">
        <button
          onClick={() => onClose()}
          className="text-xl text-white place-self-end"
        >
          X
        </button>
        <div className="p-5 rounded-md">
          {trailer[0] ? (
            <YouTube videoId={trailer[0].key} />
          ) : (
            <p className="p-10 text-center bg-white">No trailer available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
