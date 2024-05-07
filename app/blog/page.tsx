// import { getMovies } from "../data";

// async function fetchMovies() {
//   const { movies } = await getMovies();
//   if (!movies) throw new Error("failed to fetch movies");
//   return movies;
// }

const Blog = async () => {
  // const movies = await fetchMovies();

  return (
    <main>
      <ul>
        {/* {movies.map((movie: any, index: number) => {
          return <li key={index}>{movie.title}</li>;
        })} */}
        <li>Blog</li>
      </ul>
    </main>
  );
};

export default Blog;
