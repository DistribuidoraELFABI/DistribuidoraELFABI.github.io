
let carrito = [];

window.agregarAlCarrito = function(nombre, presentacion, idCantidad, precio) {
    let inputElement = document.getElementById(idCantidad);
  
    if (!inputElement) {
        console.log("Error: No se encontró el input con ID:", idCantidad);
        return;
    }

    let cantidad = parseInt(inputElement.value);
  
    if (isNaN(cantidad) || cantidad <= 0) {
        console.log("Cantidad inválida");
        return;
    }

    // Verificar si el producto ya existe en el carrito
    let productoExistente = carrito.find(producto => producto.nombre === nombre && producto.presentacion === presentacion);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, actualiza la cantidad y recalcula el total
        productoExistente.cantidad += cantidad;
        productoExistente.totalProducto = productoExistente.cantidad * precio;
    } else {
        // Si el producto no está en el carrito, lo agrega con el total calculado
        carrito.push({
            nombre,
            presentacion,
            cantidad,
            precio,
            totalProducto: cantidad * precio
        });
    }

    console.log(`Producto: ${nombre}, Presentación: ${presentacion}, Cantidad: ${cantidad} caja, Precio: $${precio}`);
    console.log("Carrito actual:", carrito);
    actualizarCarritoHTML();

    // Mostrar el carrito después de agregar el primer producto
    if (carrito.length > 0) {
        mostrarCarrito();
    }
};

// Función para calcular el total de la compra
function actualizarTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.totalProducto;
    });
    return total.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    // Eliminar el producto del carrito según su índice
    carrito.splice(index, 1);
    actualizarCarritoHTML(); // Actualizar el carrito en el HTML
    console.log("Carrito después de eliminar el producto:", carrito);
    // Actualizar el total
    if (carrito.length === 0) {
        ocultarCarrito();
    }
}

// Función para actualizar el HTML con los productos del carrito
function actualizarCarritoHTML() {
    const listaProductos = document.getElementById("lista-productos");
    const totalCarrito = document.getElementById("total-carrito-valor");

    // Limpiar la tabla antes de volver a llenarla
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
        inputCantidad.min = 1; // Para evitar cantidades negativas o cero
        inputCantidad.addEventListener("change", function() {
            let nuevaCantidad = parseInt(inputCantidad.value);
            if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                // Actualizar la cantidad en el carrito
                carrito[index].cantidad = nuevaCantidad;
                carrito[index].totalProducto = nuevaCantidad * producto.precio;
                actualizarCarritoHTML(); // Volver a actualizar la tabla
            }
        });

        tdCantidad.appendChild(inputCantidad);

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${producto.totalProducto.toFixed(2)}`;

        let tdEliminar = document.createElement("td");
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("eliminar-producto");
        btnEliminar.onclick = function() {
            eliminarDelCarrito(index);
        };

        tdEliminar.appendChild(btnEliminar);

        // Agregar las celdas a la fila
        fila.appendChild(tdNombre);
        fila.appendChild(tdPresentacion);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdEliminar);

        // Agregar la fila a la tabla
        listaProductos.appendChild(fila);
    });

    // Actualizar el total
    totalCarrito.textContent = actualizarTotal();
}


// Función para ocultar el carrito
function ocultarCarrito() {
    document.getElementById("carrito-detalles").style.display = "none";
}

// Función para mostrar el carrito
function mostrarCarrito() {
    document.getElementById("carrito-detalles").style.display = "block";
}

// Generar PDF con la información del carrito
window.generarPDF= function() {
    // Crear una nueva instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: 'mm',      // Usamos milímetros como unidades
        format: 'a4',    // Tamaño A4
    });

    // Establecer márgenes personalizados
    const margenIzquierdo = 10;
    const margenSuperior = 10;
    const margenDerecho = 10;
    const margenInferior = 10;

    // Ancho disponible en la página (sin márgenes)
    const anchoPagina = 210 - margenIzquierdo - margenDerecho;

    // Título del documento
    doc.setFontSize(14);
    doc.text("Carrito de Compras", margenIzquierdo, margenSuperior);

    // Instrucciones
    doc.setFontSize(10);
    doc.text("Instrucciones:", margenIzquierdo, margenSuperior + 8);
    doc.setFontSize(8);
    doc.text("Realice una captura de este archivo y luego pulse en el link de WhatsApp y envíenos su pedido:", margenIzquierdo, margenSuperior + 15);
    // Enlace de WhatsApp
    const whatsappLink = "https://wa.me/5939620735406";  // El número y enlace de WhatsApp
    doc.setFontSize(16);
    doc.setTextColor(37, 211, 102);
    doc.textWithLink("Link WhatsApp", margenIzquierdo + 125, margenSuperior + 15, { url: whatsappLink });  // Aquí se crea el enlace
    
    // doc.text("y envíenos su pedido.", margenIzquierdo, margenSuperior + 5);

    // Cabecera de la tabla (mantenemos las celdas anchas)
    const alturaCabecera = margenSuperior + 25;  // Ajustamos la altura para que las instrucciones no se solapen
    const margenColumna = 10; // Margen entre columnas
    const anchoColumna1 = 60;  // Ancho de la columna 1 (Nombre)
    const anchoColumna2 = 40;  // Ancho de la columna 2 (Presentación)
    const anchoColumna3 = 30;  // Ancho de la columna 3 (Cantidad)
    const anchoColumna4 = 40;  // Ancho de la columna 4 (Precio)

    // Posicionamiento inicial de las celdas
    let yPosition = alturaCabecera + 5;

    // Agregar las cabeceras de la tabla
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    doc.text("Nombre", margenIzquierdo, yPosition);
    doc.text("Presentación", margenIzquierdo + anchoColumna1 + margenColumna, yPosition);
    doc.text("Cantidad", margenIzquierdo + anchoColumna1 + anchoColumna2 + margenColumna * 2, yPosition);
    doc.text("Precio", margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3 + margenColumna * 3, yPosition);

    
    // Aumentar la posición para las filas
    yPosition += 10;

    // Rellenar los productos del carrito
    carrito.forEach(producto => {
        // Verificar si el contenido se desborda
        if (yPosition > 270) {  // Si se acerca al final de la página
            doc.addPage();  // Agregar una nueva página
            yPosition = 10;  // Reiniciar la posición Y
            doc.setFontSize(10);
        }

        // Escribir los valores en las celdas, ajustando las coordenadas
        doc.text(producto.nombre, margenIzquierdo, yPosition);
        doc.text(producto.presentacion, margenIzquierdo + anchoColumna1 + margenColumna, yPosition);
        doc.text(producto.cantidad.toString(), margenIzquierdo + anchoColumna1 + anchoColumna2 + margenColumna * 2, yPosition);
        doc.text(`$${producto.totalProducto.toFixed(2)}`, margenIzquierdo + anchoColumna1 + anchoColumna2 + anchoColumna3 + margenColumna * 3, yPosition);

        // Aumentar la posición para la siguiente fila
        yPosition += 10;
    });

    // Total
    doc.text("Total: $" + actualizarTotal(), margenIzquierdo, yPosition + 10);

    
        // Guardar el PDF
    doc.save("carrito_compras.pdf");
    // Guardar el archivo PDF como un Blob
    const pdfBlob = doc.output('blob');

    // Crear un enlace de descarga
    const pdfURL = URL.createObjectURL(pdfBlob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = pdfURL;
    enlaceDescarga.download = "carrito_compras.pdf"; // Nombre del archivo
    enlaceDescarga.click();  // Inicia la descarga del PDF

}
window.cambiarValor = function(valor) {
    let input = document.getElementById("cantidadproducto1");
    let nuevoValor = parseInt(input.value) + valor;
    if (nuevoValor >= input.min) {
        input.value = nuevoValor;
    }
}

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
