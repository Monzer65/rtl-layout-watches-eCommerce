const Product = {
  _id: "ObjectId",
  name: "String",
  manufacturer: "String",
  brand: "String",
  model: "String",
  reference: "String",
  gender: "Enum['Men', 'Women', 'Unisex']",
  style: "String",
  // function: ["String"],
  compilation: "String",
  price: "Number",
  sale_price: "Number",
  description: "String",
  stock: "Number",
  SKU: "String",
  EAN_UPC: "String",
  features: {
    movement: "Enum['Mechanical', 'Automatic', 'Quartz', 'Solar', 'Kinetic']",
    caseMaterial:
      "Enum['Stainless Steel', 'Leather', 'Gold', 'Titanium', 'Ceramic']",
    caseColor: "String",
    bandMaterial: "String",
    bandColor: "String",
    dialColor: "String",
    waterResistance: "String",
    warranty: "String",
  },
  specifications: {
    caseShape: "String",
    caseDiameter: "Number",
    caseThickness: "Number",
    lugWidth: "Number",
    weight: "Number",
  },
  availability: "Boolean",
  images: ["String"],
  releaseDate: "Date",
  tags: ["String"],
  reviews: [
    {
      userId: "ObjectId",
      rating: "Number",
      comment: "String",
      date: "Date",
    },
  ],

  createdAt: "Date",
  updatedAt: "Date",
};

const User = {
  _id: "ObjectId",
  name: "String",
  email: "String",
  password: "String",
  address: {
    street: "String",
    city: "String",
    state: "String",
    zipCode: "String",
    country: "String",
  },
  orderHistory: [
    {
      orderId: "ObjectId",
      date: "Date",
      total: "Number",
      status: "String",
    },
  ],
  createdAt: "Date",
  updatedAt: "Date",
};

const Order = {
  _id: "ObjectId",
  userId: "ObjectId",
  items: [
    {
      productId: "ObjectId",
      quantity: "Number",
      price: "Number",
    },
  ],
  total: "Number",
  status: "String",
  paymentMethod: "String",
  shippingAddress: {
    street: "String",
    city: "String",
    state: "String",
    zipCode: "String",
    country: "String",
  },
  createdAt: "Date",
  updatedAt: "Date",
};
