// Variable que mantiene el estado visible del carro
var carritoVisible = false;

// Funcion que se ejecuta cuando el documento está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Se obtienen todos los botones de eliminar al carrito
    var botonesEliminar = document.getElementsByClassName('btn-eliminar');
    // Se recorren todos los botones
    for (var i = 0; i < botonesEliminar.length; i++) {
        // Se agrega un evento de click a cada boton
        var button = botonesEliminar[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Agrego funcion de sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Agrego funcion para eliminar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Agrego funcion para agregar al carrito
    var botonesAgregarCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarCarrito.length; i++) {
        var button = botonesAgregarCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Agregamos funcion de pagar
    var botonPagar = document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// Eliminar item del carrito
function eliminarItemCarrito(event) {
    // Se obtiene el boton que se presionó
    var buttonClicked = event.target;
    // Se elimina el item del carrito
    buttonClicked.parentElement.parentElement.remove();
    // Se actualiza el total
    actualizarTotal();
}

// Actualizar total del carro
function actualizarTotal() {
    // Seleccionamos el contenedor
    var contenedorCarrito = document.getElementsByClassName('carrito')[0];
    var carritoItems = contenedorCarrito.getElementsByClassName('carrito-item');
    var total = 0;

    // Se recorren todos los items del carrito
    for (var i = 0; i < carritoItems.length; i++) {
        // Se obtiene el item actual
        var item = carritoItems[i];
        // Se obtiene el precio del item
        var precioElement = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElement);
        // Quitamos simbolo de dolar y formateamos el precio
        var precio = parseFloat(precioElement.innerText.replace('$', '').replace('.', '').replace(',', ''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total += precio * cantidad;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("en-US") + ',00';
}

// Funcion para ocultar carrito
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-item1')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Aumento de la cantidad de elementos elegidos
function sumarCantidad(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidad = cantidadItem.value;
    cantidad++;
    cantidadItem.value = cantidad;
    actualizarTotal();
}

// Resto de la cantidad de elementos elegidos
function restarCantidad(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidad = cantidadItem.value;
    cantidad--;
    if (cantidad >= 1) {
        cantidadItem.value = cantidad;
        actualizarTotal();
    }
}

function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    console.log(precio);
    var imagenSrc = item.getElementsByClassName('imagen-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    // Llamamos a la función de actualizar el total al agregar un nuevo producto
    actualizarTotal();

    // Hacemos visible el carrito
    hacerVisible();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" alt="" width="50px" height="50px">
                <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${titulo}</span>
                        <div class="selector-cantidad">
                            <i class="fa-solid fa-minus restar-cantidad"></i>
                            <input type="text" value="1" class="carrito-item-cantidad" disabled>
                            <i class="fa-solid fa-plus sumar-cantidad"></i>
                        </div>
                    <span class="carrito-item-precio">${precio}</span>
                </div>
            <span class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </span>
        </div>
    `;

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Agregamos funcionalidad de eliminar nuevos elementos
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agregamos funcionalidad de sumar cantidad
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

    // Agregamos funcionalidad de restar cantidad
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
}

function pagarClicked() {
    alert('Gracias por su compra');
    // Eliminamos todos los elementos del carrito
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    while (itemsCarrito.hasChildNodes()) {
        itemsCarrito.removeChild(itemsCarrito.firstChild);
    }
    actualizarTotal();

    // Función para ocultar el carrito
    ocultarCarrito();
}

function hacerVisible() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}
