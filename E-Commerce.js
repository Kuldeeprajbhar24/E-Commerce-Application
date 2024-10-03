// Selecting elements
let login = document.querySelector("#right1");
let maleCont = document.querySelector("#maleCont");
let FemaleCont = document.querySelector("#FemaleCont");
let kidsCont = document.querySelector("#kidsCont");
let ElectronicCont = document.querySelector("#ElectronicCont");
let popup = document.querySelector("#popup");
let x = document.querySelector("#x");
let dynamic = document.querySelector("#dynamic");
let cardStorage = [];
let paymentModal = document.querySelector("#paymentModal");
let grandTotalElement = document.querySelector("#gt");
let paymentButton = document.querySelector("#footer button");

x.addEventListener("click", () => {
    popup.style.right = "-100%";
});

let particularUser = JSON.parse(localStorage.getItem("particularUser"));
console.log(particularUser);

if (particularUser) {
    login.innerHTML = `<span>${particularUser.first}</span>
    <a href="./E-Commerce.html" id="logout"><button>Logout</button></a>`;
    let logout = document.querySelector("#logout");
    logout.addEventListener("click", () => {
        localStorage.removeItem("particularUser");
    });
}

async function fetchData() {
    let dataFromServer = await fetch("https://www.shoppersstack.com/shopping/products/alpha");
    let allData = await dataFromServer.json();

    // Filtering data by category
    let maleData = allData.data.filter((e) => e.category === "men");
    let femaleData = allData.data.filter((e) => e.category === "women");
    let kidsData = allData.data.filter((e) => e.category === "kids");
    let electronicData = allData.data.filter((e) => e.category === "electronics");

    // Rendering data to the DOM
    renderProducts(maleCont, maleData);
    renderProducts(FemaleCont, femaleData);
    renderProducts(kidsCont, kidsData);
    renderProducts(ElectronicCont, electronicData);
}

fetchData();

// Function to render products into their respective categories
function renderProducts(container, products) {
    container.innerHTML = "";  // Clear the container
    products.forEach((e) => {
        container.innerHTML += `
            <div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="${e.name}">
                <h2>${e.name}</h2>
                <h3>₹${e.price}</h3>
                <h4>Rating: ${e.rating}</h4>
                <button class="btn">Add To Cart</button>
            </div>
        `;
    });

    // Add event listeners to "Add to Cart" buttons
    let btns = container.querySelectorAll(".btn");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            handleAddToCart(btn.parentElement.id, products);
        });
    });
}

function handleAddToCart(productId, products) {
    popup.style.right = "0";
    if (particularUser) {
        let selectedProduct = products.find((item) => item.productId == productId);
        cardStorage.push(selectedProduct);
        renderCart();
        calculateGrandTotal();
    } else {
        dynamic.innerHTML = `<a href="./Login.html">Please login to add items to the cart.</a>`;
    }
}

// Function to render cart items in the popup
function renderCart() {
    dynamic.innerHTML = "";
    cardStorage.forEach((item) => {
        dynamic.innerHTML += `
            <div class="cart-design" id="${item.productId}">
                <div>
                    <img src="${item.productImageURLs[0]}" alt="${item.name}">
                </div>
                <div>
                    <h3>${item.name}</h3>
                    <input type="number" min="1" value="1" class="quantity">
                </div>
                <div>
                    <h4 class="price">₹${item.price}</h4>
                </div>
                <div>
                    <h4 class="sub-total">₹${item.price}</h4>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;
    });

    // Attach event listeners for quantity change and delete buttons
    updateCartEvents();
}

// Function to update cart item events (quantity change, delete)
function updateCartEvents() {
    let quantities = document.querySelectorAll(".quantity");
    quantities.forEach((input) => {
        input.addEventListener("input", handleQuantityChange);
    });

    let trashIcons = document.querySelectorAll(".fa-trash");
    trashIcons.forEach((icon) => {
        icon.addEventListener("click", handleDeleteItem);
    });
}

// Handle quantity change for cart items
function handleQuantityChange(e) {
    let quantity = e.target.value;
    if (quantity < 1) {
        e.target.value = 1;
        quantity = 1;
    }

    let cartItem = e.target.closest(".cart-design");
    let priceElement = cartItem.querySelector(".price");
    let subTotalElement = cartItem.querySelector(".sub-total");

    let price = parseFloat(priceElement.textContent.replace('₹', ''));
    let subTotal = price * quantity;
    subTotalElement.textContent = `₹${subTotal}`;

    calculateGrandTotal();
}

// Handle deleting an item from the cart
function handleDeleteItem(e) {
    let cartItem = e.target.closest(".cart-design");
    let productId = cartItem.id;

    cardStorage = cardStorage.filter((item) => item.productId !== productId);
    renderCart();
    calculateGrandTotal();
}

// Calculate the grand total for all items in the cart
function calculateGrandTotal() {
    let grandTotal = 0;
    let subTotals = document.querySelectorAll(".sub-total");

    subTotals.forEach((sub) => {
        grandTotal += parseFloat(sub.textContent.replace('₹', ''));
    });

    grandTotalElement.textContent = grandTotal;
}

// Payment button click event
paymentButton.addEventListener("click", () => {
    if (cardStorage.length > 0) {
        paymentModal.style.display = "block";
    } else {
        alert("Your cart is empty!");
    }
});

// Payment form submission (for demo purposes)
let paymentForm = document.querySelector("#paymentForm");
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Payment successful!");
    paymentModal.style.display = "none";
    cardStorage = [];
    renderCart();
    calculateGrandTotal();
});
