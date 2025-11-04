const contenedor = document.getElementById("sectionProd")
const categoria = document.getElementById("categoria")
const URL = "http://localhost:3000"
let productos = []
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
            <button>Agregar</button>
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


categoria.addEventListener("change", filtrarProductos)


llamarProductos()