document.addEventListener('DOMContentLoaded', function () {
    // Validate function
    function validateFields(fields) {
        for (const field of fields) {
            if (!field.value.trim()) {
                alert(`${field.name} is required`);
                return false;
            }
        }
        return true;
    }

    // Signup handler
    const signup_form = document.getElementById("signup-form");

    if (signup_form){
        signup_form.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const c_password = document.getElementById("c_password").value;
    
            const isValid = validateFields([
                { name: 'Username', value: username },
                { name: 'Email', value: email },
                { name: 'Password', value: password },
                { name: 'Confirm Password', value: c_password },
            ]);
            if (!isValid) return;
    
            if (password.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }
    
            if (password !== c_password) {
                alert("Passwords do not match!");
                return;
            }
    
            try {
                const response = await fetch("http://localhost:8000/api/auth/signup", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }),
                });
    
                const data = await response.json();
                if (response.ok) {
                    alert("Signup successful");
                    window.location.href = "login.html"; // Redirect
                } else {
                    alert(data.message || "Signup failed");
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("Failed to register user");
            }
        });
    }
    

    // Login handler
    const login_form = document.getElementById("login-form");

    if (login_form){
        login_form.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
    
            const isValid = validateFields([
                { name: 'Email', value: email },
                { name: 'Password', value: password },
            ]);
            if (!isValid) return;
    
            try {
                const response = await fetch("http://localhost:8000/api/auth/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email, password }),
                });
    
                const data = await response.json();
                
                if (response.ok) {
                    alert("Login successful");
                    window.location.href = "dashboard.html"; // Redirect
                } else {
                    alert(data.message || "Login failed");
                }

            } catch (error) {
                console.error("Login error:", error);
                alert("Failed to login user");
            }
        });
    }
});
