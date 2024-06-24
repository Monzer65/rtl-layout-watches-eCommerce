import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "./dbConnection";
import { unstable_noStore as noStore } from "next/cache";
import { Invoice, ItemInInvoice } from "./definitions";

let client: MongoClient;
let db: Db;
let col: Collection;

export async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("fakeData");
    col = db.collection("invoices");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database!");
  }
}

export async function fetchInvoices(
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
            { invoiceNumber: { $regex: new RegExp(query, "i") } },
            { "customer.name": { $regex: new RegExp(query, "i") } },
            { transactionId: { $regex: new RegExp(query, "i") } },
          ],
        }
      : {};

    const totalCount = await col.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);

    const result = await col
      .find(searchQuery)
      .project({ paymentMethod: 0, transactionId: 0 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    // Convert ObjectId to string for _id in each invoice
    const invoices = result.map((invoice) => ({
      ...invoice,
      _id: invoice._id.toString(),
      customer: {
        ...invoice.customer,
        customerId: invoice.customer.customerId.toString(),
      },
      items: invoice.items.map((item: ItemInInvoice) => ({
        ...item,
        productId: item.productId.toString(),
      })),
    }));

    return { invoices, totalPages };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return { error: "Failed to fetch invoices" };
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();

  try {
    if (!col) await init();
    const result = await col.findOne({ _id: new ObjectId(id) });

    if (result) {
      const invoice: Invoice = {
        _id: result._id,
        invoiceNumber: result.invoiceNumber,
        customer: result.customer,
        items: result.items,
        subtotal: result.subtotal,
        tax: result.tax,
        total: result.total,
        paymentStatus: result.paymentStatus,
        paymentMethod: result.paymentMethod,
        transactionId: result.transactionId,
        invoiceDate: result.invoiceDate,
        dueDate: result.dueDate,
        updatedAt: result.updatedAt,
        notes: result.notes,
      };
      return { invoice };
    } else {
      return { error: "Failed to fetch invoice" };
    }
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return { error: "Failed to fetch invoice" };
  }
}
