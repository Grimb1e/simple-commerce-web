import axios from "axios";
import { Root2 } from "./response.type";

let status = "less";

const searchProduct = document.querySelector("input") as HTMLInputElement;
const cardContainer = document.querySelector(".container") as HTMLDivElement;

const productCommerce = async () => {
  try {
    const input = searchProduct.value;
    const response = await axios.get(
      `https://fakestoreapi.com/products?q=${input}`
    );
    response.data.forEach((product: Root2) => {
      const card = document.createElement("div");
      card.className = "card";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "image-wrapper";
      card.appendChild(imageWrapper);

      const image = document.createElement("img");
      image.src = product.image;
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
        toggleText();
      });

      const toggleText = () => {
        if (status === "less") {
          description.style.whiteSpace = "normal";
          seeMore.innerHTML = "See Less";
          status = "more";
        } else if (status === "more") {
          description.style.whiteSpace = "nowrap";
          seeMore.innerHTML = "See More";
          status = "less";
        }
      };

      const price = document.createElement("p");
      price.className = "price";
      price.innerHTML = `&#36;${product.price}`;
      card.appendChild(price);

      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
};

productCommerce();
