function hamburguerCart(panelBtn, panel){
    const d = document;
    d.addEventListener("click", (e) => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
            d.querySelector(panel).classList.toggle("is-active");
            d.querySelector(panelBtn).classList.toggle("is-active");
        }
        
        // Cierra el menú si se hace clic en un enlace dentro de él
        // if (e.target.closest(panel)) {
        //     d.querySelector(panel).classList.remove("is-active");
        //     d.querySelector(panelBtn).classList.remove("is-active");
        // }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    hamburguerCart(".panelBtn", ".carrito-detalles"); // Para el carrito de compras
});

function hamburguerMenu(menuBtn, panel) {
    const d = document;
    
    d.addEventListener("click", (e) => {
        if (e.target.matches(menuBtn) || e.target.matches(`${menuBtn} *`)) {
            d.querySelector(panel).classList.toggle("is-active");
            d.querySelector(menuBtn).classList.toggle("is-active");

        } 
        
        // Cierra el menú si se hace clic fuera de él
        if (e.target.closest(panel) ) {
            d.querySelector(panel).classList.remove("is-active");
            d.querySelector(menuBtn).classList.remove("is-active");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    hamburguerMenu("#menu1", ".menu-hamburguesa"); // Para el menú en el footer
});

