console.log("connected");

function createProduct(obj) {
  const newSection = document.createElement("section");
  newSection.classList.add("product__grid");

  newSection.innerHTML = `
    <figure class="product__figure">
      <a class="product__anchor" href="${obj.link}">
        <img class="product__img" src="${obj.image}" alt="${obj.alt}">
      </a>
    </figure>
    <p class="product__price">$${obj.price.toFixed(2)}</p>
    <p>
      ${renderStars(obj.rating)}
      <span class="product__reviews">${obj.reviews}</span>
    </p>
    <h3 class="product__name">${obj.name}</h3>
    <figcaption class="product__description">${obj.description}</figcaption>
    <button class="product__button">Add to Cart</button>
  `;

  const parentGrid = document.querySelector("[data-products]");
  parentGrid.appendChild(newSection);
}

function renderStars(rating) {
  let starsHtml = "";
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    starsHtml += `<span class="material-symbols-outlined filled">star</span>`;
  }
  if (halfStar) {
    starsHtml += `<span class="material-symbols-outlined">star_half</span>`;
  }
  while (starsHtml.match(/star/g)?.length < 5) {
    starsHtml += `<span class="material-symbols-outlined">star</span>`;
  }
  return starsHtml;
}

fetch("../products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    products.forEach((product) => {
      createProduct(product);
    });
  })
  .catch((error) => {
    console.error("Failed to fetch data:", error);
  });
