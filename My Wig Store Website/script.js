let cart = [];
let total = 0;

function addToCart(productName, price) {
  // Add item to cart array
  cart.push({ name: productName, price: price });
  total += price;

  updateCart();
}

function removeFromCart(index) {
  // Subtract the item price from total
  total -= cart[index].price;

  // Remove item from array
  cart.splice(index, 1);

  updateCart();
}

function clearCart() {
  cart = [];
  total = 0;
  updateCart();
}

function updateCart() {
  let cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // clear previous list

  // Rebuild cart list
  cart.forEach((item, index) => {
    let listItem = document.createElement("li");
    listItem.textContent = item.name + " - R" + item.price;

    // Create remove button
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = function() {
      removeFromCart(index);
    };

    listItem.appendChild(removeBtn);
    cartList.appendChild(listItem);
  });

  // Update total
  document.getElementById("cart-total").textContent = total;
}
// Checkout function
document.getElementById("checkout-btn").addEventListener("click", function() {
  let total = document.getElementById("cart-total").innerText;
  if(total == "0") {
      alert("Your cart is empty!");
  } else {
      alert("Thank you for your purchase! Total amount: R" + total);
      clearCart(); // Clear cart after checkout
  }
});
// Update checkout total from cart total
function updateCheckoutTotal() {
  document.getElementById("checkout-total").innerText =
    document.getElementById("cart-total").innerText;
}

// Call this every time the cart updates
updateCheckoutTotal();

// Handle form submission
document.getElementById("checkout-form").addEventListener("submit", function(e){
  e.preventDefault(); // Prevent page reload
  
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let payment = document.getElementById("payment").value;
  let total = document.getElementById("checkout-total").innerText;
  
  if(!payment){
      alert("Please select a payment method!");
      return;
  }
  
  alert(
    `Thank you ${name}!\nYour order of R${total} has been placed.\nPayment Method: ${payment}\nShipping to: ${address}\nConfirmation sent to: ${email}`
  );
  
  clearCart(); // clear the cart after purchase
  this.reset(); // clear the form
  updateCheckoutTotal();
});
