const contenedor = document.getElementById("sectionProd")
const URL = "http://localhost:3000"

async function  llamarProductos() {
    try {
        const response = await fetch(`${URL}/products`)
        const data = await response.json()
        const productos = data.payload;
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
        <div>
            <span>nombre:"${producto.nombre}" </span>
            <span>id:"${producto.id}" </span>
            <img src="${producto.imagen}" alt="">
            <p>Categoria:"${producto.categoria}" </p>
            <span>Precio: "${producto.precio}" </span>
        </div>
        `
    });

    contenedor.innerHTML = htmlCardProducto;
}


llamarProductos()