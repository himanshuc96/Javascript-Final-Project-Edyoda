// Retrieve product data from local storage
var productList = localStorage.getItem("product");
productList = JSON.parse(productList);

// Set up variables for product data
var imageSrc = productList.preview;
var Pname = productList.name;
var brand = productList.brand;
var price = productList.price;
var description = productList.description;
var photo = productList.photos;

// Function to create product page
function createProductPage() {
  // Get the productDetails element
  const loadData = document.getElementById("productDetails");

  // Set the inner HTML to display the product data
  loadData.innerHTML = `<div class="left-column">
      <img id="productImg" src="${imageSrc}" alt="" />
      </div>
      <div class="right-column">
      <div class="product-description">
      <h1 id="name">Product Name : ${Pname}</h1>
      <h4 id="brand">${brand}</h4>
      <h3>Price: Rs <span id="price">${price}</span></h3>
      <div class="description">
      <h3>Description</h3>
      <p id="description">
      ${description}
      </p>
      </div>
      <div class="product-preview">
      <h3>Product Preview</h3>
      <div class="previewImg">
      <img id="img0" class="active" src="${photo[0]}" alt="" />
      <img id="img1" src="${photo[1]}" alt="" class=""/>
      <img id="img2" src="${photo[2]}" alt="" class=""/>
      <img id="img3" src="${photo[3]}" alt="" class=""/>
      <img id="img4" src="${photo[4]}" alt="" class=""/>
      </div>
      </div>
      </div>
      <div class="btn">
      <button id="add-to-cart">Add to Cart</button>
      </div>
      </div>`;

  // Get the preview images and add a click event listener to each one
  const previewImgs = document.querySelectorAll(".previewImg img");
  previewImgs.forEach((img, index) => {
    img.addEventListener("click", () => {
      // Remove the "active" class from all images
      previewImgs.forEach((img) => {
        img.classList.remove("active");
      });

      // Set the clicked image as the active image
      img.classList.add("active");

      // Update the main product image to match the clicked image
      const productImg = document.getElementById("productImg");
      productImg.src = photo[index];
    });
  });

  // Get the "Add to Cart" button and add an event listener to it
  const addToCartButton = document.getElementById("add-to-cart");
  addToCartButton.addEventListener("click", addToCart);
}

// Call the createProductPage function when the page loads
window.onload = createProductPage;

// Function to add product to cart
function addToCart() {
  let cartCount = localStorage.getItem("cartCount");
  if (cartCount) {
    cartCount = parseInt(cartCount);
    localStorage.setItem("cartCount", cartCount + 1);
  } else {
    localStorage.setItem("cartCount", 1);
  }
  document.getElementById("cart-count").innerText =
    localStorage.getItem("cartCount");

  let productList = localStorage.getItem("product");
  productList = JSON.parse(productList);
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    cartItems.push(productList);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } else {
    localStorage.setItem("cartItems", JSON.stringify([productList]));
  }
}
