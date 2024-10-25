let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, image) {
    const foundIndex = cart.findIndex(item => item.product === product);
    if (foundIndex !== -1) {
        cart[foundIndex].quantity += 1;
    } else {
        cart.push({ product, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
    alert(product + ' er lagt til i handlekurven!');
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.product}" class="cart-product-image">
                ${item.product} - Antall: 
                <input type="number" value="${item.quantity}" min="1" class="cart-quantity" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Fjern</button>
            `;
            cartItems.appendChild(div);
        });
    }
}


function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Initial display of cart and count
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartCount();
});