import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";

let client: MongoClient;
let db: Db;
let products: Collection;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("fakeData");
    products = db.collection("products");
  } catch (error) {
    throw new Error("Failed to connect to database!");
  }
}

export async function getProducts() {
  try {
    if (!products) await init();
    const result = await products.find({}).limit(10).toArray();
    return { products: result };
  } catch (error) {
    return { error: "failed to catch products" };
  }
}

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  // ...
}
