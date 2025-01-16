//Variable que mantiene el estado visible del carro
var carritoVisible = false;

//Funcion que se ejecuta cuando el documento esta listo
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

function ready(){
    //Se obtienen todos los botones de eliminar al carrito
    var botonesEliminar = document.getElementsByClassName('btn-eliminar');
    //Se recorren todos los botones
    for(var i = 0; i < botonesEliminar.length; i++){
        //Se agrega un evento de click a cada boton
        var button = botonesEliminar[i];
        button.addEventListener('click', eliminarItemCarrito);
    }
    //Agrego funcion de sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i = 0; i < botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }
    // agrego funcin para eliminar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i = 0; i < botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
}

//eliminar item del carrito
function eliminarItemCarrito(event){
    //Se obtiene el boton que se presiono
    var buttonClicked = event.target;
    //Se elimina el item del carrito
    buttonClicked.parentElement.parentElement.remove();
    //Se actualiza el total
    actualizarTotal();
}

//Actualizar total del carro
function actualizarTotal(){
    //selecionamos el contenedor
    var contenedorCarrito = document.getElementsByClassName('carrito')[0];
    var carritoItems = contenedorCarrito.getElementsByClassName('carrito-item');
    var total = 0;

    //Se recorren todos los items del carrito
    for(var i = 0; i < carritoItems.length; i++){
        //Se obtiene el item actual
        var item = carritoItems[i];
        //Se obtiene el precio del item
        var precioElement = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElement);
        //quitamos simbolo de dolar
        var precio = parseFloat(precioElement.innerText.replace('$', '').replace('.', ''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("en-US")+',00';

}

//funcion para ocultar crrito
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-item1')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

//aumento de la cantidad de elementos elejidos
function sumarCantidad(event){
    var button = event.target;
    var item = button.parentElement.parentElement;
    var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidad = cantidadItem.value;
    cantidad++;
    cantidadItem.value = cantidad;
    actualizarTotal();
}

//resto de la cantidad de elementos elejidos
function restarCantidad(event){
    var button = event.target;
    var item = button.parentElement.parentElement;
    var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidad = cantidadItem.value;
    cantidad--;
    if(cantidad>=1){
        cantidadItem.value = cantidad;
        actualizarTotal();
    }
}