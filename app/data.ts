import productImage from "@/public/images/sample.png";
import productImage_1 from "@/public/images/sample_1.jpg";
// import clientPromise from "./lib/dbConnection";
// import { Collection, Db, MongoClient } from "mongodb";

// let client: MongoClient;
// let db: Db;
// let movies: Collection;

// async function init() {
//   if (db) return;
//   try {
//     client = await clientPromise;
//     db = client.db("sample_mflix");
//     movies = db.collection("movies");
//   } catch (error) {
//     throw new Error("Failed to connect to database!");
//   }
// }

// export async function getMovies() {
//   try {
//     if (!movies) await init();
//     const result = await movies.find({}).limit(10).toArray();
//     return { movies: result };
//   } catch (error) {
//     return { error: "failed to catch movies" };
//   }
// }

export const products = [
  {
    id: 1,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage,
    images: [productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 2,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage,
    images: [productImage_1, productImage_1, productImage_1, productImage],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 3,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage,
    images: [productImage_1, productImage_1, productImage_1, productImage],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 4,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage,
    images: [productImage_1, productImage_1, productImage_1, productImage],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 5,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage,
    images: [productImage_1, productImage_1, productImage_1, productImage],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 6,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage,
    images: [productImage_1, productImage_1, productImage_1, productImage],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 7,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage,
    images: [productImage_1, productImage_1, productImage_1, productImage],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 8,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 9,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 10,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 11,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 12,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 13,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 14,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
  {
    id: 15,
    title: "Seiko model",
    shortDesc: "some short desc",
    longDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgSrc: productImage_1,
    images: [productImage, productImage, productImage, productImage_1],
    price: 250000,
    brand: "corresponding text",
    model: "corresponding text",
    caseSize: "corresponding text",
    caseShape: "corresponding text",
    caseMaterial: "corresponding text",
    caseColor: "corresponding text",
    bandMaterial: "corresponding text",
    bandColor: "corresponding text",
    dialColor: "corresponding text",
    movement: "corresponding text",
    waterResistance: "corresponding text",
  },
];

export const reviews = [
  {
    id: 1,
    username: "John Doe",
    productId: 1,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 2,
    username: "John Doe",
    productId: 2,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 3,
    username: "John Doe",
    productId: 3,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 4,
    username: "John Doe",
    productId: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 16,
    username: "John Doe",
    productId: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 3,
  },
  {
    id: 5,
    username: "John Doe",
    productId: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 6,
    username: "John Doe",
    productId: 6,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 7,
    username: "John Doe",
    productId: 7,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 8,
    username: "John Doe",
    productId: 8,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 9,
    username: "John Doe",
    productId: 9,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 10,
    username: "John Doe",
    productId: 10,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 11,
    username: "John Doe",
    productId: 11,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 12,
    username: "John Doe",
    productId: 12,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 13,
    username: "John Doe",
    productId: 13,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 14,
    username: "John Doe",
    productId: 14,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
  {
    id: 15,
    username: "John Doe",
    productId: 15,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
];
