import { Product } from "./models/Product";

const files = [
  {
    productURL: "/images/phones.jpg",
    productName: "REDMI 15C",
    price: `17000`,
  },
  {
    productURL: "/images/shirt3.jpg",
    productName: "GUCCI deep blue long sleeves shirt",
    price: `15`,
  },
  {
    productURL: "/images/sneakers.png",
    productName: "Men Sneakers",
    price: `30`,
  },
  {
    productURL: "/images/sneakers.png",
    productName: "Men Sneakers",
    price: `30`,
  },
  {
    productURL: "/images/shirt3.jpg",
    productName: "GUCCI deep blue long sleeves shirt",
    price: `15`,
  },
  {
    productURL: "/images/sneakers.png",
    productName: "Men Sneakers",
    price: `30`,
  },
  {
    productURL: "/images/wrist-watch.png",
    productName: "URREN Wristwatch",
    price: `50`,
  },
  {
    productURL: "/images/shirt3.jpg",
    productName: "GUCCI deep blue long sleeves shirt",
    price: `15`,
  },
  {
    productURL: "/images/wrist-watch.png",
    productName: "URREN Wristwatch",
    price: `50`,
  },
  {
    productURL: "/images/wrist-watch.png",
    productName: "URREN Wristwatch",
    price: `50`,
  },
  {
    productURL: "/images/thick2.jpg.jpg",
    productName: "NABLACK jacket",
    price: `73`,
  },
  {
    productURL: "/images/thick2.jpg.jpg",
    productName: "NABLACK jacket",
    price: `73`,
  },
  {
    productURL: "/images/thick2.jpg.jpg",
    productName: "NABLACK jacket",
    price: `73`,
  },
  {
    productURL: "/images/phones.jpg",
    productName: "REDMI 15C",
    price: `17000`,
  },
  {
    productURL: "/images/white-sneakers.jpg",
    productName: "Unisex white sneakers",
    price: `35`,
  },
  {
    productURL: "/images/white-sneakers.jpg",
    productName: "Unisex white sneakers",
    price: `35`,
  },
  {
    productURL: "/images/lifestyle-fashion-sneakers.jpg",
    productName: "Lifestyle Fashion Sneakers",
    price: `71`,
  },
  {
    productURL: "/images/white-sneakers.jpg",
    productName: "Unisex white sneakers",
    price: `35`,
  },
  {
    productURL: "/images/still-life-tech-device.jpg",
    productName: "Portable Airpod",
    price: `69`,
  },
  {
    productURL: "/images/still-life-tech-device.jpg",
    productName: "Portable Airpod",
    price: `69`,
  },
  {
    productURL: "/images/still-life-tech-device.jpg",
    productName: "Portable Airpod",
    price: `69`,
  },
  {
    productURL: "/images/lifestyle-fashion-sneakers.jpg",
    productName: "Lifestyle Fashion Sneakers",
    price: `71`,
  },
  {
    productURL: "/images/lifestyle-fashion-sneakers.jpg",
    productName: "Lifestyle Fashion Sneakers",
    price: `71`,
  },
  {
    productURL: "/images/joggers.jpg.jpg",
    productName: "Men Joggers",
    price: `35`,
  },
  {
    productURL: "/images/joggers.jpg.jpg",
    productName: "Men Joggers",
    price: `35`,
  },
  {
    productURL: "/images/joggers.jpg.jpg",
    productName: "Men Joggers",
    price: `35`,
  },
  {
    productURL: "/images/blender-juice-machine.jpg",
    productName: "Blending Machine",
    price: `100`,
  },
  {
    productURL: "/images/phones.jpg",
    productName: "REDMI 15C",
    price: `17000`,
  },
  {
    productURL: "/images/blender-juice-machine.jpg",
    productName: "Blending Machine",
    price: `100`,
  },
  {
    productURL: "/images/blender-juice-machine.jpg",
    productName: "Blending Machine",
    price: `100`,
  },
];

export const addFiles = async () => {
  try {
    await Product.bulkCreate(files, {
      updateOnDuplicate: ["price"],
    });
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};
