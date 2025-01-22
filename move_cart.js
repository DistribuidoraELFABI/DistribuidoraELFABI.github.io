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

    if(window.innerWidth <= 425){
        //si la pantalla es menor o igual a 425px
        if(!main.contains(cart)){
            main.prepend(cart); //moverá el carrito a main
        } else{
            //si el carrito no esta en header en una pantalla mayor a 425px
            const nav = header.querySelector("nav");
            if(!nav.contains(cart)){ 
                nav.appendChild(cart); //regresa al header
            }
        }
    }
}
