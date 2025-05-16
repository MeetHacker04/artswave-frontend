// script.js
let cart = [];

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function() {
        const artPiece = this.closest('.art-piece');
        const id = artPiece.getAttribute('data-id');
        const title = artPiece.getAttribute('data-title');
        const price = artPiece.getAttribute('data-price');
        
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, title, price, quantity: 1 });
        }
        updateCart();
    });
});

function updateCart() {
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cartCount').innerText = cartCount;

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.innerText = `${item.title} - $${item.price} x ${item.quantity} = $${itemTotal}`;
        cartItems.appendChild(itemDiv);
    });

    document.getElementById('cartTotal').innerText = `Total: $${total}`;

    const checkoutButton = document.getElementById('checkoutButton');
    if (cart.length > 0) {
        checkoutButton.classList.remove('hidden');
    } else {
        checkoutButton.classList.add('hidden');
    }
}
