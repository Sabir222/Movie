import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineContacts,
  AiOutlineInfoCircle,
} from "react-icons/ai";
function Navbar() {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="bg-[#FFD9C0] fixed z-10 top-0 w-full border-b-4 border-gray-950 flex items-center h-12 pl-8 gap-16  /*2xl:justify-center*/ mx-auto">
      <div className="">
        <Link to="/">
          <svg
            className="w-10 text-[#367092] h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z" />
          </svg>
        </Link>
      </div>
      <ul className="hidden gap-16 pr-16 mr-auto text-2xl font-bold md:flex font-mukta ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
      </ul>
      <div onClick={handleNav} className="pr-4 ml-auto md:hidden">
        {nav ? (
          <AiOutlineMenu className="text-[#367092]" size={40} />
        ) : (
          <AiOutlineClose className="text-[#367092]" size={40} />
        )}
      </div>

      <div
        className={
          !nav
            ? " md:hidden border-r-2 z-50 border-gray-950 font-bold text-5xl h-full flex-col gap-16 font-mukta  bg-[#FFD9C0] fixed top-0 left-0  w-[41%]   ease-in-out duration-300"
            : "fixed left-[-100%] "
        }
      >
        <div className="flex items-center gap-10 p-4 pb-16 border-b-8 border-gray-950">
          <a href="/" className="">
            <svg
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z" />
            </svg>
          </a>
        </div>

        <ul className="flex-col">
          <li className="p-4 text-2xl border-b-2 border-gray-950">
            <Link to="/">
              <AiOutlineHome className="inline-block text-[#367092] mr-4 align-text-center" />
              Home
            </Link>
          </li>
          <li className="p-4 text-2xl border-b-2 border-gray-950">
            <Link to="/Contact">
              <AiOutlineContacts className="inline-block text-[#367092] mr-4 align-text-center" />
              Contact
            </Link>
          </li>
          <li className="p-4 text-2xl border-b-2 border-gray-950">
            <Link to="/About">
              <AiOutlineInfoCircle className="inline-block text-[#367092] mr-4 align-text-center" />
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
