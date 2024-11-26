function main() {
    let juegos = [
        { id: 1123, nombre: "The Legend of Zelda: Breath of the Wild", precio: 100, stock: 3, categoria: "aventura", console: "Nintendo Switch", rutaimg: "img/tloztotk.jpg" },
        { id: 2231, nombre: "Red Dead Redemption 2", precio: 100, stock: 3, categoria: "aventura", console: "PC/PS5/XBOX", rutaimg: "img/rdr2.jpeg" },
        { id: 3334, nombre: "Call of Duty: Black ops 6", precio: 120, stock: 3, categoria: "shooter", console: "PC/PS5/XBOX", rutaimg: "img/codbo6.jpg" },
        { id: 4516, nombre: "NBA 2K25", precio: 120, stock: 3, categoria: "deportes", console: "PC/PS5/XBOX", rutaimg: "img/nba2k25.jpg" },
        { id: 1010, nombre: "Cities: Skylines", precio: 80, stock: 3, categoria: "simulacion", console: "PC/PS5/XBOX", rutaimg: "img/citiesskylines.jpg" },
        { id: 1231, nombre: "Doom Eternal", precio: 80, stock: 3, categoria: "shooter", console: "PC/PS5/XBOX", rutaimg: "img/doometernal.jpeg" },
        { id: 1246, nombre: "Farming Simulator 25", precio: 60, stock: 3, categoria: "simulacion", console: "PC/PS5/XBOX", rutaimg: "img/farmsimulator25.jpg" },
        { id: 1241, nombre: "The Legend of Zelda: Tears of the Kingdom", precio: 120, stock: 3, categoria: "aventura", console: "Nintendo Switch", rutaimg: "img/tlozbotw.jpeg" }
    ]
    let carrito = obtenerCarritoDelStorage("carrito")
    renderizarCarrito(carrito)
    contadorCarrito(carrito)
    crearTarjetaJuegos(juegos)
    let botonesAgregarJuego = document.getElementsByClassName("botonAgregarCarrito")
    for (const boton of botonesAgregarJuego) {
        boton.addEventListener("click", (e) => agregarJuegoCarrito(e, juegos, carrito))
    }
    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click", mostrarCarrito)

    let botonHome = document.getElementById("botonHome")
    botonHome.addEventListener("click", volverAHome)

    let botonEliminarDelCarrito = document.getElementsByClassName("botonEliminarDelCarrito")
    for (const boton of botonEliminarDelCarrito) {
        boton.addEventListener("click", (e) => eliminarDelCarrito(e, carrito))
    }
    let selectorCategorias = document.getElementById("filtroCategorias")
    selectorCategorias.addEventListener("change",(e) => filtroCategorias(e,juegos))
}


let agregarJuegoCarrito = (e, juegos, carrito) => {
    let id = Number(e.target.id)
    let juegoOriginal = juegos.find((juego) => juego.id === id)
    let indiceCarrito = carrito.findIndex((juego) => juego.id === id)
    if (indiceCarrito === -1) {
        carrito.push({
            id: juegoOriginal.id,
            nombre: juegoOriginal.nombre,
            precio: juegoOriginal.precio,
            unidades: 1,
            rutaimg: juegoOriginal.rutaimg

        })
    } else {

        juegoOriginal.stock--
        if (juegoOriginal.stock !== 0) {
            carrito[indiceCarrito].unidades++
        }
    }
    guardarCarritoStorage(carrito)
    renderizarCarrito(carrito)
    contadorCarrito(carrito)
}
let guardarCarritoStorage = (carrito) =>{
    carritoJson = JSON.stringify(carrito)
    localStorage.setItem("carrito",carritoJson)
}
let obtenerCarritoDelStorage = (clave) =>{
    carritoJson = localStorage.getItem(clave)
    carrito = JSON.parse(carritoJson)
    return carrito
}
let renderizarCarrito = (carrito) => {
    let contendor = document.getElementById("carrito")
    contendor.innerHTML = ""
    carrito = obtenerCarritoDelStorage("carrito")
    carrito.forEach((juego) => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "tarjeta-carrito"
        tarjetaCarrito.innerHTML = `
        <div class = "tarjeta-carrito-nombre">
        <img src="${juego.rutaimg}" alt="">
        <p>${juego.nombre}</p>
        </div>
        <p>${juego.id}</p>
        <p>${juego.unidades}</p>
        <p>$${juego.precio}</p>
        <button id = ${juego.id} class = "botonEliminarDelCarrito"><img src="img/trash.svg" alt=""></button>
        `
        contendor.appendChild(tarjetaCarrito)
    })
}
let contadorCarrito = (carrito) => {
    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.innerHTML = `<img src="img/cart.svg" alt="">`
    botonCarrito.innerHTML += `${carrito.length}`
}
let mostrarCarrito = () => {
    let carrito = document.getElementById("carrito")
    let containerJuegos = document.getElementById("container-juegos")
    carrito.className = "container__carrito"
    containerJuegos.className = "oculta"

}
let volverAHome = () => {
    let carrito = document.getElementById("carrito")
    let containerJuegos = document.getElementById("container-juegos")
    carrito.className = "oculta"
    containerJuegos.className = "container__juegos  "
}
let eliminarDelCarrito = () => {
    console.dir(e.target.id)
}
let filtroCategorias = (e,juegos) => {
    let categoria = e.target.value
    let JuegosFiltrados = juegos.filter((juego) => juego.categoria === categoria)
    console.log(JuegosFiltrados)
    crearTarjetaJuegos(JuegosFiltrados)
}
let crearTarjetaJuegos = (juegos) => {
    let containerJuegos = document.getElementById("container-juegos")
    juegos.forEach((juego) => {
        let unidades = "Unidades: " + juego.stock
        if (juego.stock === 0) {
            unidades = "No hay stock"
        }
        let contenedainerJuegosTarjeta = document.createElement("div")
        contenedainerJuegosTarjeta.className = "container__juegos__tarjeta"
        contenedainerJuegosTarjeta.innerHTML += `
            <div class = "container__img">
            <img src=${juego.rutaimg} alt=${juego.nombre}>
            </div>
            <div class ="container__juegos__tarjeta__info">
                <h2>${juego.nombre}</h2>
                <p>${juego.console}</p>
                <p>${unidades}</p>
                <h3>$${juego.precio}</h3>
            </div>
            <div class = "container__juegos__tarjeta__botoncontainer"><button class = "botonAgregarCarrito" id =${juego.id}>Agregar al carrito</button></div>
            `
        containerJuegos.appendChild(contenedainerJuegosTarjeta)        
    })
}
main()