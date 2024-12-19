fetch("./juegos.json")
    .then(res => res.json())
    .then(juegos => {
        juegos.forEach(juego => {
            juego.stockOriginal = juego.stock
        })
        main(juegos)
    })

function main(juegos) {
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
    botonVaciarCarrito.addEventListener("click", (e) => vaciarCarrito(juegos, e))

    let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
    botonFinalizarCompra.addEventListener("click", (e) => finalizarCompra(juegos, e))


}
let precioFinalCarrito = (carrito) => {
    if (carrito.length != 0) {
        arrayPrecios = carrito.map((juego) => juego.subtotal)
        precioTotal = arrayPrecios.reduce((acum, precio) => acum + precio, 0)
    } else {
        precioTotal = 0
    }
    return precioTotal

}

let finalizarCompra = (juegos, e) => {
    let precioFinal = document.getElementById("precioFinal")
    localStorage.removeItem("carrito")
    let carrito = obtenerCarritoDelStorage()
    juegos.forEach(juego => juego.stock = juego.stockOriginal)
    Swal.fire({
        title: 'Gracias por su compra',
        icon: 'success',
        confirmButtonText: 'Continuar'
    })
    renderizarCarrito(carrito)
    contadorCarrito(carrito)
    guardarCarritoEnStorage(carrito)
    precioFinal.innerHTML = "Precio final: " + "$  " + 0
}
let vaciarCarrito = (juegos, e) => {
    let precioFinal = document.getElementById("precioFinal")
    localStorage.removeItem("carrito")
    carrito = obtenerCarritoDelStorage()
    juegos.forEach(juego => juego.stock = juego.stockOriginal)
    renderizarCarrito(carrito)
    contadorCarrito(carrito)
    precioFinal.innerHTML = "Precio final: " + "$  " + 0
    Swal.fire({
        title: 'Su carrito se vació!',
        icon: 'success',
        confirmButtonText: 'Continuar'
    })
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
    if (juegoOriginal.stock === 0) {
        Swal.fire({
            title: 'No hay más stock disponible!',
            icon: 'warning',
            confirmButtonText: 'Continuar'
        })
        return
    }
    let indiceCarrito = carrito.findIndex((juego) => juego.id === id)
    if (indiceCarrito === -1) {
        carrito.push({
            id: juegoOriginal.id,
            nombre: juegoOriginal.nombre,
            precio: juegoOriginal.precio,
            unidades: 1,
            rutaimg: juegoOriginal.rutaimg,
            stock: juegoOriginal.stock,
            subtotal: juegoOriginal.precio
        })
        juegoOriginal.stock--

    } else {
        juegoOriginal.stock--
        if (juegoOriginal.stock > 0) {
            carrito[indiceCarrito].unidades++
            carrito[indiceCarrito].subtotal = carrito[indiceCarrito].precio * carrito[indiceCarrito].unidades
        } else {
            if (juegoOriginal.stock === 0) {
                carrito[indiceCarrito].unidades++
                carrito[indiceCarrito].subtotal = carrito[indiceCarrito].precio * carrito[indiceCarrito].unidades
                Swal.fire({
                    title: 'No hay más stock disponible!',
                    icon: 'warning',
                    confirmButtonText: 'Continuar'
                })
            }

        }
    }
    guardarCarritoEnStorage(carrito)
    renderizarCarrito(carrito)
    contadorCarrito(carrito)

}
let renderizarCarrito = (carrito) => {
    let contendor = document.getElementById("carrito")
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
        <p>$${juego.subtotal}</p>
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
    contenedorFinalizar.className = "contenedor-finalizar"
    containerJuegos.className = "oculta"

}
let volverAHome = () => {
    let contenedorFinalizar = document.getElementById("contenedor-finalizar")
    let carrito = document.getElementById("carrito")
    let containerJuegos = document.getElementById("container-juegos")
    carrito.className = "oculta"
    contenedorFinalizar.className = "oculta"
    containerJuegos.className = "container__juegos"
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
