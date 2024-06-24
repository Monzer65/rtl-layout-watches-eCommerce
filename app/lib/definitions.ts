import { ObjectId } from "mongodb";

export type Customer = {
  _id: string;
  username: string;
  email: string;
  address: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Review = {
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: Date;
};

export type Product = {
  _id: string;
  name: string;
  SKU: string;
  manufacturer: string;
  manufacture_location: string;
  brand: string;
  model: string;
  gender: string;
  style: string;
  functions: string[];
  compilation: string;
  price: number;
  buy_price: number;
  sale_price: number;
  short_description: string;
  description: string;
  stock: number;
  features: {
    movement: string;
    bezelMaterial: string;
    bezelColor: string;
    caseMaterial: string;
    caseColor: string;
    bandMaterial: string;
    bandColor: string;
    dialColor: string;
    waterResistance: string;
    warranty: string;
  };
  specifications: {
    caseShape: string;
    caseDiameter: number;
    caseThickness: number;
    lugWidth: number;
    weight: number;
  };
  availability: boolean;
  images: string[];
  releaseDate: Date;
  tags: string[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
};

export type ItemInInvoice = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
export type CustomerInInvoice = {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: AddressInCustomerInInvoice;
};
export type AddressInCustomerInInvoice = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};
export type Invoice = {
  _id: ObjectId;
  invoiceNumber: string;
  customer: CustomerInInvoice;
  items: ItemInInvoice[];
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: string;
  transactionId: string;
  invoiceDate: Date;
  dueDate: Date;
  updatedAt: Date;
  notes: string;
};
