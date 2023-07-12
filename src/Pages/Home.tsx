// import Cards from "../components/Cards";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Test from "../components/Test";

function Home() {
  return (
    <div>
      <div className="min-h-screen ">
        <Hero />
        {/* <Test/> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
