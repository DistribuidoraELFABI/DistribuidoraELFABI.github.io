
    let carrito = [];


document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".agregar").forEach(boton => {
        boton.addEventListener("click", function () {
            const productoDiv = boton.closest(".producto");
            
            const nombre = productoDiv.querySelector(".titulo-producto").textContent;
            const presentacion = productoDiv.querySelector(".titulo-cantidad").textContent;
            const cantidadInput = productoDiv.querySelector(".cantidad");
            const cantidad = parseInt(cantidadInput.value, 10);
            const precioTexto = productoDiv.querySelector(".precio").textContent.trim();
            const precio = parseFloat(precioTexto.replace("$", "").replace(",", "."));

            if (isNaN(cantidad) || cantidad <= 0) {
                console.log("Cantidad inválida");
                return;
            }

            const productoExistente = carrito.find(producto => producto.nombre === nombre && producto.presentacion === presentacion);

            if (productoExistente) {
                productoExistente.cantidad += cantidad;
                productoExistente.totalProducto = productoExistente.cantidad * precio;
            } else {
                carrito.push({
                    nombre,
                    presentacion,
                    cantidad,
                    precio,
                    totalProducto: cantidad * precio
                });
            }

            console.log("Carrito actualizado:", carrito);
            actualizarCarritoHTML();

            if (carrito.length > 0) {
                mostrarCarrito();
            }
        });
    });

    function actualizarTotal() {
        return carrito.reduce((total, producto) => total + producto.totalProducto, 0).toFixed(2);
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarritoHTML();
        if (carrito.length === 0) {
            ocultarCarrito();
        }
    }

    function actualizarCarritoHTML() {
        const listaProductos = document.getElementById("lista-productos");
        const totalCarrito = document.getElementById("total-carrito-valor");
        listaProductos.innerHTML = "";
    
        carrito.forEach((producto, index) => {
            let fila = document.createElement("tr");
    
            let tdNombre = document.createElement("td");
            tdNombre.textContent = producto.nombre;
    
            let tdPresentacion = document.createElement("td");
            tdPresentacion.textContent = producto.presentacion;
    
            let tdCantidad = document.createElement("td");
            let inputCantidad = document.createElement("input");
            inputCantidad.type = "number";
            inputCantidad.value = producto.cantidad;
            inputCantidad.min = 1;
            tdCantidad.appendChild(inputCantidad);
    
            let tdPrecio = document.createElement("td");
            tdPrecio.textContent = `$${producto.totalProducto.toFixed(2)}`;
    
            let tdEliminar = document.createElement("td");
            let btnEliminar = document.createElement("button");
            btnEliminar.classList.add("eliminar-producto");
            btnEliminar.textContent = "Eliminar";
            tdEliminar.appendChild(btnEliminar);
    
            fila.appendChild(tdNombre);
            fila.appendChild(tdPresentacion);
            fila.appendChild(tdCantidad);
            fila.appendChild(tdPrecio);
            fila.appendChild(tdEliminar);
    
            inputCantidad.addEventListener("change", function (event) {
                let nuevaCantidad = parseInt(event.target.value, 10);
                if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                    carrito[index].cantidad = nuevaCantidad;
                    carrito[index].totalProducto = nuevaCantidad * carrito[index].precio;
                    actualizarCarritoHTML();
                }
            });
    
            btnEliminar.addEventListener("click", function () {
                eliminarDelCarrito(index);
            });
    
            listaProductos.appendChild(fila);
        });
    
        totalCarrito.textContent = actualizarTotal();
    }
    

    function ocultarCarrito() {
        const carrito = document.querySelector(".carrito-detalles");
        if (carrito) {
            carrito.style.display = "none";
        }
    }
    

    function mostrarCarrito() {
        const carrito = document.querySelector(".carrito-detalles"); // Seleccionar por clase
        if (carrito) {
            carrito.style.display = "block";
        } else {
            console.error("El elemento con la clase 'carrito-detalles' no se encontró en el DOM.");
        }
    }
    
    
});
function actualizarTotal() {
    return carrito.reduce((total, producto) => total + producto.totalProducto, 0).toFixed(2);
}


// Generar PDF con la información del carrito
window.generarPDF = function (totalCarrito) {
    if (carrito.length === 0) {
        console.log("No hay productos en el carrito para generar el PDF.");
        return; // Si el carrito está vacío, no generamos el PDF
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
    });

    // Márgenes personalizados
    const margenIzquierdo = 10;
    const margenSuperior = 10;
    const margenDerecho = 10;
    const margenInferior = 10;

    // Título del documento
    doc.setFontSize(14);
    doc.text("Carrito de Compras", margenIzquierdo, margenSuperior);

    // Instrucciones
    doc.setFontSize(10);
    doc.text("Instrucciones:", margenIzquierdo, margenSuperior + 8);
    doc.setFont("helvetica", "bold");
    doc.text("Realice una captura de este archivo y luego pulse en el link de WhatsApp y envíenos su pedido:", margenIzquierdo, margenSuperior + 15);

    // Enlace de WhatsApp
    const whatsappLink = "https://wa.me/593962735406";
    doc.setFontSize(16);
    doc.setTextColor(37, 211, 102);
    doc.textWithLink("Link WhatsApp", margenIzquierdo + 125, margenSuperior + 5, { url: whatsappLink });

    // Configuración de la tabla
    const alturaCabecera = margenSuperior + 25;
    const margenColumna = 5;
    const anchoColumna1 = 65;
    const anchoColumna2 = 58;
    const anchoColumna3 = 25;
    const anchoColumna4 = 25;
    const alturaFila = 8; // Altura de cada fila
    let yPosition = alturaCabecera + 5;

    // Dibujar la cabecera de la tabla con bordes
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");

    doc.rect(margenIzquierdo, yPosition - 5, anchoColumna1, alturaFila); // Nombre
    doc.rect(margenIzquierdo + anchoColumna1, yPosition - 5, anchoColumna2, alturaFila); // Presentación
    doc.rect(margenIzquierdo + anchoColumna1 + anchoColumna2, yPosition - 5, anchoColumna3, alturaFila); // Cantidad
    doc.rect(margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3, yPosition - 5, anchoColumna4, alturaFila); // Subtotal

    doc.text("Nombre", margenIzquierdo + 2, yPosition);
    doc.text("Presentación", margenIzquierdo + anchoColumna1 + 2, yPosition);
    doc.text("Cantidad", margenIzquierdo + anchoColumna1 + anchoColumna2 + 5, yPosition);
    doc.text("Subtotal", margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3 + 5, yPosition);

    yPosition += alturaFila;

    // Dibujar los productos del carrito con bordes
    doc.setFont("helvetica", "normal");
    carrito.forEach(producto => {
        if (yPosition > 270) {  // Si se acerca al final de la página
            doc.addPage();
            yPosition = 10;
            doc.setFontSize(10);
        }

        doc.rect(margenIzquierdo, yPosition - 5, anchoColumna1, alturaFila);
        doc.rect(margenIzquierdo + anchoColumna1, yPosition - 5, anchoColumna2, alturaFila);
        doc.rect(margenIzquierdo + anchoColumna1 + anchoColumna2, yPosition - 5, anchoColumna3, alturaFila);
        doc.rect(margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3, yPosition - 5, anchoColumna4, alturaFila);

        doc.text(producto.nombre, margenIzquierdo + 2, yPosition);
        doc.text(producto.presentacion, margenIzquierdo + anchoColumna1 + 2, yPosition);
        // Calcular la posición centrada para la cantidad
        const xCantidad = margenIzquierdo + anchoColumna1 + anchoColumna2 + (anchoColumna3 / 2);

        // Agregar el texto centrado
        doc.text(producto.cantidad.toString(), xCantidad, yPosition, { align: "center" });

        // doc.text(producto.cantidad.toString(), margenIzquierdo + anchoColumna1 + anchoColumna2 + 5, yPosition, {align:"center"});
        doc.text(`$${producto.totalProducto.toFixed(2)}`, margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3 + 5, yPosition);

        yPosition += alturaFila;
    });

    // Dibujar total con borde
    doc.setFont("helvetica", "bold");
    doc.rect(margenIzquierdo, yPosition - 5, anchoColumna1 + anchoColumna2 + anchoColumna3, alturaFila);
    doc.rect(margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3, yPosition - 5, anchoColumna4, alturaFila);
    doc.text("Total:", margenIzquierdo + anchoColumna1 + anchoColumna2, yPosition);
    doc.text(`$${actualizarTotal()}`, margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3 + 5, yPosition);

    // Guardar el PDF
    doc.save("carrito_compras.pdf");

    // Guardar como blob y crear enlace de descarga
    const pdfBlob = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = pdfURL;
    enlaceDescarga.download = "carrito_compras.pdf";
    enlaceDescarga.click();
};

// window.cambiarValor = function(valor) {
//     let input = document.getElementById("cantidadproducto1");
//     let nuevoValor = parseInt(input.value) + valor;
//     if (nuevoValor >= input.min) {
//         input.value = nuevoValor;
//     }
// }
window.cambiarValor= function(cambio, boton) {
    // Encuentra el contenedor más cercano (el div con clase 'contador')
    const contenedor = boton.closest('.contador');
    
    // Encuentra el input dentro del contenedor
    const input = contenedor.querySelector('.cantidad');
    
    // Modifica el valor del input
    let nuevoValor = parseInt(input.value) + cambio;
    
    // Asegúrate de que el valor no sea menor que 1
    if (nuevoValor >= 1) {
        input.value = nuevoValor;
    }
}


//agrandar imagen



// menu footer

// Función para manejar el clic en los enlaces y realizar el desplazamiento suave


// Función para retroceder y avanzar entre secciones
// Evento de clic para todos los enlaces
document.addEventListener("DOMContentLoaded", function () {
    // Lista de IDs de las secciones
    const sections = [
        "antisepticos",
        "apositos",
        "descartables",
        "esterilizacion",
        "guanteslatex",
        "guantesnitrilo",
        "guantesquirur",
        "jeringas"
    ];

    let currentSectionIndex = 0; // Para rastrear la sección actual

    // Asignar eventos de clic para los botones
    document.getElementById('retroceder').addEventListener('click', function () {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            navigateToSection(sections[currentSectionIndex]);
        }
    });

    document.getElementById('avanzar').addEventListener('click', function () {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            navigateToSection(sections[currentSectionIndex]);
        }
    });

    // Función para hacer scroll suave a la sección
    function navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Efecto suave
                block: 'start'      // Asegura que la sección esté al principio de la vista
            });
        }
    }
});








