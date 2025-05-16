(() => {
    const CartSystem = {
        getCart() {
            return JSON.parse(localStorage.getItem('artSiteCart')) || [];
        },

        getItemCount() {
            const cart = this.getCart();
            return cart.reduce((total, item) => total + item.quantity, 0);
        },

        updateAllCartDisplays() {
            const count = this.getItemCount();
            document.querySelectorAll('.cart-count').forEach(el => {
                el.textContent = count;
            });
        },

        addToCart(newItem) {
            const cart = this.getCart();
            const existingItem = cart.find(item => item.title === newItem.title);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                newItem.quantity = 1;
                cart.push(newItem);
            }

            localStorage.setItem('artSiteCart', JSON.stringify(cart));
            this.updateAllCartDisplays();
        },

        removeItem(title) {
            let cart = this.getCart();
            cart = cart.filter(item => item.title !== title);
            localStorage.setItem('artSiteCart', JSON.stringify(cart));
            this.updateAllCartDisplays();
        },

        updateQuantity(title, change) {
            const cart = this.getCart();
            const item = cart.find(item => item.title === title);

            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    this.removeItem(title);
                    return;
                }
                localStorage.setItem('artSiteCart', JSON.stringify(cart));
                this.updateAllCartDisplays();
            }
        },

        // ✅ Added: Public method to support inline onclick
        addToCartFromElement(event) {
            event.preventDefault();
            const artItem = event.target.closest('.art-item');
            const itemDetails = {
                title: artItem.querySelector('.art-item-title').textContent,
                image: artItem.querySelector('img').src,
                quantity: 1
            };
            CartSystem.addToCart(itemDetails);
        }
    };

    // Expose CartSystem and addToCartFromElement globally
    window.CartSystem = CartSystem;
    window.addToCart = CartSystem.addToCartFromElement; // ✅ This solves the ReferenceError

    document.addEventListener('DOMContentLoaded', () => {
        CartSystem.updateAllCartDisplays();
    });
})();