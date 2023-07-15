import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import MoviePage from "./Pages/MoviePage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="movie/Contact" element={<Contact />} />
        <Route path="movie/About" element={<About />} />
        <Route path="/movie" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />

      </Routes>
    </>
  );
}

export default App;
