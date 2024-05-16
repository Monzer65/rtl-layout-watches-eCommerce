// import { getMovies } from "../data";

import LastNews from "../components/blog/LastNews";
import TopMagzine from "../components/blog/TopMagzine";
import { magazines, news } from "@/app/components/blog/data";
// async function fetchMovies() {
//   const { movies } = await getMovies();
//   if (!movies) throw new Error("failed to fetch movies");
//   return movies;
// }

const Blog = async () => {
  // const movies = await fetchMovies();

  return (
    <main className='px-8'>
      {/* <ul> */}
      {/* {movies.map((movie: any, index: number) => {
          return <li key={index}>{movie.title}</li>;
        })} */}
      {/* <li>Blog</li>
      </ul> */}

      <TopMagzine magazines={magazines} />
      <div className='my-16 mx-auto border-t max-w-[800px]'></div>
      <LastNews news={news} />
    </main>
  );
};

export default Blog;
