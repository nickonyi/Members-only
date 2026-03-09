function HeroBar() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Welcome to <span className="text-rose-600">Innercircles</span>
      </h1>
      <div className="text-gray-600 text-lg max-w-2xl mx-auto">
        Create circles. Share ideas. See the real people behind posts — only
        within your circles.
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <button className="text-white cursor-pointer bg-black py-2 px-4 font-normal text-base rounded-md">
          Create Account
        </button>
        <button className="py-2 px-4 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-300">
          Log In
        </button>
      </div>
    </section>
  );
}

export default HeroBar;
