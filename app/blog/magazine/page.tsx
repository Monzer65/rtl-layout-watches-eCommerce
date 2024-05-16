import TopMagzine from "@/app/components/blog/TopMagzine";
import { magazines } from "@/app/components/blog/data";
const MagazinePage = () => {
  return (
    <div className='px-8'>
      <TopMagzine magazines={magazines} />
    </div>
  );
};

export default MagazinePage;
