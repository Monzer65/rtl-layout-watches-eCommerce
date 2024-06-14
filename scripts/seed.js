import { MongoClient, ObjectId } from "mongodb";

const products = [
  {
    _id: new ObjectId(),
    name: "ساعت مچی مردانه",
    manufacturer: "شرکت کاسیو",
    manufacture_location: "ژاپن",
    brand: "کاسیو",
    model: "A158WA",
    gender: "مردانه",
    style: "کلاسیک دیجیتال",
    functions: ["آلارم", "تقویم", "لامپ ال ای دی", "کرنومتر"],
    compilation: "دست‌ساز",
    price: 4500000,
    sale_price: 4000000,
    description: "ساعت مچی مردانه نوستالژیک",
    stock: 15,
    reference: "REF12345",
    SKU: "SKU12345",
    EAN_UPC: "EAN1234512345",
    features: {
      movement: "کوارتز تک باتری",
      bezelMaterial: "رزین با پوشش کروم",
      bezelColor: "#d8dee9",
      caseMaterial: "رزین با پوشش کروم",
      caseColor: "#d8dee9",
      bandMaterial: "استیل ضدزنگ",
      bandColor: "#d8dee9",
      dialColor: "#000000",
      waterResistance: "3 اتمسفر",
      warranty: "2 سال",
    },
    specifications: {
      caseShape: "چهارگوش",
      caseDiameter: 33,
      caseThickness: 8,
      lugWidth: 18,
      weight: 48,
    },
    availability: true,
    images: [
      "https://www.casio.com/content/dam/casio/product-info/locales/us/en/timepiece/product/watch/A/A1/A15/A158WA-1/assets/A158WA-1_Seq1.jpg.transform/main-visual-pc/image.jpg",
      "https://www.casio.com/content/dam/casio/product-info/locales/us/en/timepiece/product/watch/A/A1/A15/A158WA-1/assets/A158WA-1_square.jpg.transform/main-visual-pc/image.jpg",
    ],
    releaseDate: new Date("2024-05-20"),
    tags: ["مردانه", "کلاسیک"],
    reviews: [
      {
        userId: new ObjectId(),
        rating: 4,
        comment: "ساعت بسیار زیبا و با کیفیتی است",
        date: new Date("2024-05-21"),
      },
    ],
    createdAt: new Date("2024-05-19"),
    updatedAt: new Date("2024-05-19"),
  },
];

async function seedDB() {
  const uri =
    "mongodb+srv://mywatchesshopproject:vmAISutvZsZyMas6@watches-shop.98um8sy.mongodb.net/?retryWrites=true&w=majority&appName=watches-shop";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("fakeData").collection("products");

    await collection.drop();

    await collection.insertMany(products);
    console.log("Database seeded with product data! :)");

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
