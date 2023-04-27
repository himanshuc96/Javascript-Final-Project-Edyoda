// Function to display cart items in the checkout page
function displayCartItems() {
  // Retrieve cart items from local storage
  let cartItems = localStorage.getItem("cartItems");
  cartItems = JSON.parse(cartItems);

  // Get the cart-items element
  const cartItemsContainer = document.getElementById("cart-items");

  // Clear the existing content of the cart-items element
  cartItemsContainer.innerHTML = "";

  // Display each item in the cart
  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((item) => {
      // Create a new row for the item
      const cartRow = document.createElement("div");
      cartRow.classList.add("cart-row");

      // Set the inner HTML of the row to display the item data
      var cartRowContents = `
          <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.preview}" width="10%" height="20%">
            <p class="cart-item-title">${item.name}</p>
            <p class="cart-price cart-column">Rs ${item.price}</p>
          </div>
        `;

      cartRow.innerHTML = cartRowContents;

      // Add the remove button to the cart row
      const removeButton = document.createElement("button");
      removeButton.classList.add("btn", "btn-danger", "remove-button");
      removeButton.innerHTML = "REMOVE";
      removeButton.addEventListener("click", () => {
        // Remove the item from the cart
        const index = cartItems.indexOf(item);
        cartItems.splice(index, 1);

        // Save the updated cart items to local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Refresh the cart items display
        displayCartItems();
      });

      cartRow.appendChild(removeButton);

      // Add the row to the cart-items element
      cartItemsContainer.append(cartRow);
    });
  }

  // Display the total price
  displayTotalPrice();
}

document.getElementById("leftBar").onclick = function () {
  location.href = "/index.html";
};

// Function to calculate and display the total price
function displayTotalPrice() {
  // Retrieve cart items from local storage
  let cartItems = localStorage.getItem("cartItems");
  cartItems = JSON.parse(cartItems);

  // Calculate the total price
  let totalPrice = 0;
  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((item) => {
      totalPrice += item.price;
    });
  }

  // Display the total price in the checkout page
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = `Rs ${totalPrice}`;
}

// Call the displayCartItems function when the page loads
window.onload = displayCartItems;
