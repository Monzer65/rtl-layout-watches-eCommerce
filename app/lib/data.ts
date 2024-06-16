import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";
import { Customer } from "./definitions";

let client: MongoClient;
let db: Db;
let col: Collection;

export async function init(collection: string) {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("fakeData");
    col = db.collection(collection);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database!");
  }
}

export async function getProducts() {
  try {
    if (!col) await init("products");
    const result = await col.find({}).limit(10).toArray();
    return { products: result };
  } catch (error) {
    return { error: "failed to catch products" };
  }
}

export async function fetchCustomers(
  query: string,
  currentPage: number,
  pageSize: number
) {
  noStore();

  try {
    if (!col) await init("users");

    const skip = (currentPage - 1) * pageSize;
    const searchQuery = query
      ? {
          $or: [
            { username: { $regex: new RegExp(query, "i") } },
            { email: { $regex: new RegExp(query, "i") } },
            // Add more fields here if needed
          ],
        }
      : {};

    const totalCount = await col.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);

    const result = await col
      .find(searchQuery)
      .project({ password: 0, refreshToken: 0 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    // Convert ObjectId to string for _id in each customer
    const customers = result.map((customer) => ({
      ...customer,
      _id: customer._id.toString(), // Convert ObjectId to string
    }));

    return { customers, totalPages };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { error: "Failed to fetch customers" };
  }
}

export async function fetchCustomerById(id: string) {
  noStore();

  try {
    if (!col) await init("users");
    const result = await col.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );

    if (result) {
      const customer: Customer = {
        _id: result._id.toString(),
        username: result.username,
        email: result.email,
        address: result.address,
        roles: result.roles,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
      return { customer };
    } else {
      return { error: "Failed to fetch customer" };
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
    return { error: "Failed to fetch customer" };
  }
}
