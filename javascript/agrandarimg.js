window.document.addEventListener("DOMContentLoaded", function () {
    // Crear el modal
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <img class="modal-img" src="" alt="Imagen ampliada">
            <div class="modal-text">
                <span class="modal-title"></span>
                <span class="modal-description"></span>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".modal-img");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDescription = modal.querySelector(".modal-description");

    // Detectar clic en los contenedores .letra-img
    document.querySelectorAll(".letra-img").forEach(container => {
        container.addEventListener("click", function () {
            // Obtener la imagen y los títulos
            const img = container.querySelector("img");
            const title = container.querySelector(".titulo-producto");
            const description = container.querySelector(".titulo-cantidad");

            modalImg.src = img.src; // Asigna el src de la imagen al modal
            modalTitle.textContent = title.textContent; // Asigna el texto del título al modal
            modalDescription.textContent = description.textContent; // Asigna el texto de la descripción al modal

            modal.classList.add("active");
        });
    });

    // Cerrar el modal al hacer clic fuera de la imagen
    modal.addEventListener("click", function (e) {
        if (e.target !== modalImg && e.target !== modalTitle && e.target !== modalDescription) {
            modal.classList.remove("active");
        }
    });
});
