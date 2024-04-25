import {
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center min-h-screen px-5 sm:px-14">
        <h1 className="text-5xl bg-[#CCEEBC] p-4 mb-4 rounded-md ring-4 ring-black">
          About me
        </h1>
        <div className="p-2 text-center md:p-10 ring-black md:text-3xl ring-4 bg-[#8CC0DE] rounded-xl md:w-[720px]">
          Hello, I'm <span className="text-[#CCEEBC]">Imam KOUTABI</span>, a
          self-taught developer with a passion for becoming a great full-stack
          developer. Welcome to my website! Using the powerful combination of
          <span>
            {" "}
            Tailwindcss
            <BiLogoTailwindCss className="inline align-middle" />
          </span>
          <span>
            , Reactjs
            <BiLogoReact className="inline align-middle" />
          </span>
          , and
          <span>
            Typescript
            <BiLogoTypescript className="inline align-middle" />
          </span>
          , I have crafted this website to practice my skills. While currently
          focused on the front-end, I have plans to expand and add backend
          features in the near future. Thank you for visiting and exploring my
          website.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
