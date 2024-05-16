import { news } from "@/app/components/blog/data";
import Image from "next/image";

const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  const item = news.find(({ id }) => id === Number(params.id));

  if (!item) {
    return <div>Article not found</div>;
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8'>
      <div className='mb-6'>
        <Image src={item.image} alt={item.title} className='rounded-lg' />
      </div>
      <div className='mb-4'>
        <h1 className='text-4xl font-bold mb-2'>{item.title}</h1>
        <p className='text-gray-600 text-sm'>{item.dateCreated}</p>
      </div>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold mb-3'>توسط: {item.author}</h2>
        <p className='text-gray-800 leading-relaxed'>{item.longDesc}</p>
      </div>
    </div>
  );
};

export default NewsDetailPage;
