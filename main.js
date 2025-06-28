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

//estructura de servicios
[

    {
    "id": "carpeta1",
    "categoria": "carpetas",
    "titulo": "Armado de árbol genealógico",
    "descripcion": "Búsqueda desde la persona interesada hasta el italiano.",
    "precio": 45000,
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "carpeta2",
    "categoria": "carpetas",
    "titulo": "Pedido de actas",
    "descripcion": "Solicitud de las actas de nacimiento, matrimonio y defunción legalizadas.",
    "precio": "Consultar",
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "carpeta3",
    "categoria": "carpetas",
    "titulo": "Apostillado",
    "descripcion": "Apostille de la Haya",
    "precio": "50000",
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "carpeta3",
    "categoria": "carpetas",
    "titulo": "Apostillado Urgente",
    "descripcion": "Apostille de la Haya en 7 días.",
    "precio": "80000",
    "imagen": "resources/papers.jpg" 
    },

    {
    "id": "inscripcion1",
    "categoria": "inscripcion",
    "titulo": "Fast It",
    "descripcion": "Sitio Oficial del Consulado.",
    "precio": 45000,
    "imagen": "resources/papers.jpg"
    },

    {
    "id": "inscripcion2",
    "categoria": "inscripcion",
    "titulo": "Prenotami",
    "descripcion": "Para solicitud de pasaportes.",
    "precio": 25000,
    "imagen": "resources/papers.jpg"
    },

    {
    "id": "traduccion1",
    "categoria": "traduccion",
    "titulo": "Traducción Italiana de actas",
    "descripcion": "Traducción certificada de actas de nacimiento, matrimonio y defunción.",
    "precio": 45000,
    "imagen": "resources/papers.jpg"
    },

    {
    "id": "traduccion2",
    "categoria": "traduccion",
    "titulo": "Traducción Italiana de Sentencias",
    "descripcion": "Traducción certificada de sentencias de divorcio o adopción.",
    "precio": "Consultar",
    "imagen": "resources/papers.jpg"
    },

]

//agregar servicios
function adjustQty(button, delta) {
    const container = button.closest(".quantity-controls");
    const quantityEl = container.querySelector(".quantity");
    let quantity = parseInt(quantityEl.textContent);

    quantity += delta;
    if (quantity < 0) quantity = 0;

    quantityEl.textContent = quantity;
}

//agregar dependiendo de la categoria del servicio
const categoriaActual = "carpetas";

fetch("servicios.json")
    .then(response => response.json())
    .then(servicios => {
    const container = document.createElement("div");
    container.className = "d-flex flex-wrap justify-content-center gap-3 mt-5";

    servicios
    .filter(servicio => servicio.categoria === categoriaActual)
    .forEach(servicio => {
        const card = document.createElement("div");
        card.className = "card service-card";
        card.innerHTML = `
        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
        <div class="card-body">
            <h5 class="card-title">${servicio.titulo}</h5>
            <p class="card-text">${servicio.descripcion}</p>
            <p class="price">${typeof servicio.precio === "number" ? "ARS " + servicio.precio.toLocaleString() : servicio.precio}</p>
            <div class="quantity-controls">
                <button class="btn btn-sm btn-outline-secondary" onclick="adjustQty(this, -1)">−</button>
                <span class="quantity">0</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="adjustQty(this, 1)">+</button>
            </div>
        </div>
        `;
        container.appendChild(card);
        });

    document.body.appendChild(container);
});