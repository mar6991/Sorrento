(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
    }, false)
})
})()

//verificar si está logueado

document.addEventListener("DOMContentLoaded", function () {
    const authItem = document.getElementById("auth-item");
    const authLink = document.getElementById("auth-link");

    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        authLink.innerHTML = '<i class="bi bi-box-arrow-right"></i> Cerrar Sesión';
        authLink.href = "#";
        authLink.onclick = function (e) {
            e.preventDefault();
            sessionStorage.removeItem("loggedIn");
            window.location.href = "logIn.html";
        };
    } else {
        authLink.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión';
        authLink.href = "logIn.html";
    }
});

//redirigir a Home

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
        alert("Por favor complete ambos campos.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    sessionStorage.setItem("loggedIn", "true");

    window.location.href = "index.html";
});

if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "logIn.html";
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "logIn.html";
}

//navegar por paginas
const navPages = [
    { title: "Inicio", href: "index.html" },
    { title: "Carpetas", href: "carpetas.html" },
    { title: "Inscripciones", href: "inscripcion.html" },
    { title: "Traducciones", href: "traducciones.html" },
    { title: "Contacto", href: "contact.html" }
];

function createNavbar() {
    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-lg fixed-top bg-light";

navbar.innerHTML = `
    <div class="container">
    <a class="navbar-brand fw-bold" href="index.html">Sorrento</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto" id="navbar-links"></ul>
    </div>
    </div>`;

document.body.prepend(navbar);

const ul = document.getElementById("navbar-links");

  // Añadir elementos del menú
    navPages.forEach(page => {
    const li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = `<a class="nav-link" href="${page.href}">${page.title}</a>`;
    ul.appendChild(li);
    });

  // link del auth
    const authLi = document.createElement("li");
    authLi.className = "nav-item";
    authLi.id = "auth-item";

    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        authLi.innerHTML = `
        <a class="nav-link" href="#" id="auth-link">
        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
        </a>`;
        authLi.querySelector("#auth-link").addEventListener("click", e => {
        e.preventDefault();
        sessionStorage.removeItem("loggedIn");
        window.location.href = "logIn.html";
    });
    } else {
        authLi.innerHTML = `
        <a class="nav-link" href="logIn.html" id="auth-link">
        <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
        </a>`;
    }

    ul.appendChild(authLi);
}

document.addEventListener("DOMContentLoaded", createNavbar);

//agregar traducciones
function adjustQty(button, delta) {
    const container = button.closest(".quantity-controls");
    const quantityEl = container.querySelector(".quantity");
    let quantity = parseInt(quantityEl.textContent);

    quantity += delta;
    if (quantity < 0) quantity = 0;

    quantityEl.textContent = quantity;
}
