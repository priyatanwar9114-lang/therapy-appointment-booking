function login() {

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    const error = document.getElementById("errorMessage");

    if (username === "admin" && password === "mindcare123") {

        sessionStorage.setItem("adminLoggedIn", "true");

        window.location.href = "admin.html";

    }

    else {

        error.textContent = "❌ Invalid Username or Password";

    }

}