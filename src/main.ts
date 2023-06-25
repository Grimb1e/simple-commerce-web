import axios from "axios";
import { Root2 } from "./response.type";
import debounce from 'lodash/debounce';

let status = "less";
let allProducts: Root2[] = [];
let filteredProducts: Root2[] = [];

const searchProduct = document.querySelector("input") as HTMLInputElement;
const cardContainer = document.querySelector(".container") as HTMLDivElement;

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    allProducts = response.data;
    renderProducts(allProducts);
  } catch (error) {
    console.error(error);
  }
};

const renderProducts = (products: Root2[]) => {
  cardContainer.innerHTML = "";

  if (searchProduct.value.trim().length && products.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No products found.";
    cardContainer.appendChild(message);
  } else {
    products.forEach((product: Root2) => {
      const card = document.createElement("div");
      card.className = "card";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "image-wrapper";
      card.appendChild(imageWrapper);

      const image = document.createElement("img");
      image.src = product.images;
      image.alt = "Product 1";
      imageWrapper.appendChild(image);

      const title = document.createElement("h2");
      title.textContent = product.title;
      card.appendChild(title);

      const description = document.createElement("p");
      description.textContent = product.description;
      card.appendChild(description);

      const seeMore = document.createElement("button");
      seeMore.innerHTML = "See More";
      card.appendChild(seeMore);

      seeMore.addEventListener("click", () => {
        toggleText(description, seeMore);
      });

      const toggleText = (desc: HTMLParagraphElement, btn: HTMLButtonElement) => {
        if (status === "less") {
          desc.style.whiteSpace = "normal";
          btn.innerHTML = "See Less";
          status = "more";
        } else if (status === "more") {
          desc.style.whiteSpace = "nowrap";
          btn.innerHTML = "See More";
          status = "less";
        }
      };

      const price = document.createElement("p");
      price.className = "price";
      price.innerHTML = `&#36;${product.price}`;
      card.appendChild(price);

      cardContainer.appendChild(card);
    });
  }
};

const filterProducts = (input: string) => {
  filteredProducts = allProducts.filter((product: Root2) =>
    product.title.toLowerCase().includes(input.toLowerCase())
  );
  renderProducts(filteredProducts);
};

const handleSearch = () => {
  const input = searchProduct.value.trim();
  filterProducts(input);
};

searchProduct.addEventListener("input", debounce(() => {
  handleSearch();
}, 1000));

fetchData();
