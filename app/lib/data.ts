import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";
import { Customer } from "./definitions";
import { cookies } from "next/headers";
import { encrypt, encryptRefresh } from "./auth";

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
      ? { name: { $regex: new RegExp(query, "i") } }
      : {};

    const totalCount = await col.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);

    const result = await col
      .find(searchQuery)
      .project({ password: 0 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return { customers: result, totalPages };
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
        name: result.name,
        email: result.email,
        address: result.address,
        roles: result.roles,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
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

export async function getRefreshToken(refreshToken: string) {
  noStore();
  // const refreshToken = cookies().get("refreshToken")?.value;
  console.log(refreshToken);
  // if (!refreshToken) {
  //   return new Response(
  //     JSON.stringify({ error: "No Refresh Cookie Provided!" }),
  //     { status: 401 }
  //   );
  // }

  try {
    if (!col) await init("users");
    const user = await col.findOne({ refreshToken: { $in: [refreshToken] } });

    console.log(user);

    if (!user) {
      const decoded = await encryptRefresh(refreshToken);
      if (!decoded) {
        return new Response(
          JSON.stringify({ error: "Invalid Refresh Token" }),
          { status: 403 }
        );
      }

      const isCompromised = await col.findOne({
        username: decoded.payload.username,
      });
      if (isCompromised) {
        isCompromised.refreshToken = [];
        await col.updateOne(
          { _id: isCompromised._id },
          { $set: isCompromised }
        );
      }

      return new Response(JSON.stringify({ error: "Unauthorized Access!" }), {
        status: 403,
      });
    }

    const decoded = await encryptRefresh(refreshToken);
    if (!decoded?.payload || user.username !== decoded?.payload.username) {
      return new Response(JSON.stringify({ error: "Forbidden!" }), {
        status: 403,
      });
    }

    const accessToken = await encrypt({
      username: decoded?.payload.username,
      roles: Object.values(user.roles),
    });

    const newRefreshToken = await encryptRefresh(user);

    user.refreshToken = user.refreshToken
      .filter((rt: string) => rt !== refreshToken)
      .concat(newRefreshToken);
    await col.updateOne({ _id: user._id }, { $set: user });

    cookies().set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: "/",
    });

    return new Response(JSON.stringify({ accessToken }), { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
