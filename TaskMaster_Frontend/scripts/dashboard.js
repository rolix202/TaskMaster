document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:8000/api/auth/current-user', {
        method: 'GET',
        credentials: 'include'
      });
    
      if (response.status === 401) {
        window.location.href = 'login.html';
        return;
      }
    
      const data = await response.json();
    
      const username = document.querySelector(".username")

      username.innerHTML = `Hello, <b>${data.username}!</b> `

      
})