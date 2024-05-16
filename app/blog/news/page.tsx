import LastNews from "@/app/components/blog/LastNews";
import { news } from "@/app/components/blog/data";
const NewsPage = () => {
  return (
    <div className='px-8'>
      <LastNews news={news} />
    </div>
  );
};

export default NewsPage;
