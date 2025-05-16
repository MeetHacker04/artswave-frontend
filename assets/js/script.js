// Auth System
const AuthSystem = {
    async login(username, password) {
        try {
            const response = await fetch('https://artswave-backend.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();

            // Store token and login state
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            this.updateAuthUI();
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    },

    isLoggedIn() {
        return localStorage.getItem('authToken') !== null;
    },

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this.updateAuthUI();
    },

    updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        if (!authButtons) return;

        if (this.isLoggedIn()) {
            const user = JSON.parse(localStorage.getItem('user'));
            authButtons.innerHTML = `
        <span>Welcome, ${user.username}</span>
        <button onclick="AuthSystem.logout()" class="auth-btn logout-btn">Logout</button>
      `;
        } else {
            authButtons.innerHTML = `
        <a href="./login.html" class="auth-btn login-btn">Login</a>
        <a href="./signup.html" class="auth-btn signup-btn">Sign Up</a>
      `;
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    AuthSystem.updateAuthUI();

    // Protected content check
    document.querySelectorAll('[data-protected]').forEach(el => {
        el.addEventListener('click', (e) => {
            if (!AuthSystem.isLoggedIn()) {
                e.preventDefault();
                document.getElementById('loginPopup').style.display = 'block';
            }
        });
    });
});