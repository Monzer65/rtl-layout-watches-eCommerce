import Carousel from "@/app/components/store/products/Carousel";
import BasicInfo from "@/app/components/store/products/productDetail/BasicInfo";
import DetailInfo from "@/app/components/store/products/productDetail/DetailInfo";
import RatingInfo from "@/app/components/store/products/productDetail/RatingInfo";
import ReviewButton from "@/app/components/store/products/productDetail/ReviewButton";
import ReviewForm from "@/app/components/store/products/productDetail/ReviewForm";
import Reviews from "@/app/components/store/products/productDetail/Reviews";
import { products, reviews } from "@/app/data";
import { Suspense } from "react";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = products.find(({ id }) => id === Number(params.id));
  const relatedReviews: {
    id: number;
    username: string;
    productId: number;
    comment: string;
    rating: number;
  }[] = reviews.filter((review) => review.productId === product?.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className='px-8'>
      <div className='grid md:flex justify-center gap-4'>
        <Carousel images={product?.images} />
        <BasicInfo
          id={product.id}
          title={product?.title}
          shortDesc={product?.shortDesc}
          price={product?.price}
        />
      </div>
      <div className='my-4'>
        <h3 className='font-bold text-2xl'>توضیحات</h3>
        <p>{product?.longDesc}</p>
      </div>
      <div className='my-4'>
        <DetailInfo
          brand={product?.brand}
          model={product?.model}
          caseSize={product?.caseSize}
          caseShape={product?.caseShape}
          caseMaterial={product?.caseMaterial}
          caseColor={product?.caseColor}
          bandMaterial={product?.bandMaterial}
          bandColor={product?.bandColor}
          dialColor={product?.dialColor}
          movement={product?.movement}
          waterResistance={product?.waterResistance}
        />
      </div>

      <div className='my-4 bg-gray-100 text-center py-4 px-8' id='rating'>
        <RatingInfo />
      </div>
      <div className='my-4'>
        <Suspense fallback={<p>loading reviews...</p>}>
          <Reviews relatedReviews={relatedReviews} />
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
