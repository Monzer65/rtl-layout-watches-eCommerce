import { getProducts } from "@/app/lib/data";

const AdminStorePage = async () => {
  const data = await getProducts();

  return (
    <div>
      StorePage
      {data.products && <p>{data.products[0].name}</p>}
    </div>
  );
};

export default AdminStorePage;
