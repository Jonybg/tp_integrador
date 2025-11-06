const contenedor = document.getElementById("sectionProd")
const categoria = document.getElementById("categoria")
const cartContainer = document.getElementById("cart-container")
const carritoElementos = document.querySelector(".carrito-elementos")
const cartButton = document.getElementById("cart-img")
const URL = "http://localhost:3000"
let productos = []
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
async function  llamarProductos() {
    try {
        const response = await fetch(`${URL}/products`)
        const data = await response.json()
        productos = data.payload;
        mostrarProductos(productos)
        console.log(productos);
        
        
    } catch (error) {
        
    }
}

function mostrarProductos(array) {
    let htmlCardProducto =""
    array.forEach(producto => {
        htmlCardProducto += 
        `
        <div class="card-product">
            <span>${producto.nombre} </span>
            <img src="${producto.imagen}" alt="">
            <span>Precio: ${producto.precio} ARS </span>
            <button onclick="agregarAcarrito(${producto.id})">Agregar</button>
        </div>
        `
    });

    contenedor.innerHTML = htmlCardProducto;
}


function filtrarProductos() {
    const categoriaSeleccionada = categoria.value
    console.log(productos);
    
    const productosFiltrado = categoriaSeleccionada == "Todos" ? productos : productos.filter(p=> p.categoria == categoriaSeleccionada);
    mostrarProductos(productosFiltrado)

}

function mostrarProductosCarrito() {
  if (carrito.length === 0) {
    carritoElementos.innerHTML = "<p>El carrito está vacío 🛒</p>";
    return;
  }

  let cardCarrito = "";
  carrito.forEach((producto, i) => {
    cardCarrito += `
      <div class="card-product">
        <img src="${producto.imagen}" alt="">
        <p>${producto.nombre} - $${producto.precio}</p>
        <div class="cart-buttons" >
          <button class="button-restar" onclick="restarCantidad(${i})">−</button>
          <div>
          <span>Cantidad: ${producto.cantidad}</span>
          <button onclick="sumarCantidad(${i})">+</button>
          </div>
        </div>
        <button onclick="eliminarProducto(${i})">Eliminar Producto</button>
      </div>
    `;
  });

  carritoElementos.innerHTML = cardCarrito;
}

function sumarCantidad(i) {
  carrito[i].cantidad += 1;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarProductosCarrito();
}

function restarCantidad(i) {
  if (carrito[i].cantidad > 1) {
    carrito[i].cantidad -= 1;
  } else {
    carrito.splice(i, 1); 
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarProductosCarrito();
}


function agregarAcarrito(id) {
    const productoSeleccionado = productos.find(producto=> producto.id == id)
    const prodctoEnElCarrito = carrito.find(producto=>producto.id == id)
    if(prodctoEnElCarrito){
        prodctoEnElCarrito.cantidad += 1;
    }else{
        carrito.push({...productoSeleccionado,cantidad : 1});
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarProductosCarrito()
}

function eliminarProducto(i) {
  carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarProductosCarrito();
}


function cartToggle() {
    cartContainer.classList.toggle("visible")
}

categoria.addEventListener("change", filtrarProductos)

cartButton.addEventListener("click",cartToggle)


function init() {
    llamarProductos()
    mostrarProductosCarrito()
}

init()