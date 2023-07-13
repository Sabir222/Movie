import Footer from "../components/Footer";

function Contact() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 px-3">
        <h1 className="text-4xl">Contact us</h1>
        <div className="container max-w-lg p-3 px-3 mt-9 bg-[#8CC0DE] ring-4 ring-gray-950">
          <form>
            <input
              type="text"
              className="w-full px-4 py-3 mb-2 border"
              placeholder="full Name"
            />
            <input
              type="email"
              className="w-full px-4 py-3 mb-2 border"
              placeholder="Email"
            />
            <textarea
              name=""
              id=""
              placeholder="Contact us"
              cols={30}
              rows={10}
              className="w-full px-4 py-3 mb-2 border"
            ></textarea>
            <button
              type="submit"
              className="w-[160px] bg-[#CCEEBC] text-white ring-1 ring-gray-950 py-3"
            >
              send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
