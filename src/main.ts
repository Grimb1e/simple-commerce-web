import axios from "axios";
import { Root2 } from "./response.type";

let status = "less";

const searchProduct = document.querySelector("input") as HTMLInputElement;
const cardContainer = document.querySelector(".container") as HTMLDivElement;
const btnSearch = document.querySelector("button") as HTMLButtonElement;

const productCommerce = async () => {
  try {
    const input = searchProduct.value;
    const response = await axios.get(
      `https://fakestoreapi.com/products?q=${input}`
    );

    cardContainer.innerHTML = "";

    if (!response.data || response.data.length === 0) {
      const notFoundText = document.createElement("p");
      notFoundText.textContent = "Product not found";
      cardContainer.appendChild(notFoundText);
    } else {
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
    }
  } catch (error) {
    console.error(error);
  }
};

searchProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    productCommerce();
  }
)

btnSearch.addEventListener("click", () => {
  productCommerce();
});

productCommerce();
