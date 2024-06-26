import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";

let client: MongoClient;
let db: Db;
let invoiceCol: Collection;
let customerCol: Collection;
let productCol: Collection;

export async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("fakeData");
    invoiceCol = db.collection("invoices");
    customerCol = db.collection("users");
    productCol = db.collection("products");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database!");
  }
}

export async function fetchMonthlyRevenues() {
  noStore();
  try {
    if (!invoiceCol) await init();

    const result = await invoiceCol
      .aggregate([
        {
          $match: { paymentStatus: "paid" },
        },
        {
          $group: {
            _id: {
              year: { $year: "$invoiceDate" },
              month: { $month: "$invoiceDate" },
            },
            totalRevenue: { $sum: "$total" },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ])
      .toArray();

    // Format the result
    const revenues = result.map((item) => ({
      month: `${item._id.year}-${item._id.month}`,
      totalRevenue: item.totalRevenue,
    }));

    return revenues;
  } catch (error) {
    console.error("Error fetching monthly revenues:", error);
    return { error: "Failed to fetch monthly revenues" };
  }
}

export async function fetchCardData() {
  try {
    if (!invoiceCol || !productCol || !customerCol) await init();

    const invoiceCountPromise = invoiceCol.countDocuments();
    const customerCountPromise = customerCol.countDocuments();
    const productCountPromise = productCol.countDocuments();
    const invoiceStatusPromise = invoiceCol
      .aggregate([
        {
          $group: {
            _id: null,
            totalPaidInvoices: {
              $sum: {
                $cond: [{ $eq: ["$paymentStatus", "paid"] }, "$total", 0],
              },
            },
            totalPendingInvoices: {
              $sum: {
                $cond: [{ $eq: ["$paymentStatus", "pending"] }, "$total", 0],
              },
            },
          },
        },
      ])
      .toArray();

    const [
      numberOfInvoices,
      numberOfCustomers,
      numberOfProducts,
      invoiceStatus,
    ] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      productCountPromise,
      invoiceStatusPromise,
    ]);

    const { totalPaidInvoices, totalPendingInvoices } = invoiceStatus[0] || {
      totalPaidInvoices: 0,
      totalPendingInvoices: 0,
    };

    return {
      numberOfInvoices,
      numberOfCustomers,
      numberOfProducts,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}
