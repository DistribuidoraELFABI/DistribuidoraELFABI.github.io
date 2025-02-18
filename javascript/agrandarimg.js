window.document.addEventListener("DOMContentLoaded", function () {
    // Crear el modal
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <img class="modal-img" src="" alt="Imagen ampliada">
            <div class="modal-text">
                <span class="modal-title"></span>
            </div>
            <div class="modal-text2">
                <span class="modal-description"></span>
            </div>
            <div class="modal-text3">
                <span class="modal-adicional1"></span>

            </div>            
            <div class="modal-price">
                <p class="modal-price"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".modal-img");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDescription = modal.querySelector(".modal-description");
    const modalPrice = modal.querySelector(".modal-price");
    
    const modalAdicional1 = modal.querySelector(".modal-adicional1");
    // const modalAdicional2 = modal.querySelector(".modal-adicional2");

    // Detectar clic en los contenedores .letra-img
    document.querySelectorAll(".letra-img").forEach(container => {
        container.addEventListener("click", function () {
            // Obtener la imagen y los títulos
            const img = container.querySelector("img");
            const title = container.querySelector(".titulo-producto");
            const description = container.querySelector(".titulo-cantidad");
            const adicional1 = container.querySelector(".adicional1");
            // const adicional2 = container.querySelector(".adicional2");

            const price = container.querySelector(".precio");

            modalImg.src = img.src; // Asigna el src de la imagen al modal
            modalTitle.textContent = title.textContent; // Asigna el texto del título al modal
            modalDescription.textContent = description.textContent; // Asigna el texto de la descripción al modal
            modalAdicional1.innerHTML = adicional1.innerHTML;

            // modalAdicional1.textContent = adicional1.textContent;
            // modalAdicional2.textContent = adicional2.textContent;
            modalPrice.textContent = price.textContent;

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
