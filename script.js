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
    let carrito = obtenerCarritoDelStorage()
    renderizarCarrito(carrito)
    crearTarjetaJuegos(juegos, carrito)
    contadorCarrito()
    let botonHome = document.getElementById("botonHome")
    botonHome.addEventListener("click", volverAHome)

    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click", mostrarCarrito)

    let inputBuscar = document.getElementById("inputBuscar")
    inputBuscar.addEventListener("input", (e) => buscador(e, juegos))

    let selectorCategorias = document.getElementById("filtroCategorias")
    selectorCategorias.addEventListener("change", (e) => filtroCategorias(e, juegos, carrito))

    let botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
    botonVaciarCarrito.addEventListener("click", vaciarCarrito)

    let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
    botonFinalizarCompra.addEventListener("click", finalizarCompra)


}
let precioFinalCarrito = (carrito) => {
    if (carrito.length != 0) {
        arrayPrecios = carrito.map((juego) => juego.precio)
        precioTotal = arrayPrecios.reduce((acum, precio) => acum + precio, 0)
    } else {
        precioTotal = 0
    }
    return precioTotal

}

let finalizarCompra = () => {
    let precioFinal = document.getElementById("precioFinal")
    localStorage.removeItem("carrito")
    let carrito = obtenerCarritoDelStorage()
    alert("Gracias por su compra, hasta luego!!")
    renderizarCarrito(carrito)
    contadorCarrito(carrito)
    guardarCarritoEnStorage(carrito)
    precioFinal.innerHTML = "Precio final: " + "$  " + 0
}
let vaciarCarrito = (e) => {
    let precioFinal = document.getElementById("precioFinal")
    localStorage.removeItem("carrito")
    carrito = obtenerCarritoDelStorage()
    renderizarCarrito(carrito)
    contadorCarrito(carrito)
    precioFinal.innerHTML = "Precio final: " + "$  " + 0
}

let guardarCarritoEnStorage = (carrito) => {
    let carritoJson = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJson)
}
let obtenerCarritoDelStorage = () => {
    let carritoJson = localStorage.getItem("carrito")
    let carrito = carritoJson ? JSON.parse(carritoJson) : []
    return carrito
}
let buscador = (e, juegos) => {
    let juegosFiltrados = juegos.filter(juego => juego.nombre.includes(e.target.value))
    crearTarjetaJuegos(juegosFiltrados, carrito)
}

let agregarJuegoCarrito = (e, juegos) => {
    let carrito = obtenerCarritoDelStorage()
    let id = Number(e.target.id.substring(3))
    let juegoOriginal = juegos.find((juego) => juego.id === id)
    let indiceCarrito = carrito.findIndex((juego) => juego.id === id)
    let unidadesTarjeta = document.getElementById("uni" + id)

    if (indiceCarrito === -1) {
        carrito.push({
            id: juegoOriginal.id,
            nombre: juegoOriginal.nombre,
            precio: juegoOriginal.precio,
            unidades: 1,
            rutaimg: juegoOriginal.rutaimg,
            stock: juegoOriginal.stock
        })
        juegoOriginal.stock--
        console.log(juegoOriginal.stock)
        unidadesTarjeta.innerHTML = `Unidades: ${juegoOriginal.stock}`
    } else {
        juegoOriginal.stock--
        console.log(juegoOriginal.stock)
        if (juegoOriginal.stock > 0) {
            carrito[indiceCarrito].unidades++
            unidadesTarjeta.innerHTML = `Unidades: ${juegoOriginal.stock}`
        } else {
            if (juegoOriginal.stock === 0) {
                carrito[indiceCarrito].unidades++
                unidadesTarjeta.innerHTML = `No hay stock`
            }

        }
    }
    guardarCarritoEnStorage(carrito)
    renderizarCarrito(carrito)
    contadorCarrito(carrito)

}
let renderizarCarrito = (carrito) => {
    let contendor = document.getElementById("carrito")
    let precioFinal = document.getElementById("precioFinal")
    contendor.innerHTML = ""
    if (carrito.length === 0) {
        contendor.innerHTML = "<h2>Su carrito esta vacio!</h2>"
    }
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
        <button id = eli${juego.id} class = "botonEliminarDelCarrito"><img src="img/trash.svg" alt=""></button>
        `
        contendor.appendChild(tarjetaCarrito)

        let botonEleiminarDelCarrito = document.getElementById("eli" + juego.id)
        botonEleiminarDelCarrito.addEventListener("click", (e) => eliminarDelCarrito(e))

        let precioFinal = document.getElementById("precioFinal")
        precioFinal.innerHTML = "Precio final: " + "$  " + precioFinalCarrito(carrito)
    })
}
let contadorCarrito = () => {
    let carrito = obtenerCarritoDelStorage("carrito")
    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.innerHTML = `<img src="img/cart.svg" alt="">`
    botonCarrito.innerHTML += `${carrito.length}`
}
let mostrarCarrito = () => {
    let contenedorFinalizar = document.getElementById("contenedor-finalizar")
    let carrito = document.getElementById("carrito")
    let containerJuegos = document.getElementById("container-juegos")
    carrito.className = "container__carrito"
    contenedorFinalizar.className = "contenedor-botonFinalizarCompra"
    containerJuegos.className = "oculta"

}
let volverAHome = () => {
    let contenedorFinalizar = document.getElementById("contenedor-finalizar")
    let carrito = document.getElementById("carrito")
    let containerJuegos = document.getElementById("container-juegos")
    carrito.className = "oculta"
    containerJuegos.className = "container__juegos  "
    contenedorFinalizar.className = "oculta"
}
let eliminarDelCarrito = (e) => {
    let carrito = obtenerCarritoDelStorage()
    id = Number(e.target.id.substring(3))
    indice = carrito.findIndex((juego) => juego.id === id)
    carrito.splice(indice, 1)
    guardarCarritoEnStorage(carrito)
    renderizarCarrito(carrito)
    contadorCarrito(carrito)
    if (carrito.length === 0) {
        let precioFinal = document.getElementById("precioFinal")
        precioFinal.innerHTML = "Precio final: " + "$  " + 0
    }

}
let filtroCategorias = (e, juegos, carrito) => {
    let categoria = e.target.value
    let juegosFiltrados = categoria !== "todos" ? juegos.filter((juego) => juego.categoria === categoria) : juegos
    crearTarjetaJuegos(juegosFiltrados, carrito)

}
let crearTarjetaJuegos = (juegos, carrito) => {
    let containerJuegos = document.getElementById("container-juegos")
    containerJuegos.innerHTML = ""
    juegos.forEach((juego) => {
        let contenedainerJuegosTarjeta = document.createElement("div")
        contenedainerJuegosTarjeta.className = "container__juegos__tarjeta"
        contenedainerJuegosTarjeta.innerHTML += `
            <div class = "container__img">
            <img src=${juego.rutaimg} alt=${juego.nombre}>
            </div>
            <div class ="container__juegos__tarjeta__info">
                <h2>${juego.nombre}</h2>
                <p>${juego.console}</p>

                <h3>$${juego.precio}</h3>
            </div>
            <div class = "container__juegos__tarjeta__botoncontainer"><button class = "botonAgregarCarrito" id = agc${juego.id}>Agregar al carrito</button></div>
            `
        containerJuegos.appendChild(contenedainerJuegosTarjeta)

        let botonAgregarCarrito = document.getElementById("agc" + juego.id)
        botonAgregarCarrito.addEventListener("click", (e) => agregarJuegoCarrito(e, juegos, carrito))
    })
}
main()