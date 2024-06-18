export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

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
  rating: number;
  comment: string;
  date: Date;
};

export type Product = {
  _id: string;
  name: string;
  manufacturer: string;
  manufacture_location: string;
  brand: string;
  model: string;
  gender: string;
  style: string;
  functions: string[];
  compilation: string;
  price: number;
  sale_price: number;
  description: string;
  stock: number;
  reference: number;
  SKU: string;
  EAN_UPC: string;
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
