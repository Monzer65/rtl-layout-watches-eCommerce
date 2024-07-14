import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import Carousel from "@/app/components/store/products/Carousel";
import BasicInfo from "@/app/components/store/products/productDetail/BasicInfo";
import DetailInfo from "@/app/components/store/products/productDetail/DetailInfo";
import RatingInfo from "@/app/components/store/products/productDetail/RatingInfo";
import ReviewButton from "@/app/components/store/products/productDetail/ReviewButton";
import ReviewForm from "@/app/components/store/products/productDetail/ReviewForm";
import Reviews from "@/app/components/store/products/productDetail/Reviews";
import { reviews } from "@/app/data";
import { getProductById } from "@/app/lib/data_products";
import { Product } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const data = await getProductById(params.id);
  const product = data.product as Product;
  // const relatedReviews: {
  //   id: string;
  //   username: string;
  //   productId: number;
  //   comment: string;
  //   rating: number;
  // }[] = reviews.filter((review) => review.productId === product?.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className='px-8'>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "صفحه اصلی",
            href: "/store",
            icon: <HomeIcon />,
          },
          {
            label: "محصولات",
            href: `/store/products`,
          },
          {
            label: `${product.name}`,
            href: `/admin-area/store/products/${product._id}`,
            active: true,
          },
        ]}
      />
      <div className='grid md:flex justify-center gap-4'>
        <Carousel images={product.images} />
        <BasicInfo
          _id={product._id}
          image={product.images[0]}
          title={product?.name}
          shortDesc={product?.short_description}
          price={product?.price}
        />
      </div>
      <div className='my-4'>
        <h3 className='font-bold text-2xl'>توضیحات</h3>
        <p>{product?.description}</p>
      </div>
      <div className='my-4'>
        <DetailInfo
          brand={product?.brand}
          model={product?.model}
          caseDiameter={product?.specifications.caseDiameter}
          caseShape={product?.specifications.caseShape}
          caseThickness={product?.specifications.caseThickness}
          caseMaterial={product?.features.caseMaterial}
          caseColor={product?.features.caseColor}
          bandMaterial={product?.features.bandMaterial}
          bandColor={product?.features.bandColor}
          dialColor={product?.features.dialColor}
          movement={product?.features.movement}
          waterResistance={product?.features.waterResistance}
        />
      </div>

      <div className='my-4 bg-gray-100 text-center py-4 px-8' id='rating'>
        <RatingInfo />
      </div>
      <div className='my-4'>
        <Suspense fallback={<p>loading reviews...</p>}>
          <Reviews reviews={product.reviews} />
        </Suspense>

        <div id='comment-section' className='max-w-[600px]'>
          <h4 className='font-semibold text-lg mt-8 mb-4'>
            افزودن دیدگاه جدید
          </h4>
          <ReviewForm />
        </div>
      </div>
      <Suspense fallback={<p>loading products...</p>}>
        <p>محصولات مشابه ...</p>
      </Suspense>
    </main>
  );
};

export default ProductDetail;
