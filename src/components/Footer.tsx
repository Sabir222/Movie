import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineYoutube,
} from "react-icons/ai";
function Footer() {
  const handleClick = () => {
    window.open("https://github.com/Sabir222/Movie");
  };
  return (
    <footer className=" w-full bg-[#FFD9C0] border-t-4 h-[30px] border-gray-950 flex items-center justify-between px-16 md:px-32">
      <div>
        <h1 className="text-[10px]">
          <span>&copy;</span> All rights reserved
        </h1>
      </div>
      <div className="flex gap-2">
        <button>
          <AiOutlineInstagram />
        </button>
        <button onClick={handleClick}>
          <AiOutlineGithub />
        </button>
        <button>
          <AiOutlineYoutube />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
