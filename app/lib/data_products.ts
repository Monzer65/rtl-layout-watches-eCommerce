import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";
import { Product, Review } from "./definitions";

let client: MongoClient;
let db: Db;
let col: Collection;

export async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("fakeData");
    col = db.collection("products");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database!");
  }
}

export async function getProducts(
  query: string,
  currentPage: number,
  pageSize: number
) {
  noStore();

  try {
    if (!col) await init();

    const skip = (currentPage - 1) * pageSize;
    const searchQuery = query
      ? {
          $or: [
            { name: { $regex: new RegExp(query, "i") } },
            { brand: { $regex: new RegExp(query, "i") } },
            // Add more fields here if needed
          ],
        }
      : {};

    const totalCount = await col.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);

    const result = await col
      .find(searchQuery)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    // Convert ObjectIds to string for _id in each product and each review
    const products = result.map((product) => ({
      ...product,
      _id: product._id.toString(),
      reviews: product.reviews.map((review: Review) => ({
        ...review,
        userId: review.userId.toString(),
      })),
    }));

    return { products, totalPages };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { error: "Failed to fetch products" };
  }
}

export async function getProductById(id: string) {
  noStore();

  try {
    if (!col) await init();
    const result = await col.findOne({ _id: new ObjectId(id) });

    if (result) {
      const product: Product = {
        _id: result._id.toString(),
        name: result.name,
        SKU: result.SKU,
        manufacturer: result.manufacturer,
        manufacture_location: result.manufacture_location,
        brand: result.brand,
        model: result.model,
        gender: result.gender,
        style: result.style,
        functions: result.functions,
        compilation: result.compilation,
        price: result.price,
        buy_price: result.buy_price,
        sale_price: result.sale_price,
        short_description: result.short_description,
        description: result.description,
        stock: result.stock,
        features: {
          movement: result.features.movement,
          bezelMaterial: result.features.bezelMaterial,
          bezelColor: result.features.bezelColor,
          caseMaterial: result.features.caseMaterial,
          caseColor: result.features.caseColor,
          bandMaterial: result.features.bandMaterial,
          bandColor: result.features.bandColor,
          dialColor: result.features.dialColor,
          waterResistance: result.features.waterResistance,
          warranty: result.features.warranty,
        },
        specifications: {
          caseShape: result.specifications.caseShape,
          caseDiameter: result.specifications.caseDiameter,
          caseThickness: result.specifications.caseThickness,
          lugWidth: result.specifications.lugWidth,
          weight: result.specifications.weight,
        },
        availability: result.availability,
        images: result.images,
        releaseDate: result.releaseDate,
        tags: result.tags,
        reviews: result.reviews.map((review: Review) => {
          return {
            ...review,
            userId: review.userId.toString(),
          };
        }),
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
      return { product };
    } else {
      return { error: "Failed to fetch product" };
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return { error: "Failed to fetch product" };
  }
}
