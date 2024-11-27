document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch('http://localhost:8000/api/auth/current-user', {
            method: 'GET',
            credentials: 'include'
        });
    
        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }
    
        const data = await response.json();
        
        const username = document.querySelector(".username");
        username.innerHTML = `Hello, <b>${data.username}!</b>`;
    } catch (error) {
        console.log(response.message);
           
    }
    

    const sidebarLogoutBtn = document.getElementById("sidebar-logout-btn");
    const mainLogoutBtn = document.getElementById("main-logout-btn");

    function showToast(message, type = "success") {
        const toastContainer = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerText = message;
        toastContainer.appendChild(toast);
    
        setTimeout(() => {
            toast.remove();
        }, 4000); // Adjust time as needed
    }

    async function logout() {
        try {
            const response = await fetch("http://localhost:8000/api/auth/logout", {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });

            const data = await response.json();

            if (response.ok) {
                // Show success toast
                showToast(data.message, "success");

                // Wait for 2 seconds to give the user time to see the toast
                setTimeout(() => {
                    window.location.href = "login.html"; // Redirect to login page
                }, 1000); // Wait 1 seconds before redirecting
            } else {
                // Show error toast
                showToast(data.message || "Failed to log out.", "error");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            // Show error toast
            showToast("An error occurred during logout.", "error");
        }
    }

    // Correctly attach the event listener (no immediate invocation)
    sidebarLogoutBtn.addEventListener("click", logout);
    mainLogoutBtn.addEventListener("click", logout);
});
