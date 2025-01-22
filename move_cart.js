window.addEventListener("DOMContentLoaded", relocateCart);

// Solo ejecutar cuando el tamaño de la ventana cambia
window.addEventListener("resize", function() {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(relocateCart, 200); // Retraso de 200ms
});

function relocateCart(){
    const cart = document.querySelector(".cart");
    const main = document.querySelector("main");
    const header = document.querySelector("header");

    // Obtener el ancho de la ventana de forma redondeada para evitar problemas con valores decimales
    const windowWidth = Math.floor(window.innerWidth);

    if(windowWidth <= 425){
        // Si la pantalla es menor o igual a 425px
        if(!main.contains(cart)){
            main.prepend(cart); // Moverá el carrito a main
        } 
    } else {
        // Si el ancho es mayor a 425px
        const nav = header.querySelector("nav");
        if(!nav.contains(cart)){ 
            nav.appendChild(cart); // Regresa el carrito al header
        }
    }
}
