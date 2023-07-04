import { useEffect, useRef, useState } from "react";
// import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div
          className="lg:w-1/4 w-full flex flex-col items-center p-8 bg-slate-400 text-slate-800 font-semibold gap-y-4 rounded-xl"
          key={i}>
          <div className="lg:h-[50px] text-center">{movie.title}</div>
          <img
            className="lg:w-[350px] lg:h-[500px] rounded-lg"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt="gambar"
          />
          <div className="Movie-date">Release : {movie.release_date}</div>
          <div className="Movie-rate">Rating : {movie.vote_average}</div>
          <div>{movie.overview}</div>
        </div>
      );
    });
  };

  console.log(popularMovies);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    } else if (q.length < 1) {
      getMovieList().then((result) => {
        setPopularMovies(result);
      });
    }
  };

  const searchRef = useRef();

  return (
    <div className="App">
      <header className={"w-full flex flex-col items-center gap-8 p-4 lg:p-16"}>
        <h1
          className={
            "lg:text-6xl font-bold font-sans text-white bg-slate-500 p-4 rounded-lg"
          }>
          My Movie Mania
        </h1>
        <h1 className={"text-xl font-bold text-slate-200"}>Testing</h1>
        <div className="w-full flex justify-center gap-2 px-8">
          <input
            placeholder="Search Film"
            className={"lg:w-1/2 p-4 text-xl rounded-xl"}
            // onChange={({ target }) => search(target.value)}
            ref={searchRef}
          />
          <button
            onClick={() => search(searchRef.current.value)}
            className="bg-teal-300 px-4 lg:px-8 rounded-2xl text-slate-700 font-bold lg:text-xl hover:bg-teal-600 hover:text-slate-300 active:bg-slate-600">
            Search
          </button>
        </div>
        <div className="w-full gap-y-8 flex flex-wrap lg:gap-16 justify-center">
          <PopularMoviesList />
        </div>
      </header>
    </div>
  );
};
// git add <file>
// git commit -m "jelasin apa yg kau ubah (conventional commit
// git push

// git branch <nama branch>
// git checkout <nama branch>
// git checkout -b <nama branch>

// git checkout <branch tujuan>
// git diff <nama branch tujuan> <nama branch asal>
// git merge <branch yg mau di merge>
export default App;
