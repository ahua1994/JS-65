const sectionCenter = document.querySelector(".section-center");
const buttonContainer = document.querySelector(".btn-container");

function getProducts() {
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
            displayProducts(data.products);
            displayCategories(data.products);
        });
}

getProducts();

const displayProducts = (products) => {
    const productList = products.map(
        (product) => `
      <article class="product-item">
        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="photo"
        />
        <div class="item-info">
          <header>
            <h4>${product.title}</h4>
          </header>
          <p class="item-text">${product.description}</p>
          <h4 class="price">$${product.price}</h4>
        </div>
      </article>
    `
    );
    sectionCenter.innerHTML = productList.join("");
};

const displayCategories = (products) => {
    const categories = products.reduce(
        (acc, product) => {
            if (!acc.includes(product.category)) {
                acc.push(product.category);
            }
            return acc;
        },
        ["all"]
    );
    const categoryButtons = categories.map(
        (category) =>
            `<button type="button" class="filter-btn" id="${category}">${category}</button>`
    );
    buttonContainer.innerHTML = categoryButtons.join("");
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const category = e.target.id;
            const filteredProducts = products.filter(
                (product) => product.category === category
            );
            if (category === "all") {
                displayProducts(products);
            } else {
                displayProducts(filteredProducts);
            }
        });
    });
};
